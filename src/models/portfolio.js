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
      unique: true,
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
    limit: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0.0,
      get() {
        const value = this.getDataValue("limit");
        return parseFloat(value);
      },
    },
  },
  {
    tableName: "Portfolio",
    timestamps: true,
  }
);

User.hasOne(Portfolio, { foreignKey: "userId" });
Portfolio.belongsTo(User, { foreignKey: "userId" });

module.exports = Portfolio;
