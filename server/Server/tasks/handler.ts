import { insertQueryBuilder } from "./database/monthSqlBuider"

export const postMonthlyGoalItemHanlder = (body: MonthlyGoalsType[]) => {
    const query = insertQueryBuilder(body)
    
    return query
}