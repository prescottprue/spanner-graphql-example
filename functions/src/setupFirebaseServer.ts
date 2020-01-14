// import bodyParser from "body-parser"
import express from "express"
const { ApolloServer } = require('apollo-server-express');
// import schema from "./schema"
// import { printSchema } from "graphql/utilities/schemaPrinter"
import resolvers from "./resolvers"
import typeDefs from "./schema"

const setupGraphQLServer = () => {
  // setup server
  const app = express()
  const server = new ApolloServer({ typeDefs, resolvers });

  server.applyMiddleware({ app });


  return server
}

export default setupGraphQLServer