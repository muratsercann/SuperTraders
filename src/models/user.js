const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    tableName: "User",
    timestamps: true,
  }
);

module.exports = User;
