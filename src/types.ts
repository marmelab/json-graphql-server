export type Entity = Record<string, any> & { id?: any };
export type EntityWithAllValues = Record<string, any[]>;
export type Data = Record<string, Entity[]>;
