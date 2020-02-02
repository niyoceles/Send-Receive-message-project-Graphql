const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const { APP_SECRET } = process.env;

function getUserId(request) {
  const Authorization = request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId;
  }

  throw new Error('Not authenticated');
}

module.exports = {
  APP_SECRET,
  getUserId
};
