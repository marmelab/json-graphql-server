import jsonGraphqlExpress from './jsonGraphqlExpress';
import schemaBuilder, { getPlainSchema } from './schemaBuilder';

export const jsonSchemaBuilder = schemaBuilder;
export { getPlainSchema, jsonGraphqlExpress };
export default jsonGraphqlExpress;
