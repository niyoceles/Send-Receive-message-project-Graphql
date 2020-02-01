module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('messages', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      chatId: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
      },
      senderId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },

      receiverId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      messageContent: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
      },
      isRead: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('messages')
};
