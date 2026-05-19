const jwt = require("jsonwebtoken");
const SECRET = "CLAVE_MAESTRA_123";
module.exports = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) return res.status(401).json({ error: "Acceso denegado" });
    const token = authHeader.split(" ")[1];
    const verified = jwt.verify(token, SECRET);
    req.user = verified;
    next();
  } catch (err) { res.status(400).json({ error: "Token no válido" }); }
};
