export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
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
  User.associate = models => {
    // User.hasMany(models.message, { as: 'sender', foreignKey: 'senderId' });
    // User.hasMany(models.message, { as: 'receiver', foreignKey: 'receiverId' });
  };
  return User;
};
