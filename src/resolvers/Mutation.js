import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { APP_SECRET, getUserId } from '../utils';

async function signup(parent, args, { models }, info) {
  // 1
  const password = await bcrypt.hash(args.password, 10);
  const { sex, names, email } = args;
  // 2
  const user = await models.User.create({
    sex,
    names,
    email,
    password
  });

  // 3
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  // // 4;
  // eslint-disable-next-line no-sequences
  return { user, token };
}

async function login(parent, args, { models }, info) {
  // 1
  const user = await models.User.findOne({ email: args.email });
  if (!user) {
    throw new Error('No such user found');
  }
  // 2
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  // 3
  return {
    token,
    user
  };
}

async function createMessage(parent, args, { models, request }, info) {
  const senderId = getUserId(request);
  const { receiverId, messageContent } = args;
  const chatId = senderId + receiverId;
  const messaging = await models.Message.create({
    chatId,
    senderId,
    receiverId,
    messageContent
  });

  if (!messaging) {
    throw new Error('Send message error');
  }

  return messaging;
}

export default {
  signup,
  login,
  createMessage
};
