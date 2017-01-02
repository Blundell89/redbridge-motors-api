import { Server } from 'hapi';
import * as credentialRetriever from './credentialRetriever';

let validate = (decoded, request, callback: Function) => {
  callback(null, true);
}

export function applyJwtAuthStrategy(server: Server) {
  server.auth.strategy('jwt', 'jwt', {
    key: credentialRetriever.getSecretKey(),
    validateFunc: validate,
    verifyOptions: {
      algorithms: ['HS256']
    }
  })
};

export function setDefaultStrategy(server: Server) {
  server.auth.default('jwt');
}