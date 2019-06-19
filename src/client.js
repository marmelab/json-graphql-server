import GraphQLClientServer from './graphQLClientServer';
import schemaBuilder from './schemaBuilder';

if (typeof window !== 'undefined') {
    window.JsonGraphqlServer = GraphQLClientServer;
    window.jsonSchemaBuilder = schemaBuilder;
}

export default GraphQLClientServer;
