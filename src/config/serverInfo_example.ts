interface IServerInfo {
  host: string;
  port: number;
}

type IServerList = 'prod' | 'dev';

const serverInfo = (type: IServerList) => {
  let info: IServerInfo = {
    host: '',
    port: 0,
  };

  if (type === 'prod') {
    info = {
      host: '', // Apollo Server Endpoint
      port: 443,
    };
  } else if (type === 'dev') {
    info = {
      host: '', // Apollo Server Endpoint
      port: 4466,
    };
  }

  return info;
};

export default serverInfo;
