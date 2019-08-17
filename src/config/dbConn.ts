import mysql from 'mysql';
import dbInfo from '../config/dbInfo';

const environment = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';
const dbEnv = dbInfo(environment);

const pool = mysql.createPool({
  host: dbEnv.host,
  port: dbEnv.port,
  user: dbEnv.user,
  password: dbEnv.password,
  database: dbEnv.database,
});

const query = (sql: string, values: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) {
        reject(error);
      } else {
        connection.query(sql, values, (error, rows) => {
          if (error) {
            reject(error);
          } else {
            resolve(rows);
          }

          connection.release();
        });
      }
    });
  });
};

export default query;
