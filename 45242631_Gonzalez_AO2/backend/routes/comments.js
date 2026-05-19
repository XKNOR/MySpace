const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const User = require("../models/User");
const auth = require("../middleware/auth");

// Obtener comentarios
router.get("/:blogId", async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { blogId: req.params.blogId },
      include: [{ model: User, as: "author", attributes: ["username"] }],
      order: [["createdAt", "ASC"]]
    });
    res.json(comments);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Crear comentario
router.post("/", auth, async (req, res) => {
  try {
    const { content, blogId } = req.body;
    const comment = await Comment.create({ content, blogId, userId: req.user.id });
    const fullComment = await Comment.findByPk(comment.id, {
      include: [{ model: User, as: "author", attributes: ["username"] }]
    });
    res.status(201).json(fullComment);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ELIMINAR (Con candado de seguridad)
router.delete("/:id", auth, async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ msg: "El comentario no existe" });
    }

    // EL CANDADO: Forzamos a que ambos sean números para que la comparación sea real
    // Si el ID del dueño del comentario no es igual al ID del que está logueado... AFUERA.
    if (Number(comment.userId) !== Number(req.user.id)) {
      return res.status(401).json({ msg: "¡No podés borrar comentarios de otros!" });
    }

    await comment.destroy();
    res.json({ msg: "Comentario eliminado con éxito" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
