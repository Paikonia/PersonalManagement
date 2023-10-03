import { makeQueriesWithParams } from "../database";
import {
  deleteMonthlyGoalByIdQuery,
  getAllMonthlyGoalsQuery,
  getMonthlyGoalByIdQuery,
  insertMonthlyGoalQueryBuilder,
  updateMonthlyGoal,
} from "../database/QueryBuilders/monthGoalDatabaseCalls";
import { deleteTaskByIdQuery, getAllTasksQuery, getTaskByIdQuery, insertTaskQueryBuilder, updateTask } from "../database/QueryBuilders/tasksDatabaseCalls";
import { deleteWeeklyGoalByIdQuery, getAllWeeklyGoalsQuery, getWeeklyGoalByIdQuery, insertWeeklyGoalQueryBuilder, updateWeeklyGoal } from "../database/QueryBuilders/weeklyGoalDatabaseCalls";

export const postMonthlyGoalItemHanlder = async (
  body: Array<any>,
  userId: string
) => {
  const { query, params, failed } = insertMonthlyGoalQueryBuilder(body, userId);
    
  if(query !== '')await makeQueriesWithParams(query, params);
  return {
    success:
      failed.length > 0 && query !== ""
        ? "Partially successful"
        : query === "" && failed.length > 0
        ? "Failed parse data"
        : "Success",
    failed,
  };
};

export const updateMonthlyGoalsHandler = async (
  updates: { [key: string]: any },
  userId: string
) => {
  try {
    const failed: any[] = [];
    Object.keys(updates)
      .map((mGoalId) => {
        const query = updateMonthlyGoal(mGoalId, updates[mGoalId], userId);
        if (!query) {
          failed.push(updates[mGoalId]);
          return "";
        }
        return query;
      })
      .forEach((query) => {
        if (query && String(query) !== "")
          makeQueriesWithParams(query.query, query.params).catch((e) => {
            //TODO: handle notification incase of failure
          });
      });
    return {
      success: "Partial",
      message:
        "A notification will be send incase any of the update entries fail.",
      failed,
    } as UpdateReturnType;
  } catch (error) {}
};


export const getAllMonthlyGoalsHandler = async (userId:string) => {
  try {
    const {query, params} = getAllMonthlyGoalsQuery(userId) 
    return await makeQueriesWithParams(query, params)   
  } catch (error) {
    throw error
  }
}

export const getMonthlyGoalByIdHandler = async (mGoalId:string, userId: string) => {
  try {
    const { query, params } = getMonthlyGoalByIdQuery(mGoalId, userId);
    return await makeQueriesWithParams(query, params);
  } catch (error) {
    throw error;
  }
};

export const deleteMonthlyGoalsById = async (ids: string[], userId: string) => {
  try {
    const queries = deleteMonthlyGoalByIdQuery(ids, userId);
    const result = await makeQueriesWithParams(
      queries.data,
      queries.params
    )
    makeQueriesWithParams(queries.delete, queries.params).catch((err) =>
      console.log(err)
    );
    return result;
  } catch (error) {
    throw error;
  }
};

export const postWeekGoalItemHanlder = async (
  body: Array<any>,
  userId: string
) => {
  const { query, params, failed } = insertWeeklyGoalQueryBuilder(body, userId);
    
  if(query !== '')await makeQueriesWithParams(query, params);
  return {
    success:
      failed.length > 0 && query !== ""
        ? "Partially successful"
        : query === "" && failed.length > 0
        ? "Failed parse data"
        : "Success",
    failed,
  };
};

export const updateWeeklyGoalsHandler = async (
  updates: { [key: string]: any },
  userId: string
) => {
  try {
    const failed: any[] = [];
    Object.keys(updates)
      .map((mGoalId) => {
        const query = updateWeeklyGoal(mGoalId, updates[mGoalId], userId);
        if (!query) {
          failed.push(updates[mGoalId]);
          return "";
        }
        return query;
      })
      .forEach((query) => {
        if (query && String(query) !== "")
          makeQueriesWithParams(query.query, query.params).catch((e) => {
            //TODO: handle notification incase of failure
          });
      });
    return {
      success: "Partial",
      message:
        "A notification will be send incase any of the update entries fail.",
      failed,
    } as UpdateReturnType;
  } catch (error) {}
};


export const getAllWeeklyGoalsHandler = async (userId:string) => {
  try {
    const {query, params} = getAllWeeklyGoalsQuery(userId) 
    return await makeQueriesWithParams(query, params)   
  } catch (error) {
    throw error
  }
}

export const getWeeklyGoalByIdHandler = async (mGoalId:string, userId: string) => {
  try {
    const { query, params } = getWeeklyGoalByIdQuery(mGoalId, userId);
    return await makeQueriesWithParams(query, params);
  } catch (error) {
    throw error;
  }
};

export const deleteWeeklyGoalsById = async (ids: string[], userId: string) => {
  try {
    const queries = deleteWeeklyGoalByIdQuery(ids, userId);
    const result = await makeQueriesWithParams(
      queries.data,
      queries.params
    )
    makeQueriesWithParams(queries.delete, queries.params).catch((err) =>
      console.log(err)
    );
    return result;
  } catch (error) {
    throw error;
  }
};
export const postTaskItemHanlder = async (
  body: Array<any>,
  userId: string
) => {
  const { query, params, failed } = insertTaskQueryBuilder(body, userId);
  console.log({ query, params, failed });
  if(query !== '')await makeQueriesWithParams(query, params);
  return {
    success:
      failed.length > 0 && query !== ""
        ? "Partially successful"
        : query === "" && failed.length > 0
        ? "Failed parse data"
        : "Success",
    failed,
  };
};

export const updateTasksHandler = async (
  updates: { [key: string]: any },
  userId: string
) => {
  try {
    const failed: any[] = [];
    Object.keys(updates)
      .map((mGoalId) => {
        const query = updateTask(mGoalId, updates[mGoalId], userId);
        if (!query) {
          failed.push(updates[mGoalId]);
          return "";
        }
        return query;
      })
      .forEach((query) => {
        if (query && String(query) !== "")
          makeQueriesWithParams(query.query, query.params).catch((e) => {
            //TODO: handle notification incase of failure
          });
      });
    return {
      success: "Partial",
      message:
        "A notification will be send incase any of the update entries fail.",
      failed,
    } as UpdateReturnType;
  } catch (error) {}
};


export const getAllTasksHandler = async (userId:string) => {
  try {
    const {query, params} = getAllTasksQuery(userId) 
    return await makeQueriesWithParams(query, params)   
  } catch (error) {
    throw error
  }
}

export const getTaskByIdHandler = async (mGoalId:string, userId: string) => {
  try {
    const { query, params } = getTaskByIdQuery(mGoalId, userId);
    return (await makeQueriesWithParams(query, params))[0];
  } catch (error) {
    throw error;
  }
};

export const deleteTasksById = async (ids: string[], userId: string) => {
  try {
    const queries = deleteTaskByIdQuery(ids, userId);
    const result = await makeQueriesWithParams(
      queries.data,
      queries.params
    )
    makeQueriesWithParams(queries.delete, queries.params).catch((err) =>
      console.log(err)
    );
    return result;
  } catch (error) {
    throw error;
  }
};