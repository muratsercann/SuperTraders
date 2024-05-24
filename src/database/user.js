const User = require("../models/user");

const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

const getUserById = async (userId) => {
  return await User.findOne({
    where: {
      id: userId,
    },
  });
};

module.exports = { getAllUsers, getUserById };
