import { Schema } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

const Service = Schema(
  {
    name: String,
    cost: Number,
    categoryId: Schema.Types.ObjectId,
  }
);

const ServiceModel = mongoose.model('Service', Service);
const ServiceTC = composeWithMongoose(ServiceModel);

module.exports = {
    Service: Service,
    ServiceTC: ServiceTC,
};