import * as mongodb from 'mongodb';
import Constants from '../constants';
import { VehicleFeature } from "./vehicle-feature.interface";
import { MongoIdMapperService } from "../mongo-id-mapper.service";


export class VehicleFeatureService {
  constructor(private mongoIdMapperService: MongoIdMapperService) {}

  public async create(feature: VehicleFeature): Promise<string> {
    let db = await this.getConnection();
    let collection = db.collection(Constants.data.vehicleFeatureCollection);

    const existing = await collection.findOne(<VehicleFeature>{name: feature.name});

    if (existing)
      throw 'Cannot insert duplicate feature.';

    let inserted = await collection.insertOne(feature);

    return inserted.insertedId.toString();
  }

  private async getConnection(): Promise<mongodb.Db> {
    return await mongodb.MongoClient.connect(Constants.data.mongoUrl);
  }

  public async get(): Promise<VehicleFeature[]> {
    let db = await this.getConnection();
    let collection = db.collection(Constants.data.vehicleFeatureCollection);

    return await collection.find().map(feature => <VehicleFeature>this.mongoIdMapperService.map(feature)).toArray();
  }

  public async getById(id: string): Promise<VehicleFeature> {
    let db = await this.getConnection();
    let collection = db.collection(Constants.data.vehicleFeatureCollection);

    return <VehicleFeature>this.mongoIdMapperService.map(await collection.findOne({_id: new mongodb.ObjectID(id)}));
  }
}