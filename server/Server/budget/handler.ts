import makeQueries from "../database";
import {
  deleteBudgetByIdsQuery,
  getAllBudgetsQuery,
  getBudgetByIdQuery,
  insertBudgetQueryBuilder,
  updateBudget,
} from "../database/QueryBuilders/budgetDatabaseCalls";

export const getAllBudgetHandler = async (
  userId: string
): Promise<BudgetType[]> => {
  try {
    const query = getAllBudgetsQuery(userId);
    const data = await makeQueries(query);
    return data as BudgetType[];
  } catch (error) {
    throw error;
  }
};

export const getBudgetByIdHandler = async (
  budgetId: string,
  userId: string
): Promise<BudgetType> => {
  try {
    const query = getBudgetByIdQuery(budgetId, userId);
    const data = await makeQueries(query);
    const returned = data as BudgetType[];
    return returned[0];
  } catch (error) {
    throw error;
  }
};

export const postBudgetItemsHandler = async (
  data: any[],
  userId: string
): Promise<{ success: string; failed: any }> => {
  try {
    const { query, failed } = insertBudgetQueryBuilder(data, userId);

    await makeQueries(query);
    return {
      success:
        failed.length > 0 && query !== ""
          ? "Partially successful"
          : query === "" && query.length > 0
          ? "Failed parse data"
          : "Success",
      failed,
    };
  } catch (error) {
    throw error;
  }
};

export const deleteBudgetById = async (ids: string[], userId: string) => {
  try {
    const queries = deleteBudgetByIdsQuery(ids, userId);

    const result = await makeQueries(queries.data);
    makeQueries(queries.delete);
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateBudgetHandler = async (
  update: { [key: string]: any },
  userId: string
):Promise<UpdateReturnType> => {
  try {
    const failed:any[] = [];
    const keys = Object.keys(update);
    const queries = keys.map((key: string) => {
      const query = updateBudget(key, update[key], userId);

      if (!query) {
        failed.push(update[key]);
        return "";
      }
      return query;
    });

    queries.forEach((query) => {
      makeQueries(query as string);
    });

    return {
      success: "Partial",
      message:
        "A notification will be send incase any of the update entries fail.",
      failed
    } as UpdateReturnType;
  } catch (error) {}
  return {
    success: 'Failed',
    failed: [],
    message: 'This will never be called.'
  }
};
