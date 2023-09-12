const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLID,
} = require("graphql");

const {
  getBudgetById,
  getAllBudgets,
  insertBudget,
  deleteBudgetById,
  updateBudget,
} = require("../QueryBuilders/budgetDatabaseCalls");

const BudgetType = new GraphQLObjectType({
  name: "Budget",
  fields: () => ({
    budgetId: { type: GraphQLID },
    budget: { type: GraphQLString },
    amount: { type: GraphQLFloat },
    dateOfPayment: { type: GraphQLString },
    goalId: { type: GraphQLString },
    paid: { type: GraphQLBoolean },
    expenseCategory: { type: ExpenseCategoryEnum },
    budgetPrivacy: { type: PrivacyTypeEnum },
    creator: { type: GraphQLString },
  }),
});

const budgetMutations = {
  addBudget: {
    type: BudgetType,
    args: {
      budget: { type: GraphQLNonNull(GraphQLString) },
      amount: { type: GraphQLNonNull(GraphQLFloat) },
      dateOfPayment: { type: GraphQLString },
      goalId: { type: GraphQLString },
      paid: { type: GraphQLNonNull(GraphQLBoolean) },
      expenseCategory: { type: GraphQLNonNull(ExpenseCategoryEnum) },
      budgetPrivacy: { type: GraphQLNonNull(PrivacyTypeEnum) },
    },
    resolve: async (parent, args) => {
      return await insertBudget(args);
    },
  },
  deleteBudget: {
    type: BudgetType,
    args: { id: { type: GraphQLNonNull(GraphQLString) } },
    resolve: async (parent, args) => {
      return await deleteBudgetById(args.id);
    },
  },
  updateBudget: {
    type: BudgetType,
    args: {
      id: { type: GraphQLString },
      budget: { type: GraphQLString },
      amount: { type: GraphQLFloat },
      dateOfPayment: { type: GraphQLString },
      goalId: { type: GraphQLString },
      paid: { type: GraphQLBoolean },
      expenseCategory: { type: ExpenseCategoryEnum },
      budgetPrivacy: { type: PrivacyTypeEnum },
      creator: { type: GraphQLString },
    },
    resolve: async (parent, args) => {
      return await updateBudget(args.id, args);
    },
  },
};

const budgetQueries = {
  Budgets: {
    type: new GraphQLList(BudgetType),
    resolve: async () => await getAllBudgets(),
  },
  Budget: {
    type: BudgetType,
    args: { id: { type: GraphQLString } },
    resolve: async (parent, args) => await getBudgetById(args.id),
  },
};
