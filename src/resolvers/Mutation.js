import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { APP_SECRET, getUserId } from '../utils';

async function signup(parent, args, { models }, info) {
  // 1
  const password = await bcrypt.hash(args.password, 10);
  const { sex, names, email } = args;
  // 2
  const user = await models.users.create({
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
  const user = await models.users.findOne({ email: args.email });
  if (!user) {
    return { error: 'No such user found' };
  }
  // 2
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    return { error: 'Invalid password' };
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
  const messaging = await models.messages.create({
    chatId,
    senderId,
    receiverId,
    messageContent
  });

  if (!messaging) {
    return { error: 'Send message error' };
  }

  return messaging;
}

export default {
  signup,
  login,
  createMessage
};
