import { createPool, format } from "mysql2";
import {config} from 'dotenv'
import constructSQLError from "./MySqlErrors";
config()

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


const makeQueries = async (query: string): Promise<any[]> => {
  const f = format(query);
  return new Promise((resolve, reject) => {
    pool.query(f, (error: any, results: any, fields: any) => {
      if (error) {
        console.error(error);
        reject(constructSQLError(error));
        return;
      }
      resolve(results);
    });
  });
};

export const makeQueriesWithParams = async (query: string, params: Array<any>): Promise<any[]> => {
  const f = format(query);
  return new Promise((resolve, reject) => {
    pool.query(f, params, (error: any, results: any, fields: any) => {
      if (error) {
        reject(constructSQLError(error));
        return;
      }
      
      resolve(results);
    });
  });
};

export default makeQueries;
