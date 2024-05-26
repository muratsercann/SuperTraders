const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const User = require("./user");
const Portfolio = require("./portfolio");
const Share = require("./share");

const Transactionlog = sequelize.define(
  "Transactionlog",
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
    portfolioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Portfolio,
        key: "id",
      },
    },
    shareId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Share,
        key: "id",
      },
    },
    transactionType: {
      type: DataTypes.ENUM("buy", "sell"),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pricePerShare: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      get() {
        const value = this.getDataValue('pricePerShare');
        return parseFloat(value);
      }
    },
    totalPrice: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      get() {
        const value = this.getDataValue('totalPrice');
        return parseFloat(value);
      }
    },
    beforeLimit : {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      get() {
        const value = this.getDataValue('beforeLimit');
        return parseFloat(value);
      }
    },
    afterLimit : {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      get() {
        const value = this.getDataValue('afterLimit');
        return parseFloat(value);
      }
    }
  },
  {
    tableName: "Transactionlog",
    timestamps: true,
  }
);

module.exports = Transactionlog;
