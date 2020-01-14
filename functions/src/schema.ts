import { gql } from 'apollo-server-express'
// import Team from '@reside-eng/pitcher/lib/types/Team'

const schema = gql`
scalar JSON
type UserAsanaSettings {
  marketing: String
  vendor: String
}
type User {
  id: String! # the ! means that every user object _must_ have an id
  approved: Boolean!
  email: String!
  firstname: String
  lastname: String
  team: Team
  servicedAgents: String
  mergedAccounts: JSON
  asana: UserAsanaSettings
}
type Team {
  id: String!
  branding: JSON
  name: String
  createdBy: User
  members: JSON
  # friends @include(if: $withMembers) {
  #   name
  # }
  joinDate: String
  googleCalendarApiLinked: Boolean
  defaultTCs: JSON
  defaultMCs: JSON
}

type Transaction {
  ID: String!
  Address: String
  City: String
  Close_Date: String
  Double_End: Boolean
  Sale_Price: String
  Side_Type: String
  State: String
  Zip: String
}
# the schema allows the following query:
type Query {
  transactions: [Team]
  transaction(id: String!): Team
  teams: [Team]
  team(id: String!): Team
  users: [User]
  user(id: String!): User
}
input NewTransactionInput {
  Address: String
  City: String
  Close_Date: String
  Double_End: Boolean
  Sale_Price: String
  Side_Type: String
  State: String
  Zip: String
}
# this schema allows the following mutation:
type Mutation {
  addTransaction (
    input: NewTransactionInput!
  ): Transaction
}
`

export default schema