// import * as functions from 'firebase-functions'
import GraphQLJSON from 'graphql-type-json';
import { v4 } from 'uuid'
// Imports the Google Cloud client library
const { Spanner } = require('@google-cloud/spanner');
const { projectId } = JSON.parse((process.env.FIREBASE_CONFIG as any))
console.log("config", projectId)

// Instantiates a client
const spanner = new Spanner({
  projectId
});

// Your Cloud Spanner instance ID
const instanceId = 'test-instance';

// Your Cloud Spanner database ID
const databaseId = 'testdb';

  // Gets a reference to a Cloud Spanner instance and database
  const instance = spanner.instance(instanceId);
  const database = instance.database(databaseId);

const resolveFunctions = {
  JSON: GraphQLJSON,
  Mutation: {
    async addTransaction(_, inputVar, context, info) {
      const { input } = inputVar
      console.log('Add transaction called:', input)
      console.log('Context', context)
      console.log('Info', info.operation.selectionSet.selections)
      // Instantiate Spanner table objects
      const singersTable = database.table('transactions');

      // Inserts rows into the Singers table
      // Note: Cloud Spanner interprets Node.js numbers as FLOAT64s, so
      // they must be converted to strings before being inserted as INT64s
      const result = { ID: v4(), ...JSON.parse(JSON.stringify(input)) }
      try {
        await singersTable.insert([
          result
        ]);
        console.log('Inserted the transaction', result)
        return result
      } catch(err) {
        console.log('Error thrown:', err)
        return {}
      }
    }
  },
  Query: {
    async transactions(_, input) {
      console.log('Get transactions called:', _, input)
      // The query to execute
      const query = {
        sql: 'SELECT * FROM transactions',
      };
    // Execute the query
      try {
        const results = await database.run(query);
        const rows = results[0].map(row => row.toJSON());
        rows.forEach((row, ind) => {
          console.log(`Row ${ind}:`, row)
        });
        return rows
      } catch(err) {
        console.log('Error thrown:', err)
        return {}
      }
    },
    async transaction(_, { id }) {
      console.log('Get transaction called:', _, id)
      // The query to execute
      const query = {
        sql: `SELECT * FROM transactions WHERE ID='${id}'`,
      };
    // Execute the query
      try {
        const results = await database.run(query);
        console.log('Results', results)
        const rows = results[0].map(row => row.toJSON());
        rows.forEach((row, ind) => {
          console.log(`Row ${ind}:`, row)
        });
        return rows[0]
      } catch(err) {
        console.log('Error thrown:', err)
        return {}
      }
    },
  },
  User: {

  },
  Team: {
    // members(_, { teamId }) {
    //   return rtdbVal(`teams/${teamId}/members`)
    // }
  }
}

export default resolveFunctions