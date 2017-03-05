export class ImageService {
  public async create(buffer: Buffer, contentType: string): Promise<string> {
    return await Promise.resolve('http://www.google.co.uk');
  }
}