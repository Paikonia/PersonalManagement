import { createPool, format } from "mysql2";
import {config} from 'dotenv'
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

const makeQueries = async (query: string):Promise<any[]> => {
  const f = format(query);
  return new Promise((resolve, reject) => {
    pool.query(f, (error: any, results: any, fields: any) => {
      if (error) {
        reject(error);
        return;
      }
      resolve( results );
    });
  });
};

export default makeQueries;
