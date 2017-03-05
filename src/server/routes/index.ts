import {tokenRoute} from './oauth/token';
import { VehicleRoute } from './vehicle.route';
import { VehicleService } from "../../services/vehicles/vehicle.service";

var vehicleService = new VehicleService();
var vehicles = new VehicleRoute(vehicleService);

export default [
  tokenRoute,
  vehicles.getVehicle,
  vehicles.getVehicles,
  vehicles.createVehicle
];