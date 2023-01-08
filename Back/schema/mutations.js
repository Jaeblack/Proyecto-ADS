import bcryptjs from 'bcryptjs';
const { hash, compare } = bcryptjs;
import jsonwebtoken from 'jsonwebtoken';
const { sign } = jsonwebtoken;
import { UserModel } from './models/User.js';
import { UserDTC, ClientTC, WorkerTC, ServiceTC, ContractTC, CategoryTC } from './relations.js';
/**
 *  Getting objects after relations are applied
 */

/**
 * Making custom resolvers for login/register
 * mutations
 */
UserDTC.addResolver({
  kind: 'mutation',
  name: 'userRegister',
  args: {
    email: 'String!',
    password: 'String!',
    type: 'String!',
    firstName: 'String!',
    lastName: 'String!',
  },
  type: UserDTC.getResolver('updateById').getType(),
  resolve: async ({ args /* context */ }) => {
    let existUser = null;
    if (isNaN(Number(args.email))) {
      existUser = await UserModel.findOne({ email: args.email });
    } else {
      existUser = await UserModel.findOne({ phone: Number(args.email) });
    }
    if (existUser) {
      throw new Error('User exists already.');
    }
    const hashedPassword = await hash(args.password, 12);
    const newUser = new UserModel({
      email: args.email,
      password: hashedPassword,
      type: args.type,
      firstName: args.firstName,
      lastName: args.lastName,
    });
    const result = await newUser.save();
    return {
      recordId: result._id,
      record: result,
    };
  },
});

/**
 * Field added in order to have a token
 * for the login
 */
UserDTC.addFields({
  token: {
    type: 'String',
    description: 'Token of authenticated user.',
  },
});

UserDTC.addResolver({
  kind: 'mutation',
  name: 'userLogin',
  args: {
    email: 'String!',
    password: 'String!',
  },
  type: UserDTC.getResolver('updateById').getType(),
  resolve: async ({ args /* context */ }) => {
    let user = null;
    if (isNaN(Number(args.email))) {
      user = await UserModel.findOne({ email: args.email });
    } else {
      user = await UserModel.findOne({ phone: Number(args.email) });
    }
    if (!user) {
      throw new Error('User does not exist.');
    }

    const isEqual = await compare(args.password, user.password);
    if (!isEqual) {
      throw new Error('Password is not correct.');
    }

    const token = sign(
      {
        userId: user._id,
        userEmail: user.email,
        userPassword: user.password,
      },
      'secretkey',
      {
        expiresIn: '1h',
      },
    );

    return {
      recordId: user._id,
      record: {
        token: token,
        _id: user._id,
        type: user.type,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        phone: user.phone,
        address: user.address,
        cards: [user.cards.map(card => card.number)],
      },
    };
  },
});

const userMutations = {
  userCreate: UserDTC.getResolver('createOne'),
  userUpdate: UserDTC.getResolver('updateOne'),
  userRegister: UserDTC.getResolver('userRegister'),
  userLogin: UserDTC.getResolver('userLogin'),

  clientCreate: ClientTC.getResolver('createOne'),
  clientUpdate: ClientTC.getResolver('updateOne'),

  workerCreate: WorkerTC.getResolver('createOne'),
  workerUpdate: WorkerTC.getResolver('updateOne'),
};
const serviceMutations = {
  serviceCreate: ServiceTC.getResolver('createOne'),
  serviceCreateMany: ServiceTC.getResolver('createMany'),
  serviceUpdate: ServiceTC.getResolver('updateOne'),
};
const contractMutations = {
  contractCreate: ContractTC.getResolver('createOne'),
  contractUpdate: ContractTC.getResolver('updateOne'),
};
const categoryMutations = {
  categoryCreate: CategoryTC.getResolver('createOne'),
  categoryUpdate: CategoryTC.getResolver('updateOne'),
};

const mutations = {
  ...userMutations,
  ...serviceMutations,
  ...contractMutations,
  ...categoryMutations,
};

export default mutations;