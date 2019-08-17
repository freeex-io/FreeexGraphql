import mysql from 'mysql';
import dbInfo from '../config/dbInfo';

const environment = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';
const dbEnv = dbInfo(environment);
const { host, port, user, password, database } = dbEnv;

const pool = mysql.createPool({
  host,
  port,
  user,
  password,
  database,
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
