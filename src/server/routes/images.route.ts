import * as Boom from 'boom';

import { IRouteConfiguration } from 'hapi';

import { ImageService } from '../../services/images/image.service';
import dataUriToBuffer = require('data-uri-to-buffer');

export class ImagesRoute {
  public create: IRouteConfiguration = {
    handler: (req, res) => {
      const uri = req.payload.data;
      const buffer = dataUriToBuffer(uri);

      const location = this.imageService.create(buffer, buffer.type)
        .then((url) => res('').created(url))
        .catch((err) => {
          res(Boom.create(err));
        });
    },
    method: 'POST',
    path: '/images',
  };

  public delete: IRouteConfiguration = {
    handler: (req, res) => {
      const uri = req.params.id;

      if (!uri) {
        res(Boom.badRequest);
        return;
      }

      this.imageService.delete(uri)
        .then(() => res(''))
        .catch((err) => res(Boom.badImplementation(err)));
    },
    method: 'DELETE',
    path: '/images/{id}',
  };

  constructor(private imageService: ImageService) {
  }
}
