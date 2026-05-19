const { DataTypes } = require("sequelize");
const db = require("../db");
const Blog = db.define("Blog", {
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  image: { type: DataTypes.STRING },
  userId: { type: DataTypes.INTEGER, allowNull: false }
});
module.exports = Blog;
