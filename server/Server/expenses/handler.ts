import makeQueries from "../database";
import {
  deleteExpenseByIdQuery,
  getAllExpensesQuery,
  getExpenseByIdQuery,
  insertExpenseQueryBuilder,
  updateExpense
} from "../database/QueryBuilders/expensesDatabaseCall";

export const getAllExpensesHandler = async (userId: string) => {
  try {
    const query = getAllExpensesQuery(userId);
    return await makeQueries(query);
  } catch (error) {
    throw error;
  }
};
export const getExpenseByIdHandler = async (
  expenseId: string,
  userId: string
) => {
  try {
    const query = getExpenseByIdQuery(expenseId, userId);
    const data = await makeQueries(query);
    return data[0];
  } catch (error) {
    throw error;
  }
};

export const createExpenseHandler = async (expenses: any[], userId: string) => {
  try {
    const { query, failed } = insertExpenseQueryBuilder(expenses, userId);
    await makeQueries(query);
    return {
      query,
      failed: failed,
      success:
        failed.length > 0 && query !== ""
          ? "Partial"
          : query === ""
          ? "Failed"
          : "Success",
    };
  } catch (error) {
    throw error;
  }
};

export const updateExpenseHandler = async (updates:{[key:string]: any}, userId:string) => {
  try {
    const returnedData: UpdateReturnType = {
      failed: [],
      message: "",
      success: "",
    };
    const expenseIds = Object.keys(updates)
    const updateQueries = expenseIds.map(expId =>{
        const query = updateExpense(expId, updates[expId], userId);
        if(!query){
            returnedData.failed.push(updates[expId]);
        }
        return query
    })
    const madeQueries = updateQueries.filter(query=> query!== null)
    madeQueries.forEach(query=>{
        makeQueries(query|| '')
    })
    return returnedData
  } catch (error) {
    throw error;
  }
};

export const deleteExpenseHandler = async (
  expenseIds: string[],
  userId: string
) => {
  try {
    const queries = deleteExpenseByIdQuery(expenseIds, userId);
    const result = await makeQueries(queries.data)
    makeQueries(queries.delete);
    return result
  } catch (error) {
    /**TODO: send notification on failure */
    throw error;
  }
};
