import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';

export default () => {
    const client = new ApolloClient({
        cache: new InMemoryCache(),
    });

    return client;
};
