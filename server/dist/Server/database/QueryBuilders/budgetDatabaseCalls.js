"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBudgetByIdQuery = exports.getAllBudgetsQuery = exports.deleteBudgetByIdsQuery = exports.updateBudget = exports.insertBudgetQueryBuilder = void 0;
const insertBudgetQueryBuilder = (budgetObjects, userId) => {
    try {
        const data = {
            success: [],
            failed: [],
        };
        budgetObjects.forEach((budget) => {
            if (parseBudgetInsertObject(budget)) {
                data.success.push(budget);
            }
            else {
                data.failed.push(budget);
            }
        });
        const parsedString = data.success.map((success) => insertQueryString(success, userId));
        const placeholder = data.success
            .map((success) => "(?, ?, ?, ?, ?, ?, ?)")
            .join(", ");
        const query = `INSERT INTO budgetTable(budget, amount, dateOfPayment, goalId, expenseCategory, budgetPrivacy, creator) value${placeholder};`;
        return {
            query,
            params: parsedString,
            failed: data.failed,
        };
    }
    catch (error) {
        throw error;
    }
};
exports.insertBudgetQueryBuilder = insertBudgetQueryBuilder;
const parseBudgetInsertObject = (budget) => {
    if ("budget" in budget &&
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
        (budget.budgetPrivacy === "public" || budget.budgetPrivacy === "private")) {
        return true;
    }
    return false;
};
const insertQueryString = (budget, userId) => {
    return [
        budget.budget,
        budget.amount,
        budget.dateOfPayment,
        budget.goalId !== "" ? budget.goalId : null,
        budget.expenseCategory,
        budget.budgetPrivacy,
        userId,
    ];
};
const updateBudget = (budgetId, updatedBudget, userId) => {
    try {
        const parsed = parseBudgetUpdateObject(updatedBudget);
        if (Object.keys(parsed).length === 0) {
            return null;
        }
        return {
            query: `UPDATE budgetTable SET ${parsed.placeholder} WHERE budgetId = ? and creator = ?;`,
            params: [...parsed.updateFields, budgetId, userId],
        };
    }
    catch (error) {
        throw error;
    }
};
exports.updateBudget = updateBudget;
const parseBudgetUpdateObject = (budget) => {
    let updateFields = [];
    let placeHolder = [];
    if ("budget" in budget && typeof budget.budget === "string") {
        updateFields.push(budget.budget);
        placeHolder.push("budget = ?");
    }
    if ("amount" in budget && typeof budget.amount === "number") {
        updateFields = [...updateFields, budget.amount];
        placeHolder.push("amount = ?");
    }
    if ("dateOfPayment" in budget && typeof budget.dateOfPayment === "string") {
        const dateOfPayment = new Date(budget.dateOfPayment)
            .toISOString()
            .split("T")[0];
        updateFields = [...updateFields, dateOfPayment];
        placeHolder.push("dateOfPayment = ?");
    }
    if ("goalId" in budget) {
        updateFields = [...updateFields, budget.goalId];
        placeHolder.push("goalId= ?");
    }
    if ("expenseCategory" in budget) {
        updateFields = [...updateFields, budget.expenseCategory];
        placeHolder.push("expenseCategory = ?");
    }
    if ("budgetPrivacy" in budget &&
        (budget.budgetPrivacy === "public" || budget.budgetPrivacy === "private")) {
        updateFields = [...updateFields, budget.budgetPrivacy];
        placeHolder.push("budgetPrivacy = ?");
    }
    if ("paid" in budget && typeof budget.paid === "number") {
        updateFields = [...updateFields, budget.paid];
        placeHolder.push("paid = ?");
    }
    return { updateFields, placeholder: placeHolder.join(", ") };
};
const deleteBudgetByIdsQuery = (budgetId, userId) => {
    try {
        const condition = budgetId.map((id) => `?`).join(", ");
        return {
            delete: `DELETE FROM budgetTable WHERE budgetId in (${condition}) and creator = ?;`,
            data: `SELECT * FROM budgcetTable WHERE budgetId in (${condition}) and creator = ?;`,
            params: [...budgetId, userId]
        };
    }
    catch (error) {
        throw error;
    }
};
exports.deleteBudgetByIdsQuery = deleteBudgetByIdsQuery;
const getAllBudgetsQuery = (userId) => {
    return {
        query: `SELECT * FROM budgetTable where creator = ?;`,
        params: [userId],
    };
};
exports.getAllBudgetsQuery = getAllBudgetsQuery;
const getBudgetByIdQuery = (budgetId, userId) => {
    return {
        query: `SELECT * FROM budgetTable WHERE budgetId = ? and creator = ?;`,
        params: [budgetId, userId],
    };
};
exports.getBudgetByIdQuery = getBudgetByIdQuery;
