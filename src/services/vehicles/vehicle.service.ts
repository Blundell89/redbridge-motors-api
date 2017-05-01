import * as mongodb from 'mongodb';

import Constants from '../../constants';
import { MongoIdMapperService } from '../mongo-id-mapper.service';
import { Vehicle } from './vehicle.interface';

export class VehicleService {
  constructor(private mongoIdMapperService: MongoIdMapperService) { }

  public async getVehicles(): Promise<Vehicle[]> {
    const db = await this.getConnection();
    const vehicles = db.collection(Constants.data.vehicleCollection).find();

    return await vehicles.map((v) => this.mongoIdMapperService.map(v)).toArray();
  }

  public async getVehicle(id: string): Promise<Vehicle> {
    const db = await this.getConnection();
    const collection = db.collection(Constants.data.vehicleCollection);

    const vehicle = await collection.findOne({ _id: new mongodb.ObjectID(id) });

    return this.mongoIdMapperService.map(vehicle);
  }

  public async createVehicle(vehicle: Vehicle): Promise<string> {
    const db = await this.getConnection();
    const collection = db.collection(Constants.data.vehicleCollection);

    const result = await collection.insertOne(vehicle);

    return result.insertedId.toString();
  }

  private async getConnection(): Promise<mongodb.Db> {
    return await mongodb.MongoClient.connect(Constants.data.mongoUrl);
  }
}
