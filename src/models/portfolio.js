const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const User = require("./user");

const Portfolio = sequelize.define(
  "Portfolio",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    balance: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
  },
  {
    tableName: "Portfolio",
    timestamps: true
  }
);

User.hasMany(Portfolio);//, { foreignKey: "user_id" });
Portfolio.belongsTo(User);//, { foreignKey: "user_id" });

module.exports = Portfolio;

/*
id
userId
limit
name
description
balance
currentTotalPrice

*/
