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
  getAllMonthlyGoals,
  getMonthlyGoalById,
  deleteMonthlyGoalById,
  insertMonthlyGoal,
  updateMonthlyGoal,
} = require("../QueryBuilders/monthGoalDatabaseCalls");

const MonthlyGoalType = new GraphQLObjectType({
  name: "MonthlyGoal",
  fields: () => ({
    mGoalId: { type: GraphQLID },
    goal: { type: GraphQLString },
    urgency: { type: GraphQLInt },
    importance: { type: GraphQLInt },
    tasksInGoal: { type: GraphQLString }, // Assuming tasks_in_goal is a JSON string
    estimatePeriodPerDay: { type: GraphQLInt },
    complete: { type: GraphQLBoolean },
    goalPriority: { type: GraphQLInt },
    goalCategory: { type: GoalCategoryEnum },
    username: { type: GraphQLString },
    privacy: { type: PrivacyTypeEnum },
    monthStart: { type: GraphQLString }, // Assuming month_start is a string
  }),
});

const monthlyGoalMutations = {
  addMonthlyGoal: {
    type: MonthlyGoalType,
    args: {
      goal: { type: GraphQLString },
      urgency: { type: GraphQLInt },
      importance: { type: GraphQLInt },
      tasksInGoal: { type: GraphQLString }, // Assuming tasks_in_goal is a JSON string
      estimatePeriodPerDay: { type: GraphQLInt },
      complete: { type: GraphQLBoolean },
      goalPriority: { type: GraphQLInt },
      goalCategory: { type: GoalCategoryEnum },
      privacy: { type: PrivacyTypeEnum },
      monthStart: { type: GraphQLString },
    },
    resolve: async (parent, args) => {
      return await insertMonthlyGoal(args);
    },
  },
  deleteMonthlyGoal: {
    type: MonthlyGoalType,
    args: { id: { type: GraphQLNonNull(GraphQLString) } },
    resolve: async (parent, args) => {
      return await deleteMonthlyGoalById(args.id);
    },
  },
  updateMonthlyGoal: {
    type: MonthlyGoalType,
    args: {
      id: { type: GraphQLID },
      goal: { type: GraphQLString },
      urgency: { type: GraphQLInt },
      importance: { type: GraphQLInt },
      tasksInGoal: { type: GraphQLString }, // Assuming tasks_in_goal is a JSON string
      estimatePeriodPerDay: { type: GraphQLInt },
      complete: { type: GraphQLBoolean },
      goalCategory: { type: GoalCategoryEnum },
      privacy: { type: PrivacyTypeEnum },
      monthStart: { type: GraphQLString },
    },
    resolve: async (parent, args) => {
      return await updateMonthlyGoal(args.id, args);
    },
  },
};

const monthlyQuery = {
  MonthlyGoals: {
    type: new GraphQLList(MonthlyGoalType),
    resolve: async () => await getAllMonthlyGoals(),
  },
  MonthlyGoal: {
    type: MonthlyGoalType,
    args: { id: { type: GraphQLString } },
    resolve: async (parent, args) => await getMonthlyGoalById(args.id),
  },
};
