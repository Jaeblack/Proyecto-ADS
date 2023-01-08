import { Schema, model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

const Contract = Schema(
  {
    clientId: Schema.Types.ObjectId,
    workerId: Schema.Types.ObjectId,
    serviceId: Schema.Types.ObjectId,
    requestedAt: Schema.Types.Date,
    isAccepted: Schema.Types.Boolean,
    isFinished: Schema.Types.Boolean,
    finishedAt: Schema.Types.Date,
    place: Schema.Types.String,
    calification: Schema.Types.Number,
    comments: Schema.Types.String,
  },
  { timestamps: true },
);

export const ContractModel = model('Contract', Contract);
export const ContractTC = composeWithMongoose(ContractModel);

