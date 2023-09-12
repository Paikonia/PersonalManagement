const makeDatabaseCall = require("../database/mysqlIndex");

const insertExpense = async (expenseObject, userId) => {
  try {
    const parsed = parseExpenseInsertObject(expenseObject);
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

const parseExpenseInsertObject = (expense, userId) => {
  if (
    "budgetId" in expense &&
    typeof expense.budgetId === "string" &&
    "item" in expense &&
    typeof expense.item === "string" &&
    "amount" in expense &&
    typeof expense.amount === "number" &&
    "date" in expense &&
    typeof expense.date === "string" &&
    "method" in expense &&
    (expense.method === "Cash" ||
      expense.method === "Card" ||
      expense.method === "Credit") &&
    "category" in expense &&
    (expense.category === "Food" ||
      expense.category === "Clothing" ||
      expense.category === "Family" ||
      expense.category === "Academics" ||
      expense.category === "Living" ||
      expense.category === "Travel") &&
    "privacy" in expense &&
    (expense.privacy === "public" || expense.privacy === "private")
  ) {
    return `insert into expensesTable(budgetId, item, amount, expenseDate,paymentMethod,expenseCategeory,expensePrivacy,creator) \
    values('${expense.budgetId === ''? null : expense.budgetId}', '${expense.item}', ${expense.amount}, '${
      expense.date
    }', '${expense.method}', '${expense.category}', '${
      expense.privacy
    }', '${"userID"}');`;
  }
  return {};
};

const getExpenseById = async (expenseId) => {
  try {
    const expense = await makeDatabaseCall(
      `SELECT * FROM expensesTable WHERE id = '${expenseId}';`
    );
    return expense;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


const getAllExpenses = async () => {
  try {
    const expenses = await makeDatabaseCall("SELECT * FROM expensesTable;");
    return expenses;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


const deleteExpenseById = async (expenseId) => {
  try {
    await makeDatabaseCall(
      `DELETE FROM expensesTable WHERE id = '${expenseId}';`
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateExpense = async (expenseId, updatedExpense) => {
  try {
    const parsed = parseExpenseUpdateObject(updatedExpense);
    if (Object.keys(parsed).length === 0) {
      return null;
    }

    await makeDatabaseCall(
      `UPDATE expensesTable SET ${parsed} WHERE id = '${expenseId}';`
    );

    return parsed;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const parseExpenseUpdateObject = (expense) => {
  const updateFields = [];
  if ("budgetId" in expense && typeof expense.budgetId === "string") {
    updateFields.push(
      `budgetId = '${expense.budgetId === "" ? null : expense.budgetId}'`
    );
  }
  if ("item" in expense && typeof expense.item === "string") {
    updateFields.push(`item = '${expense.item}'`);
  }
  if ("amount" in expense && typeof expense.amount === "number") {
    updateFields.push(`amount = ${expense.amount}`);
  }
  if ("date" in expense && typeof expense.date === "string") {
    updateFields.push(`expenseDate = '${expense.date}'`);
  }
  if (
    "method" in expense &&
    (expense.method === "Cash" ||
      expense.method === "Card" ||
      expense.method === "Credit")
  ) {
    updateFields.push(`paymentMethod = '${expense.method}'`);
  }
  if (
    "category" in expense &&
    (expense.category === "Food" ||
      expense.category === "Clothing" ||
      expense.category === "Family" ||
      expense.category === "Academics" ||
      expense.category === "Living" ||
      expense.category === "Travel")
  ) {
    updateFields.push(`expenseCategeory = '${expense.category}'`);
  }
  if (
    "privacy" in expense &&
    (expense.privacy === "public" || expense.privacy === "private")
  ) {
    updateFields.push(`expensePrivacy = '${expense.privacy}'`);
  }

  return updateFields.join(", ");
};



module.exports = {insertExpense, updateExpense, deleteExpenseById, getAllExpenses, getExpenseById};
