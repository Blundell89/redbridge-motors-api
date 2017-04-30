import { IRouteConfiguration } from 'hapi';
import * as Boom from 'boom';
import { VehicleFeatureService } from "../../services/vehicle-features/vehicle-features.service";
import { VehicleFeature } from "../../services/vehicle-features/vehicle-feature.interface";
import { CreatedResponse } from "../responses/created.response";

export class FeaturesRoute {
  constructor(private vehicleFeatureService: VehicleFeatureService) {
  }

  get: IRouteConfiguration = {
    handler: (req, res) => {
      this.vehicleFeatureService.get()
        .then(features => res(features));
    },
    method: 'GET',
    path: '/features'
  }

  getById: IRouteConfiguration = {
    handler: (req, res) => {
      this.vehicleFeatureService.getById(req.params['id'])
      .then(feature => {
        if (feature) {
          res(feature);
        } else {
          res(Boom.notFound());
        }
      })
    },
    method: 'GET',
    path: '/features/{id}'
  }

  create: IRouteConfiguration = {
    handler: (req, res) => {
      var feature: VehicleFeature = req.payload;

      if (feature && feature.name) {
        this.vehicleFeatureService.create(feature)
        .then(id => {
          let response: CreatedResponse = {
            data: {
              id: id
            }
          };

          res(response).code(201).header('Location', `/features/${id}`);
        })
        .catch(err => res(Boom.conflict()));
      } else {
        res(Boom.badRequest());
      }
    },
    method: 'POST',
    path: '/features'
  }
}
