import GraphQLClientServer from './graphQLClientServer';

if (typeof window !== 'undefined') {
    window.JsonGraphqlServer = GraphQLClientServer;
}

export default GraphQLClientServer;
