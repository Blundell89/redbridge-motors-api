import {IRouteConfiguration} from 'hapi';

export const getListings: IRouteConfiguration = {
  config: {
    auth: false
  },
  handler: (req, res) => {
    res('Lol!');
  },
  method: 'GET',
  path: '/listings'
};