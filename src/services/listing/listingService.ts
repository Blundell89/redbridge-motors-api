import * as mongodb from 'mongodb';
import Constants from '../constants';

export class ListingService implements ListingService {
    async getListings(): Promise<Listing[]> {
        return await mongodb.MongoClient.connect(Constants.data.mongoUrl).then(db => {
            let listings = db.collection(Constants.data.listingCollection).find();

            return listings.toArray();
        });
    };
}

export interface ListingService {
    getListings(): Promise<Listing[]>;
}