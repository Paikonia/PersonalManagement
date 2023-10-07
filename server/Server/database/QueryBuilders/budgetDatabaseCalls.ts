export const insertBudgetQueryBuilder = (
  budgetObjects: any[],
  userId: string
): { query: string; failed: any; params: Array<any> } => {
  try {
    const data: {
      success: BudgetType[];
      failed: any[];
    } = {
      success: [],
      failed: [],
    };

    budgetObjects.forEach((budget) => {
      if (parseBudgetInsertObject(budget)) {
        data.success.push(budget);
      } else {
        data.failed.push(budget);
      }
    });

    const params = data.success.map((success) =>
      insertQueryString(success, userId)
    );

    const placeholder = data.success
      .map(() => "(?, ?, ?, ?, ?, ?, ?)")
      .join(", ");
    const query = `INSERT INTO budgetTable(budget, amount, dateOfPayment, goalId, expenseCategory, budgetPrivacy, creator) value${placeholder};`;
    return {
      query: placeholder.trim() !== "" ? query : "",
      params,
      failed: data.failed,
    };
  } catch (error) {
    throw error;
  }
};

const parseBudgetInsertObject = (budget: any): boolean => {
  console.log(budget);
  if (
    "budget" in budget &&
    typeof budget.budget === "string" &&
    budget.budget.trim() !== "" &&
    "amount" in budget &&
    (typeof budget.amount === "string" || typeof budget.amount === "number") &&
    "dateOfPayment" in budget &&
    typeof budget.dateOfPayment === "string" &&
    String(budget.dateOfPayment).trim() !== "" &&
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
    try {
      Number(budget.amount);
      return true;
    } catch (error) {
      return false;
    }
  }
  return false;
};

const insertQueryString = (budget: any, userId: string) => {
  return [
    budget.budget,
    Number(budget.amount),
    budget.dateOfPayment,
    budget.goalId.trim() !== "" ? budget.goalId : null,
    budget.expenseCategory,
    budget.budgetPrivacy,
    userId,
  ];
};

export const updateBudget = (
  budgetId: string,
  updatedBudget: object,
  userId: string
): { query: string; params: any } | null => {
  try {
    const parsed = parseBudgetUpdateObject(updatedBudget);
    if (Object.keys(parsed).length === 0) {
      return null;
    }
    return {
      query: `UPDATE budgetTable SET ${parsed.placeholder} WHERE budgetId = ? and creator = ?;`,
      params: [...parsed.updateFields, budgetId, userId],
    };
  } catch (error) {
    throw error;
  }
};

const parseBudgetUpdateObject = (budget: object) => {
  let updateFields: Array<any> = [];
  let placeHolder = [];
  if ("budget" in budget && typeof budget.budget === "string") {
    updateFields.push(budget.budget);
    placeHolder.push("budget = ?");
  }
  if (
    "amount" in budget &&
    (typeof budget.amount === "number" || typeof budget.amount === "string")
  ) {
    updateFields.push(Number(budget.amount));
    placeHolder.push("amount = ?");
  }
  if ("dateOfPayment" in budget && typeof budget.dateOfPayment === "string") {
    const dateOfPayment = new Date(budget.dateOfPayment)
      .toISOString()
      .split("T")[0];
    updateFields.push(dateOfPayment);
    placeHolder.push("dateOfPayment = ?");
  }
  if ("goalId" in budget && typeof budget.goalId === 'string') {
    updateFields.push(budget.goalId);
    placeHolder.push("goalId= ?");
  }
  if ("expenseCategory" in budget) {
    updateFields.push(budget.expenseCategory);
    placeHolder.push("expenseCategory = ?");
  }
  if (
    "budgetPrivacy" in budget &&
    (budget.budgetPrivacy === "public" || budget.budgetPrivacy === "private")
  ) {
    updateFields.push(budget.budgetPrivacy);
    placeHolder.push("budgetPrivacy = ?");
  }
  if (
    "paid" in budget &&
    (typeof budget.paid === "number" || typeof budget.paid === "boolean")
  ) {
    updateFields.push(budget.paid);
    placeHolder.push("paid = ?");
  }

  return { updateFields, placeholder: placeHolder.join(", ") };
};

export const deleteBudgetByIdsQuery = (
  budgetId: string[],
  userId: string
): { delete: string; data: string; params: Array<string> } => {
  try {
    const condition = budgetId.map(() => `?`).join(", ");
    return {
      delete: `DELETE FROM budgetTable WHERE budgetId in (${condition}) and creator = ?;`,
      data: `SELECT * FROM budgetTable WHERE budgetId in (${condition}) and creator = ?;`,
      params: [...budgetId, userId],
    };
  } catch (error) {
    throw error;
  }
};

export const getAllBudgetsQuery = (
  userId: string
): { query: string; params: Array<string> } => {
  return {
    query: `SELECT * FROM budgetTable where creator = ?;`,
    params: [userId],
  };
};

export const getBudgetByIdQuery = (
  budgetId: string,
  userId: string
): { query: string; params: Array<any> } => {
  return {
    query: `SELECT * FROM budgetTable WHERE budgetId = ? and creator = ?;`,
    params: [budgetId, userId],
  };
};
