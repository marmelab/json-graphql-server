//export { default as createApolloClient } from './createApolloClient';
require('reify');

//const graphQLClientServer = require('./graphQLClientServer').default;
const jsonGraphqlExpress = require('./jsonGraphqlExpress').default;

module.exports = {
    //graphQLClientServer,
    jsonGraphqlExpress,
};
