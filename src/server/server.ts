import * as Hapi from 'hapi';

import Constants from '../constants';
import * as JwtStrategy from './jwtStrategy';
import Plugins from './plugins/index';
import Routes from './routes/index';

const connectionOptions: Hapi.ServerConnectionOptions = {
  port: Constants.app.port,
};

const server = new Hapi.Server();
server.connection(connectionOptions);

server.register(Plugins, (err) => {
  if (err) {
    console.error(err);
  }

  JwtStrategy.applyJwtAuthStrategy(server);
  JwtStrategy.setDefaultStrategy(server);

  server.route(Routes);

  server.start((startError) => {
    if (startError) {
      throw startError;
    }

    // tslint:disable-next-line:no-console
    console.log(`Running server on ${connectionOptions.port}`);
  });
});
