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
    },
    totalPrice: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    }
  },
  {
    tableName: "Transactionlog",
    timestamps: true,
  }
);

// User.hasMany(TransactionHistory);//, { foreignKey: 'user_id' });
// Portfolio.hasMany(TransactionHistory);//, { foreignKey: 'portfolio_id' });
// Share.hasMany(TransactionHistory);//, { foreignKey: 'share_id' });
// TransactionHistory.belongsTo(User);//, { foreignKey: 'user_id' });
// TransactionHistory.belongsTo(Portfolio);//, { foreignKey: 'portfolio_id' });
// TransactionHistory.belongsTo(Share);//, { foreignKey: 'share_id' });

module.exports = Transactionlog;
