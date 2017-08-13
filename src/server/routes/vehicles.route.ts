import * as Boom from 'boom';
import { RouteConfiguration } from 'hapi';

import { VehicleService } from '../../services/vehicles/vehicle.service';
import { CreatedResponse } from '../responses/created.response';

import { Vehicle } from '../../services/vehicles/vehicle.interface';

export class VehiclesRoute {
  public createVehicle: RouteConfiguration = {
    handler: (req, res) => {
      const vehicle: Vehicle = req.payload;

      this.vehicleService.createVehicle(vehicle)
        .then((id) => {
          const response: CreatedResponse = {
            data: {
              id,
            },
          };

          res(response).code(201).header('Location', `/vehicles/${id}`);
        });
    },
    method: 'POST',
    path: '/vehicles',
  };

  public getVehicle: RouteConfiguration = {
    config: {
      auth: false,
    },
    handler: (req, res) => {
      const id = req.params.id;

      this.vehicleService.getVehicle(id)
        .then((vehicle) => {
          res(vehicle);
        })
        .catch((err) => res(Boom.notFound()));
    },
    method: 'GET',
    path: '/vehicles/{id}',
  };

  public getVehicles: RouteConfiguration = {
    config: {
      auth: false,
    },
    handler: (req, res) => {
      this.vehicleService.getVehicles()
        .then((vehicles) => {
          res(vehicles);
        })
        .catch((err) => res(Boom.create(err)));
    },
    method: 'GET',
    path: '/vehicles',
  };

  constructor(private vehicleService: VehicleService) {
  }
}
