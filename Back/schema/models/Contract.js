import { Schema, model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

const Contract = Schema(
  {
    clientId: Schema.Types.ObjectId,
    workerId: Schema.Types.ObjectId,
    serviceId: Schema.Types.ObjectId,
    requestedAt: Schema.Types.Date,
    isFinished: Schema.Types.Boolean,
    finishedAt: Schema.Types.Date,
    place: Schema.Types.String,
    calification: Schema.Types.Number,
    comments: Schema.Types.String,
  },
  { timestamps: true },
);

const ContractModel = model('Contract', Contract);
const ContractTC = composeWithMongoose(ContractModel);

module.exports = {
    Contract: Contract,
    ContractTC: ContractTC,
};