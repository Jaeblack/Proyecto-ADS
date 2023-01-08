import { Schema, model } from 'mongoose';
import { composeWithMongooseDiscriminators } from 'graphql-compose-mongoose';
import BankCard from './BankCard';

/**
 * Pick a discriminatorKey
 */
const DKey = 'type';

const enumUserType = {
  CLIENT: 'Client',
  WORKER: 'Worker',
};

/**
 * Define user schemas
 */
const User = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: [enumUserType.CLIENT, enumUserType.WORKER],
      description: 'User type Worker or Client',
    },
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phone: String,
    address: String,
    cards: [BankCard],
  },
  { timestamps: true },
);

/**
 * Define discriminator schemas
 */
const Worker = new Schema({
  //cars: [Car],
});

const Client = new Schema({
  //parkingsIds: [Schema.Types.ObjectId],
});

/**
 * Set discriminator Key
 */
User.set('discriminatorKey', DKey);

export const UserModel = model('User', User);

/**
 * Create mongoose discriminator models
 */
export const WorkerModel = UserModel.discriminator(enumUserType.WORKER, Worker);
export const ClientModel = UserModel.discriminator(enumUserType.CLIENT, Client);

const baseOptions = {
  /**
   * Regular TypeConverterOptions, passed to composeMongoose
   * example:
   * fields: {
   *   remove: ['parkings'],
   * }
   */
};

/**
 * Discriminator Type Composers
 */
export const UserDTC = composeWithMongooseDiscriminators(UserModel, baseOptions);

const clientTypeConverterOptions = {
  /**
   * We can add custom options for each user type if we want
   * this options will be merged with baseOptions
   * example :
   * fields: {
   *     remove: ['makeDate'],
   * },
   */
};
export const WorkerTC = UserDTC.discriminator(WorkerModel, clientTypeConverterOptions);
export const ClientTC = UserDTC.discriminator(ClientModel);


