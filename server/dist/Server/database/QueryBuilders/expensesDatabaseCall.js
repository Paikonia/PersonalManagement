"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExpenseByIdQuery = exports.getExpenseByIdQuery = exports.getAllExpensesQuery = exports.updateExpense = exports.insertExpenseQueryBuilder = void 0;
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
        const params = data.success.map((success) => insertExpenseQueryString(success, userId));
        const placeHolder = data.success.map(() => "(?,?,?,?,?,?,?,?)").join(", ");
        const query = `INSERT INTO expensesTable(budgetId, item, amount, expenseDate, paymentMethod, expenseCategory, expensePrivacy, creator) \
    VALUES ${placeHolder};`;
        return {
            query: params.length > 0 ? query : "",
            failed: data.failed,
            params,
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
    const expenseDate = expense.expenseDate
        ? expense.expenseDate.toISOString().split("T")[0]
        : new Date(Date.now()).toISOString().split("T")[0];
    const budgetId = expense.budgetId ? `"${expense.budgetId}"` : null;
    return [
        budgetId,
        expense.item,
        expense.amount,
        expenseDate,
        expense.paymentMethod,
        expense.expenseCategory,
        expense.expensePrivacy,
        userId,
    ];
};
const updateExpense = (expenseId, updatedExpense, userId) => {
    try {
        const parsed = parseExpenseUpdateObject(updatedExpense);
        if (Object.keys(parsed).length === 0) {
            return null;
        }
        return {
            query: `UPDATE expensesTable SET ${parsed.placeholder} WHERE expenseId = ? and creator = ?;`,
            params: [...parsed.updateFields, expenseId, userId],
        };
    }
    catch (error) {
        throw error;
    }
};
exports.updateExpense = updateExpense;
const parseExpenseUpdateObject = (expense) => {
    let updateFields = [];
    let placeholder = [];
    if ("budgetId" in expense &&
        typeof expense.budgetId === "string" &&
        expense.budgetId !== null) {
        placeholder.push("budgetId = ?");
        updateFields.push(expense.budgetId);
    }
    if (typeof expense.item === "string") {
        placeholder.push("item = ?");
        updateFields.push(expense.item);
    }
    if (expense.amount !== null && (typeof expense.amount === "number" || typeof expense.amount === 'string')) {
        placeholder.push("amount = ?");
        updateFields.push(expense.amount);
    }
    if (typeof expense.expenseDate === 'string') {
        const expenseDate = new Date(expense.expenseDate)
            .toISOString()
            .split("T")[0];
        placeholder.push("expenseDate = ?");
        updateFields.push(expenseDate);
    }
    if (typeof expense.paymentMethod === "string" &&
        ["Cash", "Card", "Credit"].includes(expense.paymentMethod)) {
        placeholder.push("paymentMethod = ?");
        updateFields.push(expense.paymentMethod);
    }
    if (typeof expense.expenseCategory === "string" &&
        ["Food", "Clothing", "Family", "Academics", "Living", "Travel"].includes(expense.expenseCategory)) {
        placeholder.push("expenseCategory = ?");
        updateFields.push(expense.expenseCategory);
    }
    if (typeof expense.expensePrivacy === "string" &&
        ["private", "public"].includes(expense.expensePrivacy)) {
        placeholder.push("expensePrivacy = ?");
        updateFields.push(expense.expensePrivacy);
    }
    return { placeholder: placeholder.join(", "), updateFields };
};
const getAllExpensesQuery = (userId) => {
    try {
        return {
            query: `SELECT * FROM expensesTable where creator = ?;`,
            params: [userId],
        };
    }
    catch (error) {
        throw error;
    }
};
exports.getAllExpensesQuery = getAllExpensesQuery;
const getExpenseByIdQuery = (expenseId, userId) => {
    try {
        return {
            query: "SELECT * FROM expensesTable WHERE expenseId = ? and creator = ?;",
            params: [expenseId, userId],
        };
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.getExpenseByIdQuery = getExpenseByIdQuery;
const deleteExpenseByIdQuery = (expenseIds, userId) => {
    try {
        const condition = expenseIds.map((id) => `?`).join(", ");
        return {
            delete: `DELETE FROM expensesTable WHERE expenseId in (${condition}) and creator = ?;`,
            data: `SELECT * FROM expensesTable WHERE expenseId in (${condition}) and creator = ?;`,
            params: [...expenseIds, userId],
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
