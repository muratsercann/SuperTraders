const User = require("../database/user");

const getUserById = async (userId) => {
    const user = await User.getUserById(userId);
    return user;
  };

const getAllUsers = async () => {
  const users = await User.getAllUsers();
  return users;
};

module.exports = {
    getAllUsers,
    getUserById
};
