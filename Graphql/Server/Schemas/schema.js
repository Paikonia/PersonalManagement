const { GraphQLObjectType, GraphQLSchema, buildSchema, graphql,  } = require("graphql");
const {authMutation, authQuery, authSchema} = require('./authentication')

const build = buildSchema(authSchema)
console.log(build)
const RootQuery = new GraphQLObjectType({
  name: "rootQuery",
  fields: {
    authQuery
  },
});

const mutations = new GraphQLObjectType({
  name: "mutation",
  fields: {
    authQuery
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: mutations });
