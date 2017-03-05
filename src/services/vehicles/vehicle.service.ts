import * as mongodb from 'mongodb';
import Constants from '../constants';
import { Vehicle } from "./vehicle.interface";


export class VehicleService {
  public async getVehicles(): Promise<Vehicle[]> {
    let db = await this.getConnection()
    let vehicles = db.collection(Constants.data.vehicleCollection).find();

    return await vehicles.map((v) => this.mapId(v)).toArray();
  };

  public async getVehicle(id: string): Promise<Vehicle> {
    let db = await this.getConnection();
    let collection = db.collection(Constants.data.vehicleCollection);

    var vehicle = await collection.findOne({ _id: new mongodb.ObjectID(id) });

    return this.mapId(vehicle);
  };

  public async createVehicle(vehicle: Vehicle): Promise<string> {
    let db = await this.getConnection();
    let collection = db.collection(Constants.data.vehicleCollection);

    var result = await collection.insertOne(vehicle);

    return result.insertedId.toString();
  }

  private mapId(vehicle: any): Vehicle {
    vehicle.id = vehicle._id;
    delete vehicle._id;

    return vehicle;
  }

  private async getConnection(): Promise<mongodb.Db> {
    return await mongodb.MongoClient.connect(Constants.data.mongoUrl);
  }
}