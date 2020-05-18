const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    users: [User]
    getUserById(_id: ID!): UserResponse!
  }

  type User {
    _id: ID!
    email: String!
    name: String
    lastName: String
    profile: [Attributes]
    jobapplication: [JobApplication]
  }

  type Attributes {
    field: String
    value: String
  }

  type JobApplication {
    id: ID
    company: String
    url: String
    source: String
    platform: String
    application: [Attributes]
  }

  input Application {
    id: ID
    company: String!
    url: String
    source: String
    platform: String
    application: [Fields]
  }

  type Mutation {
    createUser (user: inputUser!): UserResponse!
    deleteUser(_id: ID!): UserResponse!
    updateProfile (_id: ID!, profile: [Fields]!): UserResponse!
    deleteProfile (_id: ID!): UserResponse!
    deleteFieldProfile (_id: ID!, field: String!): UserResponse!
    updateUser(_id: ID!, user: inputUser): UserResponse!
    createJobApplication(_id: ID!, application: Application!): UserResponse!
  }

  input inputUser {
    email: String!
    name: String
    lastName: String
    profile: [Fields]
  }

  input Fields {
    field: String
    value: String
  }

  type UserResponse {
    success: Boolean!
    message: String
    users: [User]
  }
`;

module.exports = typeDefs;
