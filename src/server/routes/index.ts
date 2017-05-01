import { FeaturesRoute } from './features.route';
import { ImagesRoute } from './images.route';
import { VehiclesRoute } from './vehicles.route';

import { ImageService } from '../../services/images/image.service';
import { MongoIdMapperService } from '../../services/mongo-id-mapper.service';
import { VehicleFeatureService } from '../../services/vehicle-features/vehicle-features.service';
import { VehicleService } from '../../services/vehicles/vehicle.service';

const mongoIdMapperService = new MongoIdMapperService();
const vehicleService = new VehicleService(mongoIdMapperService);
const vehicleFeatureService = new VehicleFeatureService(mongoIdMapperService);
const imageService = new ImageService();

const vehicles = new VehiclesRoute(vehicleService);
const images = new ImagesRoute(imageService);
const features = new FeaturesRoute(vehicleFeatureService);

export default [
  features.create,
  features.get,
  features.getById,
  vehicles.getVehicle,
  vehicles.getVehicles,
  vehicles.createVehicle,
  images.createImage,
];
