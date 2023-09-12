"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBudgetByIdQuery = exports.getAllBudgetsQuery = exports.deleteBudgetByIdsQuery = exports.updateBudget = exports.insertBudgetQueryBuilder = void 0;
const generators_1 = require("../../utilities/generators");
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
        const parsedString = data.success
            .map((success) => insertQueryString(success, userId))
            .join();
        const query = `INSERT INTO budgetTable(budgetId, budget, amount, dateOfPayment, goalId, expenseCategory, budgetPrivacy, creator) \
    VALUES ${parsedString};`;
        return {
            query,
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
    const id = (0, generators_1.generateRandomAlphanumeric)(5);
    return `("${id}", "${budget.budget}", ${budget.amount}, "${budget.dateOfPayment}", ${budget.goalId !== "" ? `"${budget.goalId}"` : null}, "${budget.expenseCategory}", "${budget.budgetPrivacy}", "${userId}")`;
};
const updateBudget = (budgetId, updatedBudget, userId) => {
    try {
        const parsed = parseBudgetUpdateObject(updatedBudget);
        if (Object.keys(parsed).length === 0) {
            return null;
        }
        return `UPDATE budgetTable SET ${parsed} WHERE budgetId = '${budgetId}' and creator = '${userId}';`;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.updateBudget = updateBudget;
const parseBudgetUpdateObject = (budget) => {
    const updateFields = [];
    if ("budget" in budget && typeof budget.budget === "string") {
        updateFields.push(`budget = "${budget.budget}"`);
    }
    if ("amount" in budget && typeof budget.amount === "number") {
        updateFields.push(`amount = ${budget.amount}`);
    }
    if ("dateOfPayment" in budget && typeof budget.dateOfPayment === "string") {
        updateFields.push(`dateOfPayment = '${(new Date(budget.dateOfPayment)).toISOString().split('T')[0]}'`);
    }
    if ("goalId" in budget) {
        updateFields.push(`goalId = '${budget.goalId}'`);
    }
    if ("expenseCategory" in budget) {
        updateFields.push(`expenseCategory = '${budget.expenseCategory}'`);
    }
    if ("budgetPrivacy" in budget &&
        (budget.budgetPrivacy === "public" || budget.budgetPrivacy === "private")) {
        updateFields.push(`budgetPrivacy = '${budget.budgetPrivacy}'`);
    }
    if ('paid' in budget && typeof budget.paid === 'number') {
        updateFields.push(`paid = ${budget.paid}`);
    }
    return updateFields.join(", ");
};
const deleteBudgetByIdsQuery = (budgetId, userId) => {
    try {
        const condition = budgetId
            .map((id) => `budgetId = "${id}"`)
            .join(" or ");
        return {
            delete: `DELETE FROM budgetTable WHERE (${condition}) and creator = "${userId}";`,
            data: `SELECT * FROM budgetTable WHERE (${condition}) and creator = "${userId}";`,
        };
    }
    catch (error) {
        throw error;
    }
};
exports.deleteBudgetByIdsQuery = deleteBudgetByIdsQuery;
const constructDeleteMultiple = () => { };
const getAllBudgetsQuery = (userId) => {
    try {
        return `SELECT * FROM budgetTable where creator = '${userId}';`;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.getAllBudgetsQuery = getAllBudgetsQuery;
const getBudgetByIdQuery = (budgetId, userId) => {
    try {
        return `SELECT * FROM budgetTable WHERE budgetId = '${budgetId}' and creator = '${userId}';`;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.getBudgetByIdQuery = getBudgetByIdQuery;
