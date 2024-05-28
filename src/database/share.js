const Share = require("../models/share");

async function getAllShares() {
  return await Share.findAll({
    order : ['id']
  });
}

async function getShareById(shareId) {
  return await Share.findOne({
    where: {
      id: shareId,
    },
  });
}

const updateShareQuantity = async (shareId, newQuantity, transaction) => {
  return await Share.update(
    { quantity: newQuantity },
    {
      where: {
        id: shareId,
      },
      transaction,
    }
  );
};

module.exports = { getShareById, updateShareQuantity, getAllShares };
