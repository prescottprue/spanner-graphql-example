// import * as admin from 'firebase-admin';
import express from "express"
import * as functions from 'firebase-functions';
import resolvers from "./resolvers"
import typeDefs from "./schema"

const { ApolloServer } = require('apollo-server-express');

const app = express()
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });


// Initialize Firebase so it is available within functions
try {
  console.log('first init')
  // admin.initializeApp(functions.config().firebase)
} catch (e) {
  /* istanbul ignore next: not called in tests */
  console.error(
    'Caught error initializing app with functions.config():',
    e.message || e
  )
}

// Set Firestore timestamp settings
// NOTE: Skipped when running tests tests so it does not have to be mocked
if (process.env.NODE_ENV !== 'test') {
  // admin.firestore().settings({ timestampsInSnapshots: true })
}


// https://us-central1-<project-name>.cloudfunctions.net/api
export const api = functions.https.onRequest(app)