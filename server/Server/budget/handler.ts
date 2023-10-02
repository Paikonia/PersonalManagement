import { makeQueriesWithParams } from "../database";
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
    const { query, params } = getAllBudgetsQuery(userId);
    const data = await makeQueriesWithParams(query, params);
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
    const { query, params } = getBudgetByIdQuery(budgetId, userId);
    const data = await makeQueriesWithParams(query, params);
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
    const { query, failed, params } = insertBudgetQueryBuilder(data, userId);

    if (query !== "") await makeQueriesWithParams(query, params.flat());
    return {
      success:
        failed.length > 0 && query !== ""
          ? "Partially successful"
          : query === "" && failed.length > 0
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
    const result = await makeQueriesWithParams(
      queries.data,
      queries.params
    ).catch((err) => {
      console.log(err);
    });
    makeQueriesWithParams(queries.delete, queries.params).catch((err) =>
      console.log(err)
    );
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateBudgetHandler = async (
  update: { [key: string]: any },
  userId: string
): Promise<UpdateReturnType> => {
  try {
    const failed: any[] = [];
    Object.keys(update)
      .map((key: string) => {
        const query = updateBudget(key, update[key], userId);

        if (!query) {
          failed.push(update[key]);
          return "";
        }
        return query;
      })
      .forEach((query: any) => {
        if (query && query !== "")
          makeQueriesWithParams(query.query, query.params).catch((error) => {
            //TODO: Implement notification error for this.
            console.log(error);
          });
      });

    return {
      success: "Partial",
      message:
        "A notification will be send incase any of the update entries fail.",
      failed,
    } as UpdateReturnType;
  } catch (error) {}
  return {
    success: "Failed",
    failed: [],
    message: "This will never be called.",
  };
};
