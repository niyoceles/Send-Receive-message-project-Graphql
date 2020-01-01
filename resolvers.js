import Sequelize from 'sequelize';

const { Op } = Sequelize;
export default {
  Query: {
    allUsers: (parent, args, { models }) => models.User.findAll(),
    getUser: (parent, { username }, { models }) =>
      models.User.findOne({
        where: {
          username
        }
      }),
    getSentMessage: (parent, { senderId }, { models }) =>
      models.Message.findAll({
        where: {
          senderId
        }
      }),
    getReceivedMessage: (parent, { receiverId }, { models }) =>
      models.Message.findAll({
        where: {
          receiverId
        }
      }),

    getMyMessages: (parent, { receiverId, senderId }, { models }) =>
      models.Message.findAll({
        where: {
          chatId: {
            [Op.or]: [`${senderId + receiverId}`, `${receiverId + senderId}`]
          }
        }
      })
  },

  Mutation: {
    createUser: (parent, args, { models }) => models.User.create(args),
    updateUser: (parent, { username, newUsername }, { models }) =>
      models.User.update({ username: newUsername }, { where: { username } }),
    deleteUser: (parent, args, { models }) =>
      models.User.destroy({ where: args }),
    createMessage: (parent, args, { models }) => models.Message.create(args) // create message
    // createMessage: (
    //   parent,
    //   { chatId, senderId, receiverId, messageContent },
    //   { models }
    // ) =>
    //   models.Message.findOrCreate({
    //     where: { chatId: chatId || (receiverId.senderId) },
    //     defaults: {
    //       chatId,
    //       senderId,
    //       receiverId,
    //       messageContent
    //     }
    //   }) // create me
  }
};
