import { IRouteConfiguration } from 'hapi';
import * as Boom from 'boom';

import { ImageService } from '../../services/images/image.service';
const dataUriToBuffer = require('data-uri-to-buffer');

export class ImagesRoute {
  constructor(private imageService: ImageService) {
  }

  createImage: IRouteConfiguration = {
    handler: (req, res) => {
      let uri = req.payload.data;
      let buffer = dataUriToBuffer(uri);

      let location = this.imageService.create(buffer, buffer.type)
      .then(location => res('').created(location))
      .catch(err => {
        res(Boom.create(err));
      });
    },
    method: 'POST',
    path: '/images'
  }
}
