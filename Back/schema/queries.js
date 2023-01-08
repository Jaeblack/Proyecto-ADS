import { UserDTC, ClientTC, WorkerTC, ServiceTC, ContractTC, CategoryTC } from './relations.js';
  /**
   *  Getting objects after relations are applied
   */
  
  const userQueries = {
    userMany: UserDTC.getResolver('findMany'),
    userById: UserDTC.getResolver('findById'),
  
    clientMany: ClientTC.getResolver('findMany'),
    clientById: ClientTC.getResolver('findById'),
  
    workerMany: WorkerTC.getResolver('findMany'),
    workerById: WorkerTC.getResolver('findById'),
  };
  const serviceQueries = {
    serviceMany: ServiceTC.getResolver('findMany'),
    serviceById: ServiceTC.getResolver('findById'),
  };
  const contractQueries = {
    contractMany: ContractTC.getResolver('findMany'),
    contractById: ContractTC.getResolver('findById'),
  };

  const categoryQueries = {
    categoryMany: CategoryTC.getResolver('findMany'),
    categoryById: CategoryTC.getResolver('findById'),
  };
  
  
  const queries = {
    ...userQueries,
    ...serviceQueries,
    ...contractQueries,
    ...categoryQueries,
  };
  
  export default queries;