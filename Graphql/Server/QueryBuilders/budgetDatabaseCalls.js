const makeDatabaseCall = require('../database/mysqlIndex')



const insertBudget = async (budgetObject, userId) => {
  try {
    const parsed = parseBudgetInsertObject(budgetObject, userId);
    if (Object.keys(parsed).length === 0) {
      return null;
    }

    await makeDatabaseCall(parsed);

    return parsed;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const parseBudgetInsertObject = (budget, userId) => {
  if (
    "budgetId" in budget &&
    typeof budget.budgetId === "string" &&
    "budget" in budget &&
    typeof budget.budget === "string" &&
    "amount" in budget &&
    typeof budget.amount === "number" &&
    "dateOfPayment" in budget &&
    typeof budget.dateOfPayment === "string" &&
    "goalId" in budget &&
    "expenseCategory" in budget &&
    (budget.expenseCategory === "Food" ||
      budget.expenseCategory === "Clothing" ||
      budget.expenseCategory === "Family" ||
      budget.expenseCategory === "Academics" ||
      budget.expenseCategory === "Living" ||
      budget.expenseCategory === "Travel") &&
    "budgetPrivacy" in budget &&
    (budget.budgetPrivacy === "public" || budget.budgetPrivacy === "private")
  ) {
    return `INSERT INTO budgetTable(budgetId, budget, amount, dateOfPayment, goalId, expenseCategory, budgetPrivacy, creator) \
    VALUES('${budget.budgetId}', '${budget.budget}', ${budget.amount}, '${budget.dateOfPayment}', '${budget.goalId}', \
    '${budget.expenseCategory}', '${budget.budgetPrivacy}', '${userId}');`;
  }
  return {};
};



const updateBudget = async (budgetId, updatedBudget) => {
  try {
    const parsed = parseBudgetUpdateObject(updatedBudget);
    if (Object.keys(parsed).length === 0) {
      return null;
    }

    await makeDatabaseCall(
      `UPDATE budgetTable SET ${parsed} WHERE budgetId = '${budgetId}';`
    );

    return parsed;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const parseBudgetUpdateObject = (budget) => {
  const updateFields = [];
  if ("budget" in budget && typeof budget.budget === "string") {
    updateFields.push(`budget = '${budget.budget}'`);
  }
  if ("amount" in budget && typeof budget.amount === "number") {
    updateFields.push(`amount = ${budget.amount}`);
  }
  if ("dateOfPayment" in budget && typeof budget.dateOfPayment === "string") {
    updateFields.push(`dateOfPayment = '${budget.dateOfPayment}'`);
  }
  if ("goalId" in budget) {
    updateFields.push(`goalId = '${budget.goalId}'`);
  }
  if ("expenseCategory" in budget) {
    updateFields.push(`expenseCategory = '${budget.expenseCategory}'`);
  }
  if (
    "budgetPrivacy" in budget &&
    (budget.budgetPrivacy === "public" || budget.budgetPrivacy === "private")
  ) {
    updateFields.push(`budgetPrivacy = '${budget.budgetPrivacy}'`);
  }

  return updateFields.join(", ");
};



const deleteBudgetById = async (budgetId) => {
  try {
    await makeDatabaseCall(
      `DELETE FROM budgetTable WHERE budgetId = '${budgetId}';`
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};


const getAllBudgets = async () => {
  try {
    const budgets = await makeDatabaseCall("SELECT * FROM budgetTable;");
    return budgets;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


const getBudgetById = async (budgetId) => {
  try {
    const budget = await makeDatabaseCall(
      `SELECT * FROM budgetTable WHERE budgetId = '${budgetId}';`
    );
    return budget;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


module.exports = { getBudgetById, getAllBudgets, deleteBudgetById, updateBudget, insertBudget}