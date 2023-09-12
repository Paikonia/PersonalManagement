const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");

const dummyScema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "query1",
    fields: () => ({
      message: {
        type: GraphQLString,
        resolve: ()=> 'Hello world'
      },
    }),
  }),
});
