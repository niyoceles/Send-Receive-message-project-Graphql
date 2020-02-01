import { GraphQLServer } from 'graphql-yoga';
import models from '../models';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';

const resolvers = {
  Query,
  Mutation
};

// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => ({
    ...request,
    models
  })
});

server.start(() => console.log('Server is running on http://localhost:4000'));
