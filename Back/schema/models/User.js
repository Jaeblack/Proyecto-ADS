import { Schema, model } from 'mongoose';
import { composeWithMongooseDiscriminators } from 'graphql-compose-mongoose';
import BankCard from './BankCard';

/**
 * Pick a discriminatorKey
 */
const DKey = 'type';

const enumUserType = {
  CLIENTE: 'Cliente',
  TRABAJADOR: 'Trabajador',
};

/**
 * Define user schemas
 */
const User = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: [enumUserType.CLIENTE, enumUserType.TRABAJADOR],
      description: 'User type Trabajador or Cliente',
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
const Trabajador = new Schema({
  //cars: [Car],
});

const Cliente = new Schema({
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
export const TrabajadorModel = UserModel.discriminator(enumUserType.TRABAJADOR, Trabajador);
export const ClienteModel = UserModel.discriminator(enumUserType.CLIENTE, Cliente);

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

const driverTypeConverterOptions = {
  /**
   * We can add custom options for each user type if we want
   * this options will be merged with baseOptions
   * example :
   * fields: {
   *     remove: ['makeDate'],
   * },
   */
};
export const TrabajadorTC = UserDTC.discriminator(TrabajadorModel, driverTypeConverterOptions);
export const ClienteTC = UserDTC.discriminator(ClienteModel);


