import * as Azure from 'azure-storage';
import Constants from '../constants';
import * as Uuid from 'node-uuid';
import * as stream from 'stream';

export class ImageService {
  public create(buffer: Buffer, contentType: string): Promise<string> {
    let container = Constants.fileStorage.publicAssetsContainer;
    
    const blobService = Azure.createBlobService(Constants.fileStorage.connectionString);
    blobService.createContainerIfNotExists(container, {
      publicAccessLevel: 'blob'
    }, (err, result) => {
      if (err)
        throw err.message;
    });

    const name = Uuid.v4();
    const options: Azure.BlobService.CreateBlobRequestOptions = {
      contentSettings: {
        contentType: contentType
      }
    }

    return new Promise((resolve, reject) => {
      blobService.createBlockBlobFromText(container, name, buffer, options, (err, result, response) => {
        if (err)
          throw err.message;

        var url = blobService.getUrl(container, name, null);
        resolve(url);
      });
    });
  }
}