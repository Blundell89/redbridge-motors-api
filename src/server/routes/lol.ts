import {IRouteConfiguration} from 'hapi';

export const lolRoute: IRouteConfiguration = {
  config: {
    auth: false
  },
  handler: (req, res) => {
    res('Lol!');
  },
  method: 'GET',
  path: '/lol'
};