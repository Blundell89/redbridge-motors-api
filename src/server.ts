import * as Hapi from 'hapi';

const connectionOptions: Hapi.IServerConnectionOptions = {
  port: process.env.port || 3000
};

const server = new Hapi.Server();
server.connection(connectionOptions);

server.route({
  method: 'GET',
  path: '/lol',
  handler: (req, res) => {
    res('Hallo, bro...');
  }
});

server.start((err) => {
  if (err) {
    throw err;
  }

  console.log(`Running server on ${connectionOptions.port}`);
})