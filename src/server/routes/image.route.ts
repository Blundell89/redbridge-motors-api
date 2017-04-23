import { IRouteConfiguration } from 'hapi';
import { ImageService } from '../../services/images/image.service';
const dataUriToBuffer = require('data-uri-to-buffer');

export class ImageRoute {
  constructor(private imageService: ImageService) {
  }

  createImage: IRouteConfiguration = {
    config: {
      auth: false
    },
    handler: (req, res) => {
      let uri = req.payload.data;
      let buffer = dataUriToBuffer(uri);

      let location = this.imageService.create(buffer, buffer.type)
      .then(location => res('').created(location))
      .catch(err => {
        throw err;
      });
    },
    method: 'POST',
    path: '/images'
  }
}
