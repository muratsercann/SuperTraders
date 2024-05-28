const service = require("../services/mainService");

const getAllShares = async (req, res) => {
  const result = await service.getAllShares();
  res.status(200).json(result);
};

const getAllUsers = async (req, res) => {
  const result = await service.getAllUsers();
  res.status(200).json(result);
};

const getTransactionLogs = async (req, res) => {
  const result = await service.getTransactionLogs();
  res.status(200).json(result);
};

module.exports = { getAllUsers, getAllShares, getTransactionLogs };
