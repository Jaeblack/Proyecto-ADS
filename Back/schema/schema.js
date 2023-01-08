import { schemaComposer } from 'graphql-compose';
import queries from './queries';
import mutations from './mutations';

/**
 * Adding the queries and mutations we selected
 */
schemaComposer.Query.addFields(queries);
schemaComposer.Mutation.addFields(mutations);

const schema = schemaComposer.buildSchema();

export default schema;