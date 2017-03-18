import * as Azure from 'azure-storage';
import Constants from '../constants';
import { uuid } from 'uuid/v4';

export class ImageService {
  

  public async create(buffer: Buffer, contentType: string): Promise<string> {
    let container = Constants.fileStorage.publicAssetsContainer;

    const blobService = Azure.createBlobService(Constants.fileStorage.connectionString);
    blobService.createContainerIfNotExists(container, {
      publicAccessLevel: 'blob'
    }, (err, result) => {
      if (err)
        throw err.message;
    });

    blobService.createBlockBlobFromStream(container, uuid.v4(), buffer.buffer, 

    //Return uri
  }
}