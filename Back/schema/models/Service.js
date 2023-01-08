import { Schema, model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

const Service = Schema(
  {
    name: String,
    cost: Number,
    categoryId: Schema.Types.ObjectId,
  }
);

export const ServiceModel = model('Service', Service);
export const ServiceTC = composeWithMongoose(ServiceModel);
