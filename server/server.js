const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');
const db = require('./config/keys').mongoURI;
const UserAPI = require('./datasources/user');
const { User } = require('./models/user');

//######## Mongo connection ###########
const mongoose = require('mongoose');
mongoose.connect(db, { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log(`Connected to mongo at ${db}`));

const dataSources = () => ({
  UserAPI: new UserAPI({ User })
});

//######## Setting up server ###########
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  introspection:true,
  playground:true,
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: process.env.PORT || 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);

module.exports = {
  dataSources,
  typeDefs,
  resolvers,
  ApolloServer,
  server,
  User
};
