import * as mongodb from 'mongodb';
import Constants from '../constants';
import { Vehicle } from "./vehicle.interface";
import { MongoIdMapperService } from '../mongo-id-mapper.service';


export class VehicleService {
  constructor(private mongoIdMapperService: MongoIdMapperService) { }

  public async getVehicles(): Promise<Vehicle[]> {
    let db = await this.getConnection()
    let vehicles = db.collection(Constants.data.vehicleCollection).find();

    return await vehicles.map((v) => this.mongoIdMapperService.map(v)).toArray();
  };

  public async getVehicle(id: string): Promise<Vehicle> {
    let db = await this.getConnection();
    let collection = db.collection(Constants.data.vehicleCollection);

    var vehicle = await collection.findOne({ _id: new mongodb.ObjectID(id) });

    return this.mongoIdMapperService.map(vehicle);
  };

  public async createVehicle(vehicle: Vehicle): Promise<string> {
    let db = await this.getConnection();
    let collection = db.collection(Constants.data.vehicleCollection);

    var result = await collection.insertOne(vehicle);

    return result.insertedId.toString();
  }

  private async getConnection(): Promise<mongodb.Db> {
    return await mongodb.MongoClient.connect(Constants.data.mongoUrl);
  }
}