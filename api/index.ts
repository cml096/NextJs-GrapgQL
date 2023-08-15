// import * as dotenv from 'dotenv'
// dotenv.config()
//
// import app from './src'
//
// app()

import { ApolloServer } from 'apollo-server';
import * as console from 'console'

const typeDefs = `
  type Query {
    info: String!
  }
`;

const resolvers = {
  Query: {
    info: () => `This is API in GraphQL`
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({url}) => console.log(`Server running on port ${url}`))
