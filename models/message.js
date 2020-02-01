export default (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'Message',
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
        references: { model: 'Users', key: 'id' }
      },
      receiverId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        references: { model: 'Users', key: 'id' }
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

  Message.associate = models => {
    // Message.belongsTo(models.user, {
    //   as: 'sender',
    //   foreignKey: 'senderId',
    //   onDelete: 'CASCADE'
    // });
    // Message.belongsTo(models.user, {
    //   as: 'receiver',
    //   foreignKey: 'receiverId'
    // });
  };

  return Message;
};
