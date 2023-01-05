import Ajv, {JSONSchemaType} from 'ajv';

export function isObjectInclude(object: Record<string, unknown>, query: Record<string, unknown>): boolean {
    return Object.keys(query).every((queryKey: string): boolean => query[queryKey] === object[queryKey]);
}

/*
export function pickData<ModelType extends Record<string, unknown>, Keys extends string>(
    data: ModelType,
    requiredPropertyList: Array<keyof ModelType>
): Pick<ModelType, Keys> {
    return Object.assign(
        {},
        ...requiredPropertyList.map((key: keyof ModelType) => {
            return {[key]: data[key]};
        })
    );
}
*/

const ajv = new Ajv();

/*
export function getIsExpectedStructure<ExpectedResponseType>(
    data: unknown,
    jsonSchema: JSONSchemaType<ExpectedResponseType>
): data is ExpectedResponseType {
    const validate = ajv.compile<ExpectedResponseType>(jsonSchema);

    return validate(data);
}
*/

export function getExpectedStructure<ExpectedResponseType>(
    data: unknown,
    jsonSchema: JSONSchemaType<ExpectedResponseType>
): ExpectedResponseType {
    const validate = ajv.compile<ExpectedResponseType>(jsonSchema);

    if (validate(data)) {
        return data;
    }

    throw new Error(JSON.stringify(validate.errors));
}
