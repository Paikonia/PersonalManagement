const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} = require("graphql");

const {
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpenseById,
  insertExpense,
} = require("../QueryBuilders/expensesDatabaseCall");

const ExpenseType = new GraphQLObjectType({
  name: "Expense",
  fields: () => ({
    expenseId: { type: GraphQLID },
    budgetId: { type: GraphQLString },
    item: { type: GraphQLString },
    amount: { type: GraphQLFloat },
    expenseDate: { type: GraphQLString },
    paymentMethod: { type: PaymentMethodEnum },
    expenseCategory: { type: ExpenseCategoryEnum },
    expensePrivacy: { type: PrivacyTypeEnum },
    creator: { type: GraphQLString },
  }),
});

const expenseMutations = {
  addExpense: {
    type: ExpenseType,
    args: {
      budgetId: { type: GraphQLString },
      item: { type: GraphQLNonNull(GraphQLString) },
      amount: { type: GraphQLNonNull(GraphQLFloat) },
      date: { type: GraphQLNonNull(GraphQLString) },
      method: { type: GraphQLNonNull(PaymentMethodEnum) },
      category: { type: GraphQLNonNull(ExpenseCategoryEnum) },
      privacy: { type: PrivacyTypeEnum },
    },
    resolve: async (parent, args) => {
      const m = await insertExpense(args);
      return m;
    },
  },
  deleteExpense: {
    type: ExpenseType,
    args: { id: { type: GraphQLNonNull(GraphQLString) } },
    resolve: async (parent, args) => {
      return await deleteExpenseById(args.id);
    },
  },
  updateExpense: {
    type: ExpenseType,
    args: {
      id: { type: GraphQLNonNull(GraphQLString) },
      budgetId: { type: GraphQLString },
      item: { type: GraphQLNonNull(GraphQLString) },
      amount: { type: GraphQLNonNull(GraphQLFloat) },
      date: { type: GraphQLNonNull(GraphQLString) },
      method: { type: GraphQLNonNull(PaymentMethodEnum) },
      category: { type: GraphQLNonNull(ExpenseCategoryEnum) },
      privacy: { type: PrivacyTypeEnum },
    },
    resolve: async (parent, args) => {
      return await updateExpense(args);
    },
  },
};

const expenseQueries = {
  Expenses: {
    type: new GraphQLList(ExpenseType),
    resolve: async () => await getAllExpenses(),
  },
  Expense: {
    type: ExpenseType,
    args: { id: { type: GraphQLString } },
    resolve: async (parent, args) => await getExpenseById(args.id),
  },
};
