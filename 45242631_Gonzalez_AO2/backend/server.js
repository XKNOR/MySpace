const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");
const User = require("./models/User");
const Blog = require("./models/Blog");
const Comment = require("./models/Comment");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- RELACIONES (EL MOTOR DEL SISTEMA) ---
User.hasMany(Blog, { foreignKey: "userId", as: "posts" });
Blog.belongsTo(User, { foreignKey: "userId", as: "author" });

User.hasMany(Comment, { foreignKey: "userId", as: "comments" });
Comment.belongsTo(User, { foreignKey: "userId", as: "author" });

Blog.hasMany(Comment, { foreignKey: "blogId", as: "comments" });
Comment.belongsTo(Blog, { foreignKey: "blogId" });

// --- RUTAS ---
app.use("/api/auth", require("./routes/users"));
app.use("/api/blogs", require("./routes/blogs"));
app.use("/api/comments", require("./routes/comments"));

db.sync({ alter: true }).then(() => {
  app.listen(5000, () => {
    console.log("=========================================");
    console.log("    SERVIDOR CONECTADO Y ASOCIADO (5000) ");
    console.log("=========================================");
  });
});
