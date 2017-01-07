import * as mongodb from 'mongodb';
import Constants from './constants';


export class ListingService implements ListingService {
    private mongoClient = mongodb.MongoClient;

    getListings(): any {
        this.mongoClient.connect(Constants.data.mongoUrl, (err, db) => {
            db.collection(Constants.data.listingCollection, (err, listings) => {
                var cursor = listings.find();

                return <any[]>cursor.toArray();
            });
        });
    };
}

export interface ListingService {
    getListings(): any;
}