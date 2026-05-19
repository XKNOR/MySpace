const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Blog = require("../models/Blog");
const User = require("../models/User");
const auth = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, "uploads/"); },
  filename: (req, file, cb) => { cb(null, Date.now() + path.extname(file.originalname)); },
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const posts = await Blog.findAll({
      include: [{ model: User, as: "author", attributes: ["username", "email"] }],
      order: [["createdAt", "DESC"]],
    });
    res.json(posts);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Blog.create({
      title,
      content,
      image: req.file ? `/uploads/${req.file.filename}` : null,
      userId: req.user.id,
    });
    res.status(201).json(post);
  } catch (err) { res.status(500).json({ error: err.message }); }
});
module.exports = router;
