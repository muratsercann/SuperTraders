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
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0.0,
    }
  },
  {
    tableName: "PortfolioShare",
    timestamps: true,
  }
);

 Portfolio.hasMany(PortfolioShare, { foreignKey: "portfolioId" });
 PortfolioShare.belongsTo(Portfolio, { foreignKey: "portfolioId" });
 PortfolioShare.hasOne(Share, {foreignKey : "id"});

module.exports = PortfolioShare;
