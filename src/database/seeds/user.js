const User = require("../../models/user");

async function seedUsers() {
  const users = [
    {
      username: "msercan",
      email: "msercan@mail.com",
    },
    {
      username: "fgurdal",
      email: "fgurdal@mail.com",
    },
    {
      username: "mchanbaz",
      email: "mchanbaz@mail.com",
    },
    {
      username: "asonar",
      email: "asonar@mail.com",
    },
    {
      username: "kozel",
      email: "kozel@mail.com",
    },
  ];

  await User.bulkCreate(users);
}

module.exports = { seedUsers };
