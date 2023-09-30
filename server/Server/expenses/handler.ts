import makeQueries, { makeQueriesWithParams } from "../database";
import {
  deleteExpenseByIdQuery,
  getAllExpensesQuery,
  getExpenseByIdQuery,
  insertExpenseQueryBuilder,
  updateExpense,
} from "../database/QueryBuilders/expensesDatabaseCall";

export const getAllExpensesHandler = async (userId: string) => {
  try {
    const query = getAllExpensesQuery(userId);
    return await makeQueriesWithParams(query.query, query.params);
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
    const data = await makeQueriesWithParams(query.query, query.params);
    return data[0];
  } catch (error) {
    throw error;
  }
};

export const createExpenseHandler = async (expenses: any[], userId: string) => {
  try {
    const { query, failed, params } = insertExpenseQueryBuilder(
      expenses,
      userId
    );

    await makeQueriesWithParams(query, params.flat());
    return {
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

export const updateExpenseHandler = async (
  updates: { [key: string]: any },
  userId: string
) => {
  try {
    const returnedData: UpdateReturnType = {
      failed: [],
      message: "",
      success: "",
    };
    const expenseIds = Object.keys(updates);
    const updateQueries = expenseIds.map((expId) => {
      const query = updateExpense(expId, updates[expId], userId);
      if (!query) {
        returnedData.failed.push(updates[expId]);
      }
      return query;
    });
    updateQueries.forEach((query) => {
        
          if (query) makeQueriesWithParams(query?.query, query?.params).catch((err) => {
            //TODO: handle the foreign key failure error here. 
          });
      
    });
    return returnedData;
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
    const result = await makeQueriesWithParams(queries.data, queries.params).catch(err => {console.error(err);});
    makeQueriesWithParams(queries.delete, queries.params).catch(error => {console.log(error)});
    
    return result;
  } catch (error) {
    /**TODO: send notification on failure */
    throw error;
  }
};
