import * as mongodb from 'mongodb';
import Constants from '../constants';


export class MongoListingService implements ListingService {
    async getListings(): Promise<Listing[]> {
        return await this.getConnection().then(db => {
            let listings = db.collection(Constants.data.listingCollection).find();

            return listings.toArray();
        });
    };

    async getListing(id: string): Promise<Listing> {
        return await this.getConnection().then(db => {
            const collection = db.collection(Constants.data.listingCollection);

            let listing = <Promise<Listing>>collection.findOne({ _id: new mongodb.ObjectID(id) });

            return listing;
        });
    };

    private async getConnection(): Promise<mongodb.Db> {
        return await mongodb.MongoClient.connect(Constants.data.mongoUrl);
    }
}