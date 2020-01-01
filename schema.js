export default `
  type User {
    id: String!
    username: String!
    names: String!
    email: String!
    password: String!
    createdAt: String!
    updatedAt: String! 
  },
  type Message {
    id: String!
    chatId: String!
    senderId: String!
    receiverId: String!
    messageContent: String!
    isRead: Boolean!
    createdAt: String!
    updatedAt: String! 
  },
   
  type Query {
    allUsers: [User!]!
    getUser(username: String!): User
    getSentMessage(senderId: String!): [Message!]!
    getReceivedMessage(receiverId: String!): [Message!]!
    getMyMessages(receiverId: String!, senderId: String!): [Message!]!
  }
  type Mutation {
    createUser(username: String!, names: String!, email: String!, password: String!): User
    updateUser(id: String!, newUsername: String!): [String!]!
    deleteUser(id: String!): String!
    createMessage(chatId: String!, senderId: String!, messageContent:String!, receiverId: String!): Message
  }
`;
