import { IRouteConfiguration } from 'hapi';
import { MongoListingService } from '../../services/listing/mongoListingService';

export const getListings: IRouteConfiguration = {
  config: {
    auth: false
  },
  handler: (req, res) => {
    let service = new MongoListingService();

    service.getListings().then((listings) => {
      res(listings);
    });
  },
  method: 'GET',
  path: '/listings'
};

export const getListing: IRouteConfiguration = {
  config: {
    auth: false
  },
  handler: (req, res) => {
    let service = new MongoListingService();
    const id = req.params['id'];

    service.getListing(id).then((listing) => {
      res(listing);
    });
  },
  method: 'GET',
  path: '/listings/{id}'
}