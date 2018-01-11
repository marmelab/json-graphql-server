import GraphQLClientServer from './graphQLClientServer';
export { default as createApolloClient } from './createApolloClient';
export { default as jsonGraphqlExpress } from './jsonGraphqlExpress';
export const graphQLClientServer = GraphQLClientServer;

if (typeof window !== 'undefined') {
    window.GraphQLClientServer = GraphQLClientServer;
}
