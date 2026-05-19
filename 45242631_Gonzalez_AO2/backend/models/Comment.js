const { DataTypes } = require("sequelize");
const db = require("../db");
const Comment = db.define("Comment", {
  content: { type: DataTypes.TEXT, allowNull: false },
  blogId: { type: DataTypes.INTEGER, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false }
});
module.exports = Comment;
