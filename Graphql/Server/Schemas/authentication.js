const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
} = require("graphql");
const { login, signup, confirmEmail } = require("../authentication/authFunction");



const RegisteredUserType = new GraphQLObjectType({
  name: "RegisteredUser",
  fields: () => ({
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    mobile: { type: GraphQLString },
  }),
});

const authSchema = `#graphql
  type RegisteredUser {
    name: String!
    username: String!
    email: String!
    mobile: String
  }
  type SessionData {
    session: String!
    success: Boolean!
    name: String!
  }

  type LoggedInUser {
    user: String
    refreshToken: String
    userToken: String
    requireConfirmation: SessionData
  }
  
  type Query {
    loginUser: LoggedInUser
  }

`;


const SessionData = new GraphQLObjectType({
  name: "SessionData",
  fields: {
    session: { type: GraphQLString },
    success: { type: GraphQLBoolean },
    name: { type: GraphQLString },
  },
});

const LoggedInUserType = new GraphQLObjectType({
  name: "LoggedInUser",
  fields: () => ({
    user: { type: RegisteredUserType },
    refreshToken: { type: GraphQLString },
    userToken: { type: GraphQLString },
    requireConfirmation: { type: SessionData },
  }),
});

const authQuery = new GraphQLObjectType({
  name: "AuthQuery",
  fields: {
    loginUser: {
      type: LoggedInUserType,
      args: {
        user: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        return await login(args);
      },
    },
  },
});

const authMutation = new GraphQLObjectType({
  name: "authMutations",
  fields: () => ({
    signup: {
      type: SessionData,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        username: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        mobile: { type: GraphQLString },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        return await signup(args);
      },
    },
    deleteUser: {
      type: RegisteredUserType,
      args: { id: { type: GraphQLNonNull(GraphQLString) } },
      resolve: async (parent, args) => {
        //return await
      },
    },
    updateUser: {
      type: RegisteredUserType,
      args: {},
      resolve: async (parent, args) => {},
    },
    confirmUserEmail: {
      type: LoggedInUserType,
      args: {
        session: { type: GraphQLNonNull(GraphQLString) },
        code: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        return await confirmEmail(args)
      }
    },
  }),
});


const authResolvers = {
  query: {
    async signin(parent, args) {
      return await login(args);
    },
  },
  mutations: {
    async confirmUserEmail(parent, args) {
      return await confirmEmail(args);
    },
    async signup(parent, args) {
      return await signup(args);
    },
  },
};


module.exports = {authQuery,authMutation, authSchema};
