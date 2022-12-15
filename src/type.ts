import GraphQLClientServer from './graphQLClientServer';
import type schemaBuilder from './schemaBuilder';

export type EntityData = {
    id?: number | string;
    [key: string]: string | number | boolean | null | undefined;
};

declare global {
    interface Window {
        JsonGraphqlServer: typeof GraphQLClientServer;
        jsonSchemaBuilder: typeof schemaBuilder;
    }
}
