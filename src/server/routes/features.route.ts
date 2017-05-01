import * as Boom from 'boom';
import { IRouteConfiguration } from 'hapi';

import { VehicleFeature } from '../../services/vehicle-features/vehicle-feature.interface';
import { VehicleFeatureService } from '../../services/vehicle-features/vehicle-features.service';
import { CreatedResponse } from '../responses/created.response';

export class FeaturesRoute {
  public get: IRouteConfiguration = {
    handler: (req, res) => {
      this.vehicleFeatureService.get()
        .then((features) => res(features));
    },
    method: 'GET',
    path: '/features',
  };

  public getById: IRouteConfiguration = {
    handler: (req, res) => {
      this.vehicleFeatureService.getById(req.params.id)
      .then((feature) => {
        if (feature) {
          res(feature);
        } else {
          res(Boom.notFound());
        }
      });
    },
    method: 'GET',
    path: '/features/{id}',
  };

  public create: IRouteConfiguration = {
    handler: (req, res) => {
      const feature: VehicleFeature = req.payload;

      if (feature && feature.name) {
        this.vehicleFeatureService.create(feature)
        .then((id) => {
          const response: CreatedResponse = {
            data: {
              id,
            },
          };

          res(response).code(201).header('Location', `/features/${id}`);
        })
        .catch((err) => res(Boom.conflict()));
      } else {
        res(Boom.badRequest());
      }
    },
    method: 'POST',
    path: '/features',
  };

  constructor(private vehicleFeatureService: VehicleFeatureService) {
  }
}
