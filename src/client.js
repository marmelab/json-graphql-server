import GraphQLClientServer from './graphQLClientServer';

if (typeof window !== 'undefined') {
    window.GraphQLClientServer = GraphQLClientServer;
}

export default GraphQLClientServer;
