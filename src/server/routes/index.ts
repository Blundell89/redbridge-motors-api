import {tokenRoute} from './oauth/token';
import { VehicleRoute } from './vehicle.route';
import { VehicleService } from "../../services/vehicles/vehicle.service";
import { ImageRoute } from "./image.route";
import { ImageService } from "../../services/images/image.service";

var vehicleService = new VehicleService();
var imageService = new ImageService();

var vehicles = new VehicleRoute(vehicleService);
var images = new ImageRoute(imageService);

export default [
  tokenRoute,
  vehicles.getVehicle,
  vehicles.getVehicles,
  vehicles.createVehicle,
  images.createImage
];