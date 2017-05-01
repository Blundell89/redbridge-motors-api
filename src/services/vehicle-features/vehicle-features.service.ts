import * as mongodb from 'mongodb';

import Constants from '../constants';
import { MongoIdMapperService } from '../mongo-id-mapper.service';
import { VehicleFeature } from './vehicle-feature.interface';

export class VehicleFeatureService {
  constructor(private mongoIdMapperService: MongoIdMapperService) { }

  public async create(feature: VehicleFeature): Promise<string> {
    const db = await this.getConnection();
    const collection = db.collection(Constants.data.vehicleFeatureCollection);

    const existing = await collection.findOne({ name: feature.name } as VehicleFeature);

    if (existing) {
      throw new Error('Cannot insert duplicate feature.');
    }

    const inserted = await collection.insertOne(feature);

    return inserted.insertedId.toString();
  }

  public async get(): Promise<VehicleFeature[]> {
    const db = await this.getConnection();
    const collection = db.collection(Constants.data.vehicleFeatureCollection);

    return await collection.find().map((feature) => this.mongoIdMapperService.map(feature) as VehicleFeature).toArray();
  }

  public async getById(id: string): Promise<VehicleFeature> {
    const db = await this.getConnection();
    const collection = db.collection(Constants.data.vehicleFeatureCollection);

    return this.mongoIdMapperService.map(await collection.findOne({ _id: new mongodb.ObjectID(id) })) as VehicleFeature;
  }

  private async getConnection(): Promise<mongodb.Db> {
    return await mongodb.MongoClient.connect(Constants.data.mongoUrl);
  }
}
