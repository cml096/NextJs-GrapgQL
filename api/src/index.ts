import { ApolloServer } from 'apollo-server';
import * as console from 'console'
import { PrismaClient } from '@prisma/client'
import resolvers from './resolvers'
import * as path from 'path'
import { readFileSync } from 'fs'

const typeDefs = readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8')
const orm = new PrismaClient();
export default async function start() {

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
      orm
    }
  });

  server.listen().then(({url}) => console.log(`Server running on port ${url}`))
}
