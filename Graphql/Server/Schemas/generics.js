const {GraphQLEnumType} = require('graphql')


const ProgressEnum = new GraphQLEnumType({
  name: "ProgressEnum",
  values: {
    IN_PROGRESS: { value: "In progress" },
    COMPLETED: { value: "Completed" },
    NOT_STARTED: { value: "Not Started" },
  },
});

const GoalCategoryEnum = new GraphQLEnumType({
  name: "GoalCategory",
  values: {
    PERSONAL: { value: "personal" },
    FITNESS: { value: "fitness" },
    FAMILY: { value: "family" },
    JOB: { value: "job" },
    PROJECT: { value: "project" },
    HEALTH: { value: "health" },
    OTHER: { value: "other" },
  },
});

const PrivacyTypeEnum = new GraphQLEnumType({
  name: "PrivacyType",
  values: {
    PUBLIC: { value: "public" },
    PRIVATE: { value: "private" },
  },
});

const ExpenseCategoryEnum = new GraphQLEnumType({
  name: "ExpenseCategory",
  values: {
    FOOD: { value: "Food" },
    CLOTHING: { value: "Clothing" },
    FAMILY: { value: "Family" },
    ACADEMICS: { value: "Academics" },
    LIVING: { value: "Living" },
    TRAVEL: { value: "Travel" },
  },
});

const PaymentMethodEnum = new GraphQLEnumType({
  name: "PaymentMethod",
  values: {
    CASH: { value: "Cash" },
    CARD: { value: "Card" },
    CREDIT: { value: "Credit" },
  },
});

module.exports = {
  PaymentMethodEnum,
  ExpenseCategoryEnum,
  PrivacyTypeEnum,
  GoalCategoryEnum,
  ProgressEnum
}