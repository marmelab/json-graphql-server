import { ApolloClient } from 'apollo-client';
import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';
import getSchemaFromData from './introspection/getSchemaFromData';

export default (data: any) => {
    const schema = getSchemaFromData(data);
    const mockNetworkInterface = mockNetworkInterfaceWithSchema({ schema });

    const client = new ApolloClient({
        // @ts-expect-error TS(2345): Argument of type '{ networkInterface: NetworkInter... Remove this comment to see the full error message
        networkInterface: mockNetworkInterface,
    });

    return client;
};
