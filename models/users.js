export default (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      sex: {
        type: DataTypes.STRING,
        allowNull: false
      },
      names: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        required: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
      },
      isOnline: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {}
  );
  users.associate = models => {
    users.hasMany(models.messages, { as: 'sender', foreignKey: 'senderId' });
    users.hasMany(models.messages, {
      as: 'receiver',
      foreignKey: 'receiverId'
    });
  };
  return users;
};
