export class MongoIdMapperService {
  public map(dataModel: any): any {
    dataModel.id = dataModel._id;
    delete dataModel._id;

    return dataModel;
  }
}