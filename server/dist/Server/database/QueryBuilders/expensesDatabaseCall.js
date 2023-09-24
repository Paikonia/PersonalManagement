"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExpenseByIdQuery = exports.getExpenseByIdQuery = exports.getAllExpensesQuery = exports.updateExpense = exports.insertExpenseQueryBuilder = void 0;
const generators_1 = require("../../utilities/generators");
const insertExpenseQueryBuilder = (expenseObjects, userId) => {
    try {
        const data = {
            success: [],
            failed: [],
        };
        expenseObjects.forEach((expense) => {
            if (parseExpenseInsertObject(expense)) {
                data.success.push(expense);
            }
            else {
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
    }
    catch (error) {
        throw error;
    }
};
exports.insertExpenseQueryBuilder = insertExpenseQueryBuilder;
const parseExpenseInsertObject = (expense) => {
    expense.amount = Number(expense.amount);
    if (typeof expense.item !== "string" ||
        expense.item.trim() === "" ||
        typeof expense.amount !== "number" ||
        isNaN(expense.amount) ||
        !["Cash", "Card", "Credit"].includes(expense.paymentMethod) ||
        !["Food", "Clothing", "Family", "Academics", "Living", "Travel"].includes(expense.expenseCategory) ||
        !["private", "public"].includes(expense.expensePrivacy)) {
        return false;
    }
    return true;
};
const insertExpenseQueryString = (expense, userId) => {
    const expenseId = (0, generators_1.generateRandomAlphanumeric)(6);
    const budgetId = expense.budgetId ? `"${expense.budgetId}"` : null;
    return `("${expenseId}", ${budgetId}, "${expense.item}", ${expense.amount}, "${expense.expenseDate
        ? expense.expenseDate.toISOString().split("T")[0]
        : new Date(Date.now()).toISOString().split("T")[0]}", "${expense.paymentMethod}", "${expense.expenseCategory}", "${expense.expensePrivacy}", "${userId}")`;
};
const updateExpense = (expenseId, updatedExpense, userId) => {
    try {
        const parsed = parseExpenseUpdateObject(updatedExpense);
        if (Object.keys(parsed).length === 0) {
            return null;
        }
        return `UPDATE expensesTable SET ${parsed} WHERE expenseId = "${expenseId}" and creator = '${userId}';`;
    }
    catch (error) {
        throw error;
    }
};
exports.updateExpense = updateExpense;
const parseExpenseUpdateObject = (expense) => {
    const updateFields = [];
    if ("budgetId" in expense &&
        typeof expense.budgetId === "string" &&
        expense.budgetId !== null) {
        updateFields.push(`budgetId = ${expense.budgetId ? `"${expense.budgetId}"` : "NULL"}`);
    }
    if (typeof expense.item === "string") {
        updateFields.push(`item = "${expense.item}"`);
    }
    if (typeof expense.amount === "number" && !isNaN(expense.amount)) {
        updateFields.push(`amount = ${expense.amount}`);
    }
    if (expense.expenseDate instanceof Date) {
        updateFields.push(`expenseDate = '${new Date(expense.expenseDate).toISOString().split("T")[0]}'`);
    }
    if (typeof expense.paymentMethod === "string" &&
        ["Cash", "Card", "Credit"].includes(expense.paymentMethod)) {
        updateFields.push(`paymentMethod = "${expense.paymentMethod}"`);
    }
    if (typeof expense.expenseCategory === "string" &&
        ["Food", "Clothing", "Family", "Academics", "Living", "Travel"].includes(expense.expenseCategory)) {
        updateFields.push(`expenseCategory = "${expense.expenseCategory}"`);
    }
    if (typeof expense.expensePrivacy === "string" &&
        ["private", "public"].includes(expense.expensePrivacy)) {
        updateFields.push(`expensePrivacy = "${expense.expensePrivacy}"`);
    }
    return updateFields.join(", ");
};
const getAllExpensesQuery = (userId) => {
    try {
        return `SELECT * FROM expensesTable where creator = '${userId}';`;
    }
    catch (error) {
        throw error;
    }
};
exports.getAllExpensesQuery = getAllExpensesQuery;
const getExpenseByIdQuery = (expenseId, userId) => {
    try {
        return `SELECT * FROM expensesTable WHERE expenseId = "${expenseId}" and creator = '${userId}';`;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.getExpenseByIdQuery = getExpenseByIdQuery;
const deleteExpenseByIdQuery = (expenseIds, userId) => {
    try {
        const params = constructDeleteParams(expenseIds);
        return {
            delete: `DELETE FROM expensesTable WHERE (${params}) and creator = '${userId}';`,
            data: `SELECT * FROM expensesTable WHERE (${params}) and creator = '${userId}';`,
        };
    }
    catch (error) {
        throw error;
    }
};
exports.deleteExpenseByIdQuery = deleteExpenseByIdQuery;
const constructDeleteParams = (expenseIds) => {
    return expenseIds
        .map((expenseId) => `expenseId = "${expenseId}"`)
        .join(" or ");
};
