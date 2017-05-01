import * as Boom from 'boom';

import { IRouteConfiguration } from 'hapi';

import { ImageService } from '../../services/images/image.service';
import dataUriToBuffer = require('data-uri-to-buffer');

export class ImagesRoute {
  public createImage: IRouteConfiguration = {
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

  constructor(private imageService: ImageService) {
  }
}
