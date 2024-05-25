const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Share = sequelize.define(
  "Share",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    symbol: {
      type: DataTypes.STRING(3),
      unique: true,
      allowNull: false,
    },
    currentPrice: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "Share",
    timestamps: true,
  }
);

module.exports = Share;
