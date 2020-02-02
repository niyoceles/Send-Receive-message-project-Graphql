export default (sequelize, DataTypes) => {
  const messages = sequelize.define(
    'messages',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      chatId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      senderId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        references: { model: 'users', key: 'id' }
      },
      receiverId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        references: { model: 'users', key: 'id' }
      },
      messageContent: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isRead: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {}
  );

  messages.associate = models => {
    messages.belongsTo(models.users, {
      as: 'sender',
      foreignKey: 'senderId',
      onDelete: 'CASCADE'
    });
    messages.belongsTo(models.users, {
      as: 'receiver',
      foreignKey: 'receiverId'
    });
  };

  return messages;
};
