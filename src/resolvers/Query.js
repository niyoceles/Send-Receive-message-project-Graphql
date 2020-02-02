import Sequelize from 'sequelize';

const { Op } = Sequelize;

async function allUsers(parent, args, { models }, info) {
  const result = await models.users.findAll();
  return result;
}

async function getMyMessages(
  parent,
  { receiverId, senderId },
  { models },
  info
) {
  const result = await models.messages.findAll({
    where: {
      chatId: {
        [Op.or]: [`${senderId + receiverId}`, `${receiverId + senderId}`]
      }
    }
  });
  return result;
}

export default {
  allUsers,
  getMyMessages
};
