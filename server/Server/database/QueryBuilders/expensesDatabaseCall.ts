import { generateRandomAlphanumeric } from "../../utilities/generators";

export const insertExpenseQueryBuilder = (
  expenseObjects: ExpenseType[],
  userId: string
): { query: string; failed: ExpenseType[] } => {
  try {
    const data: {
      success: ExpenseType[];
      failed: ExpenseType[];
    } = {
      success: [],
      failed: [],
    };

    expenseObjects.forEach((expense) => {
      if (parseExpenseInsertObject(expense)) {
        data.success.push(expense);
      } else {
        data.failed.push(expense);
      }
    });

    const parsedString = data.success
      .map((success) => insertExpenseQueryString(success, userId))
      .join();
    const query = `INSERT INTO expensesTable(expenseId, budgetId, item, amount, expenseDate, paymentMethod, expenseCategory, expensePrivacy, creator) \
    VALUES ${parsedString};`;
    return {
      query: parsedString !== "" ? query : "",
      failed: data.failed,
    };
  } catch (error) {
    throw error;
  }
};

const parseExpenseInsertObject = (expense: ExpenseType): boolean => {
  expense.amount = Number(expense.amount)
  
  if (
    typeof expense.item !== "string" ||
    expense.item.trim() === "" ||
    typeof expense.amount !== "number" ||
    isNaN(expense.amount) ||
    !["Cash", "Card", "Credit"].includes(expense.paymentMethod) ||
    !["Food", "Clothing", "Family", "Academics", "Living", "Travel"].includes(
      expense.expenseCategory
    ) ||
    !["private", "public"].includes(expense.expensePrivacy)
  ) {
    return false;
  }
  return true;
};

const insertExpenseQueryString = (expense: ExpenseType, userId: string) => {
  const expenseId = generateRandomAlphanumeric(6);
  const budgetId = expense.budgetId ? `"${expense.budgetId}"` : null;
  return `("${expenseId}", ${budgetId}, "${expense.item}", ${
    expense.amount
  }, "${
    expense.expenseDate
      ? expense.expenseDate.toISOString().split("T")[0]
      : new Date(Date.now()).toISOString().split("T")[0]
  }", "${expense.paymentMethod}", "${expense.expenseCategory}", "${
    expense.expensePrivacy
  }", "${userId}")`;
};

export const updateExpense = (
  expenseId: string,
  updatedExpense: Partial<ExpenseType>,
  userId: string
): string | null => {
  try {
    const parsed = parseExpenseUpdateObject(updatedExpense);
    if (Object.keys(parsed).length === 0) {
      return null;
    }

    return `UPDATE expensesTable SET ${parsed} WHERE expenseId = "${expenseId}" and creator = '${userId}';`;
  } catch (error) {
    throw error;
  }
};

const parseExpenseUpdateObject = (expense: Partial<ExpenseType>) => {
  const updateFields = [];
  if (
    "budgetId" in expense &&
    typeof expense.budgetId === "string" &&
    expense.budgetId !== null
  ) {
    updateFields.push(
      `budgetId = ${expense.budgetId ? `"${expense.budgetId}"` : "NULL"}`
    );
  }
  if (typeof expense.item === "string") {
    updateFields.push(`item = "${expense.item}"`);
  }
  if (typeof expense.amount === "number" && !isNaN(expense.amount)) {
    updateFields.push(`amount = ${expense.amount}`);
  }
  if (expense.expenseDate instanceof Date) {
    updateFields.push(
      `expenseDate = '${
        new Date(expense.expenseDate).toISOString().split("T")[0]
      }'`
    );
  }
  if (
    typeof expense.paymentMethod === "string" &&
    ["Cash", "Card", "Credit"].includes(expense.paymentMethod)
  ) {
    updateFields.push(`paymentMethod = "${expense.paymentMethod}"`);
  }
  if (
    typeof expense.expenseCategory === "string" &&
    ["Food", "Clothing", "Family", "Academics", "Living", "Travel"].includes(
      expense.expenseCategory
    )
  ) {
    updateFields.push(`expenseCategory = "${expense.expenseCategory}"`);
  }
  if (
    typeof expense.expensePrivacy === "string" &&
    ["private", "public"].includes(expense.expensePrivacy)
  ) {
    updateFields.push(`expensePrivacy = "${expense.expensePrivacy}"`);
  }

  return updateFields.join(", ");
};

export const getAllExpensesQuery = (userId: string): string => {
  try {
    return `SELECT * FROM expensesTable where creator = '${userId}';`;
  } catch (error) {
    throw error;
  }
};

export const getExpenseByIdQuery = (
  expenseId: string,
  userId: string
): string => {
  try {
    return `SELECT * FROM expensesTable WHERE expenseId = "${expenseId}" and creator = '${userId}';`;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteExpenseByIdQuery = (
  expenseIds: string[],
  userId: string
): { delete: string; data: string }=> {
  try {
    const params = constructDeleteParams(expenseIds);
    return {
      delete: `DELETE FROM expensesTable WHERE (${params}) and creator = '${userId}';`,
      data: `SELECT * FROM expensesTable WHERE (${params}) and creator = '${userId}';`,
    };
  } catch (error) {
    throw error;
  }
};

const constructDeleteParams = (expenseIds: string[]): string => {
  return expenseIds
    .map((expenseId) => `expenseId = "${expenseId}"`)
    .join(" or ");
};
