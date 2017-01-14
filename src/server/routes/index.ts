import {tokenRoute} from './oauth/token';
import * as Listings from './listing';

export default [
  tokenRoute,
  Listings.getListing,
  Listings.getListings
];