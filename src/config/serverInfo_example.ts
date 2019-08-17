interface IServerInfo {
  host: string;
  port: number;
  key: string;
  cert: string;
}

type IServerList = 'prod' | 'dev';

const serverInfo = (type: IServerList) => {
  let info: IServerInfo = {
    host: '',
    port: 0,
    key: '',
    cert: '',
  };

  if (type === 'prod') {
    info = {
      host: '', // Apollo Server Endpoint
      port: 443,
      key: '',
      cert: '',
    };
  } else if (type === 'dev') {
    info = {
      host: '', // Apollo Server Endpoint
      port: 4466,
      key: '',
      cert: '',
    };
  }

  return info;
};

export default serverInfo;
