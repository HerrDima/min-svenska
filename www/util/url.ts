/* global URL */

import {ObjectToUrlParametersType, QueryMapType, QuerySimpleValueType, QueryValueType} from './type';

// eslint-disable-next-line complexity
function stringifyUrlParameterSimpleValue(value: QuerySimpleValueType): string | null {
    // QuerySimpleValueType

    // void | null
    if (typeof value === 'undefined' || value === null) {
        return null;
    }

    // Date, `Number.isNaN(value.getTime())` - check for valid Date
    if (value instanceof Date) {
        return Number.isNaN(value.getTime()) ? null : value.toISOString();
    }

    // boolean | number | string
    return value.toString();
}

export function objectToUrlParameters(options: ObjectToUrlParametersType): string {
    const parameterList: Array<string> = [];

    // eslint-disable-next-line complexity
    Object.keys(options).forEach((key: string) => {
        const value: QueryValueType = options[key];

        if (Array.isArray(value) && value.length === 0) {
            return;
        }

        if (Array.isArray(value)) {
            const stringList: Array<string> = value
                .map<string | null>(stringifyUrlParameterSimpleValue)
                .filter<string>(
                    (stringValueInner: string | null): stringValueInner is string =>
                        typeof stringValueInner === 'string'
                );

            if (stringList.length > 0) {
                parameterList.push(encodeURIComponent(key) + '=' + encodeURIComponent(stringList.join(',')));
            }

            return;
        }

        const stringValue: string | null = stringifyUrlParameterSimpleValue(value);

        if (typeof stringValue === 'string') {
            parameterList.push(encodeURIComponent(key) + '=' + encodeURIComponent(stringValue));
        }
    });

    return parameterList.join('&');
}

export function getParametersFromUrl(fullUrlString: string): QueryMapType {
    const url: URL = new URL(fullUrlString);

    const {searchParams} = url;

    const keyList: Array<string> = [...searchParams.keys()];

    return keyList.reduce((data: QueryMapType, key: string): QueryMapType => {
        const value = String(searchParams.get(key));

        return {...data, [key]: value};
    }, {});
}
