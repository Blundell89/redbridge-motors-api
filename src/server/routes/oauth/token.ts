import { IRouteConfiguration } from 'Hapi';
import * as JWT from 'jsonwebtoken';
import * as credentialRetriever from '../../credentialRetriever';

const application = {
  clientId: 'redbridge-motors',
  clientSecret: process.env.redbridgeClientSecret || 'secret'
};

export const tokenRoute: IRouteConfiguration = {
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

      let token = JWT.sign(payload, credentialRetriever.getSecretKey(), { expiresIn: '1d' });

      res({ access_token: token, token_type: 'bearer' });
    } else {
      res('Oops');
    }
  }
}