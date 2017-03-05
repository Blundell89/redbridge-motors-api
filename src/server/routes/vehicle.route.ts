import { IRouteConfiguration } from 'hapi';
import { VehicleService } from "../../services/vehicles/vehicle.service";
import { Vehicle } from "../../services/vehicles/vehicle.interface";

export class VehicleRoute {
  constructor(private vehicleService: VehicleService) {
  }

  getVehicles: IRouteConfiguration = {
    config: {
      auth: false
    },
    handler: async (req, res) => {

      var vehicles = await this.vehicleService.getVehicles();
      res(vehicles);
    },
    method: 'GET',
    path: '/vehicles'
  };

  getVehicle: IRouteConfiguration = {
    config: {
      auth: false
    },
    handler: async (req, res) => {
      const id = req.params['id'];

      var vehicle = await this.vehicleService.getVehicle(id)
      res(vehicle);
    },
    method: 'GET',
    path: '/vehicles/{id}'
  };

  createVehicle: IRouteConfiguration = {
    handler: async (req, res) => {
      const vehicle = <Vehicle>req.payload;

      let inserted = await this.vehicleService.createVehicle(vehicle);

      let response: CreatedResponse = {
        data: {
          id: inserted
        }
      };

      return res(response).code(201).header('Location', `/vehicles/${inserted}`);
    },
    method: 'POST',
    path: '/vehicles'
  }
}