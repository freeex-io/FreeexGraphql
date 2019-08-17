import query from '../utils/query';

export const findUserById = async (idx: number): Promise<any> => {
  const sql: string = `SELECT * FROM users WHERE idx = ${idx}`;
  const result = await query(sql);
  return result;
};

export const findUsers = async (): Promise<any> => {
  const sql: string = 'SELECT * FROM users ORDER BY idx ASC';
  const result = await query(sql);
  return result;
};

export const findUserByEmail = async (email: string): Promise<any> => {
  const sql: string = `SELECT * FROM users WHERE email = "${email}"`;
  const result = await query(sql);
  return result;
};

export const insertUser = async (value: any): Promise<void> => {
  const sql: string = 'INSERT INTO users SET ?';
  await query(sql, value);
};

export const updateUserPhone = async (value: any): Promise<void> => {
  const sql: string = 'UPDATE users SET country_code = ?, phone = ? WHERE idx = ?';
  await query(sql, value);
};

export const updatePincode = async (value: any): Promise<void> => {
  const sql: string = 'UPDATE users SET pin_code = ? WHERE idx = ?';
  await query(sql, value);
};
