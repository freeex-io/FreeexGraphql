interface IDbInfo {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

type IDbList = 'prod' | 'dev';

const dbInfo = (type: IDbList) => {
  let info: IDbInfo = {
    host: '',
    port: 0,
    user: '',
    password: '',
    database: '',
  };

  if (type === 'prod') {
    info = {
      host: '',
      port: 3306,
      user: '',
      password: '',
      database: '',
    };
  } else if (type === 'dev') {
    info = {
      host: '',
      port: 3306,
      user: '',
      password: '',
      database: '',
    };
  }

  return info;
};

export default dbInfo;
