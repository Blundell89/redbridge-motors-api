import * as Hapi from 'hapi';
import Routes from './routes/index';
import Plugins from './plugins/index';
import * as JwtStrategy from './jwtStrategy';
import Constants from './constants';

const connectionOptions: Hapi.IServerConnectionOptions = {
  port: process.env.port || Constants.serverPort
};

const server = new Hapi.Server();
server.connection(connectionOptions);

server.register(Plugins, function (err) {
  if (err) {
    console.log(err);
  }

  JwtStrategy.applyJwtAuthStrategy(server);
  JwtStrategy.setDefaultStrategy(server);

  server.route(Routes);

  server.start((err) => {
    if (err) {
      throw err;
    }

    console.log(`Running server on ${connectionOptions.port}`);
  })
});