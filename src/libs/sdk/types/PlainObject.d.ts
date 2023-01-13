declare type Primitive = bigint | boolean | null | number | string | symbol | object | undefined;
declare type PlainObject = Record<string, Primitive>;
export default PlainObject;
