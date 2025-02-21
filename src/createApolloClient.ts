import { ApolloClient, InMemoryCache } from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
import getSchemaFromData from './introspection/getSchemaFromData';
import type { Data } from './types';

export default (data: Data) => {
    const schema = getSchemaFromData(data);

    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: new SchemaLink({ schema }),
    });

    return client;
};
