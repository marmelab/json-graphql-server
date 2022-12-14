import GraphQLClientServer from './graphQLClientServer';
import schemaBuilder from './schemaBuilder';

if (typeof window !== 'undefined') {
    // @ts-expect-error TS(2339): Property 'JsonGraphqlServer' does not exist on typ... Remove this comment to see the full error message
    window.JsonGraphqlServer = GraphQLClientServer;
    // @ts-expect-error TS(2339): Property 'jsonSchemaBuilder' does not exist on typ... Remove this comment to see the full error message
    window.jsonSchemaBuilder = schemaBuilder;
}

export default GraphQLClientServer;
