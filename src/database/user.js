const User = require("../models/user");

const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

const getUserById = async (userId) => {
  return await User.findByPk(userId);
};

const isExistingUser = async (userId) => {
  const user = await User.findByPk(userId);
  return user ? true : false;
};

module.exports = { getAllUsers, getUserById, isExistingUser };
