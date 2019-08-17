import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import http from 'http';
import https from 'https';
import fs from 'fs';
import schemas from '../graphql/schemas';
import resolvers from '../graphql/resolvers';
import serverInfo from '../config/serverInfo';

const serverConn = (): void => {
  const environment = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';
  const serverEnv = serverInfo(environment);

  const apollo = new ApolloServer({
    resolvers,
    typeDefs: schemas,
  });

  const app = express();
  app.use(cors());

  apollo.applyMiddleware({ app });

  let server: http.Server | https.Server = http.createServer(app);
  if (environment === 'prod') {
    server = https.createServer(
      {
        key: fs.readFileSync(serverEnv.key),
        cert: fs.readFileSync(serverEnv.cert),
      },
      app,
    );
  }

  apollo.installSubscriptionHandlers(server);

  const serverConfig = {
    url: serverEnv.host,
    port: serverEnv.port,
  };

  const protocol = environment === 'dev' ? 'http' : 'https';

  server.listen(serverConfig, () => {
    console.log(
      '🚀 Server ready at',
      `${protocol}://${serverEnv.host}:${serverEnv.port}${apollo.graphqlPath}`,
    );
  });
};

export default serverConn;
