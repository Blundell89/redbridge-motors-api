import * as Azure from 'azure-storage';
import * as Uuid from 'node-uuid';
import * as stream from 'stream';
import Constants from '../constants';

export class ImageService {
  public create(buffer: Buffer, contentType: string): Promise<string> {
    const container = Constants.fileStorage.publicAssetsContainer;

    const blobService = Azure.createBlobService(Constants.fileStorage.connectionString);
    blobService.createContainerIfNotExists(container, {
      publicAccessLevel: 'blob',
    }, (err, result) => {
      if (err) {
        throw err.message;
      }
    });

    const name = Uuid.v4();
    const options: Azure.BlobService.CreateBlobRequestOptions = {
      contentSettings: {
        contentType,
      },
    };

    return new Promise((resolve, reject) => {
      blobService.createBlockBlobFromText(container, name, buffer, options, (err, result, response) => {
        if (err) {
          throw err.message;
        }

        const url = blobService.getUrl(container, name, null);
        resolve(url);
      });
    });
  }
}
