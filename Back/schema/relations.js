import { UserDTC, WorkerTC, ClientTC } from './models/User';
import { CategoryTC } from './models/Category';
import { ServiceTC } from './models/Service';
import { ContractTC } from './models/Contract';



/**
 * Worker Relations
 */
WorkerTC.addRelation('services', {
  resolver: () => ServiceTC.getResolver('findMany'),
  prepareArgs: {
    _ids: (worker) => worker.friendsIds,
  },
  projection: { servicesIds: 1 },
});

WorkerTC.addRelation('contracts', {
    resolver: () => ContractTC.getResolver('findMany'),
    prepareArgs: {
      filter: worker => ({
        workerId: worker._id,
      }),
    },
    projection: { _id: 1 },
  });

/**
 * Client Relations
 */
ClientTC.addRelation('contracts', {
  resolver: () => ContractTC.getResolver('findMany'),
  prepareArgs: {
    filter: client => ({
      clientId: client._id,
    }),
  },
  projection: { _id: 1 },
});

/**
 * Service Relations
 */
ServiceTC.addRelation('category', {
  /**
   * Resolver `findOne` has `filter` arg, we may provide mongoose query to it
   */
  resolver: () => CategoryTC.getResolver('findOne'),
  prepareArgs: {
    filter: service => ({
      _id: service.categoryId,
    }),
  },
  projection: { categoryId: 1 },
});

ServiceTC.addRelation('contracts', {
  resolver: () => ContractTC.getResolver('findMany'),
  prepareArgs: {
    // resolver `findMany` has `filter` arg, we may provide mongoose query to it
    filter: service => ({
      serviceId: service._id,
    }),
  },
  projection: { _id: 1 }, // required fields from Service object, 1=true
});

/**
 * Contract Relations
 */
ContractTC.addRelation('service', {
  resolver: () => ServiceTC.getResolver('findOne'),
  prepareArgs: {
    filter: contract => ({
      _id: contract.serviceId,
    }),
  },
  projection: { serviceId: 1 },
});

ContractTC.addRelation('client', {
  resolver: () => ClientTC.getResolver('findOne'),
  prepareArgs: {
    filter: contract => ({
      _id: contract.clientId,
    }),
  },
  projection: { clientId: 1 },
});

ContractTC.addRelation('worker', {
    resolver: () => WorkerTC.getResolver('findOne'),
    prepareArgs: {
      filter: contract => ({
        _id: contract.workerId,
      }),
    },
    projection: { workerId: 1 },
});

export const UserDTC = UserDTC;
export const ClientTC = ClientTC;
export const WorkerTC = WorkerTC;
export const ServiceTC = ServiceTC;
export const ContractTC = ContractTC;