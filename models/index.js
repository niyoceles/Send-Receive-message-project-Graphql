import Sequelize from 'sequelize';

const sequelize = new Sequelize('chatting_db', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres'
});

const db = {
  User: sequelize.import('./user'),
  Message: sequelize.import('./message')
};

// Object.keys(db).forEach((modelName) => {
//   if ('associate' in db[modelName]) {
//     db[modelName].associate(db);
//   }
// });

db.sequelize = sequelize;
// db.Sequelize = Sequelize;

export default db;
