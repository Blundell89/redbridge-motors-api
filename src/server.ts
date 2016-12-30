import * as Hapi from 'hapi';
import * as HapiAuthJwt from 'hapi-auth-jwt2';
import * as JWT from 'jsonwebtoken';

const application = {
  clientId: 'redbridge-motors',
  clientSecret: process.env.redbridgeClientSecret || 'secret'
};

const privateKey = process.env.privateKey || 'private';

const validate = (decoded, request, callback: Function) => {
  callback(null, true);
}

const connectionOptions: Hapi.IServerConnectionOptions = {
  port: process.env.port || 3000
};

const server = new Hapi.Server();
server.connection(connectionOptions);

server.register(HapiAuthJwt, function (err) {
  if (err) {
    console.log(err);
  }

  server.auth.strategy('jwt', 'jwt', {
    key: privateKey,
    validateFunc: validate,
    verifyOptions: {
      algorithms: ['HS256']
    }
  });

  server.auth.default('jwt');

  server.route({
    config: {
      auth: false
    },
    method: 'POST',
    path: '/token',
    handler: (req, res) => {
      if (req.query.client_id === application.clientId &&
        req.query.client_secret === application.clientSecret) {
        var payload = {
          data: {
            admin: true, 
            sub: application.clientId
          }
        };

        let token = JWT.sign(payload, privateKey, {expiresIn: '1m'});

        res({ access_token: token, token_type: 'bearer' });
      } else {
        res('Oops');
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/lol',
    handler: (req, res) => {
      res('lol');
    }
  });

  server.start((err) => {
    if (err) {
      throw err;
    }

    console.log(`Running server on ${connectionOptions.port}`);
  })
});