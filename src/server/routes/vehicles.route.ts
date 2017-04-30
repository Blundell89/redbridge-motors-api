import { IRouteConfiguration } from 'hapi';
import { VehicleService } from "../../services/vehicles/vehicle.service";
import { Vehicle } from "../../services/vehicles/vehicle.interface";
import { CreatedResponse } from "../responses/created.response";

export class VehiclesRoute {
  constructor(private vehicleService: VehicleService) {
  }

  getVehicles: IRouteConfiguration = {
    config: {
      auth: false
    },
    handler: (req, res) => {
      this.vehicleService.getVehicles()
        .then(vehicles => {
          res(vehicles);
        });
    },
    method: 'GET',
    path: '/vehicles'
  };

  getVehicle: IRouteConfiguration = {
    config: {
      auth: false
    },
    handler: (req, res) => {
      const id = req.params['id'];

      this.vehicleService.getVehicle(id)
        .then(vehicle => {
          res(vehicle);
        });
    },
    method: 'GET',
    path: '/vehicles/{id}'
  };

  createVehicle: IRouteConfiguration = {
    handler: (req, res) => {
      const vehicle: Vehicle = req.payload;

      this.vehicleService.createVehicle(vehicle)
        .then(id => {
          let response: CreatedResponse = {
            data: {
              id: id
            }
          };

          res(response).code(201).header('Location', `/vehicles/${id}`);
        });
    },
    method: 'POST',
    path: '/vehicles'
  }
}