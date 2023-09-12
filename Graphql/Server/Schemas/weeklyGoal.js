const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLID,
} = require("graphql");

const {
  getAllWeeklyGoals,
  getWeeklyGoalById,
  updateWeeklyGoal,
  deleteWeeklyGoalById,
  insertWeeklyGoal,
} = require("../QueryBuilders/weeklyGoalDatabaseCalls");

const WeeklyGoalType = new GraphQLObjectType({
  name: "WeeklyGoal",
  fields: () => ({
    wGoalId: { type: GraphQLID },
    goal: { type: GraphQLString },
    urgency: { type: GraphQLInt },
    importance: { type: GraphQLInt },
    weekStart: { type: GraphQLString },
    weekEnd: { type: GraphQLString },
    completed: { type: GraphQLBoolean },
    monthlyGoalId: { type: GraphQLString },
    goalPriority: { type: GraphQLInt },
    tasks: { type: GraphQLString },
  }),
});

const weeklyGoalMutations = {
  addWeeklyGoal: {
    type: WeeklyGoalType,
    args: {
      goal: { type: GraphQLNonNull(GraphQLString) },
      urgency: { type: GraphQLNonNull(GraphQLInt) },
      importance: { type: GraphQLNonNull(GraphQLInt) },
      weekStart: { type: GraphQLNonNull(GraphQLString) },
      weekEnd: { type: GraphQLNonNull(GraphQLString) },
      monthlyGoalId: { type: GraphQLString },
      tasks: { type: GraphQLString },
    },
    resolve: async (parent, args) => {
      return await insertWeeklyGoal(args);
    },
  },
  deleteWeeklyGoal: {
    type: WeeklyGoalType,
    args: { id: { type: GraphQLNonNull(GraphQLString) } },
    resolve: async (parent, args) => {
      return await deleteWeeklyGoalById(args.id);
    },
  },
  updateWeeklyGoal: {
    type: WeeklyGoalType,
    args: {
      id: { type: GraphQLNonNull(GraphQLString) },
      goal: { type: GraphQLString },
      urgency: { type: GraphQLInt },
      importance: { type: GraphQLInt },
      weekStart: { type: GraphQLString },
      weekEnd: { type: GraphQLString },
      completed: { type: GraphQLBoolean },
      monthlyGoalId: { type: GraphQLString },
      tasks: { type: GraphQLString },
    },
    resolve: async (parent, args) => {
      return await updateWeeklyGoal(args.id, args);
    },
  },
};

const weeklyGoalQueries = {
  WeeklyGoals: {
    type: new GraphQLList(WeeklyGoalType),
    resolve: async () => await getAllWeeklyGoals(),
  },
  WeeklyGoal: {
    type: WeeklyGoalType,
    args: { id: { type: GraphQLString } },
    resolve: async (parent, args) => await getWeeklyGoalById(args.id),
  },
};
