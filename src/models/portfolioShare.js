const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const Portfolio = require("./portfolio");
const Share = require("./share");

const PortfolioShare = sequelize.define(
  "PortfolioShare",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    quantity: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0.0,
    }
  },
  {
    tableName: "PortfolioShare",
    timestamps: true,
  }
);

// Portfolio.hasMany(PortfolioShare); //, { foreignKey: "portfolio_id" });
// Share.hasMany(PortfolioShare); //, { foreignKey: "share_id" });
// PortfolioShare.belongsTo(Portfolio); //, { foreignKey: "portfolio_id" });
// PortfolioShare.belongsTo(Share); //, { foreignKey: "share_id" });

module.exports = PortfolioShare;
