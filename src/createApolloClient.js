import { ApolloClient } from 'apollo-client';
import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';
import getSchemaFromData from './introspection/getSchemaFromData';

export default (data) => {
    const schema = getSchemaFromData(data);
    const mockNetworkInterface = mockNetworkInterfaceWithSchema({ schema });

    const client = new ApolloClient({
        networkInterface: mockNetworkInterface,
    });

    return client;
};
