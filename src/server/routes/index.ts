import { VehiclesRoute } from './vehicles.route';
import { VehicleService } from "../../services/vehicles/vehicle.service";
import { ImagesRoute } from "./images.route";
import { ImageService } from "../../services/images/image.service";
import { MongoIdMapperService } from "../../services/mongo-id-mapper.service";
import { VehicleFeatureService } from "../../services/vehicle-features/vehicle-features.service";
import { FeaturesRoute } from "./features.route";

let mongoIdMapperService = new MongoIdMapperService();
let vehicleService = new VehicleService(mongoIdMapperService);
let vehicleFeatureService = new VehicleFeatureService(mongoIdMapperService);
let imageService = new ImageService();

let vehicles = new VehiclesRoute(vehicleService);
let images = new ImagesRoute(imageService);
let features = new FeaturesRoute(vehicleFeatureService);

export default [
  features.create,
  features.get,
  features.getById,
  vehicles.getVehicle,
  vehicles.getVehicles,
  vehicles.createVehicle,
  images.createImage
];