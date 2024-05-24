const userService = require("../services/userService");

const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.send({ status: "OK", data: users });
};

const getUserById = async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  res.send({ status: "OK", data: user });
};

module.exports = {
  getAllUsers,
  getUserById,
};
