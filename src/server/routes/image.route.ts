import { IRouteConfiguration } from 'hapi';
import { ImageService } from '../../services/images/image.service';
import { dataUriToBuffer } from 'data-uri-to-buffer';

export class ImageRoute {
  constructor(private imageService: ImageService) {
  }

  createImage: IRouteConfiguration = {
    handler: async (req, res) => {
      let uri = req.payload.data;
      let buffer = dataUriToBuffer(uri);

     let location = await this.imageService.create(buffer, buffer.type);

      res('').created(location);
    },
    method: 'POST',
    path: '/images'
  }
}
