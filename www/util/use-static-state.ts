import {useState, useEffect, Dispatch, SetStateAction} from 'react';

const savedValueMapString: Record<string, string> = {};

// TODO: remove this
export function useStaticStringState(
    defaultValue: string,
    savedKey: string
): [string, Dispatch<SetStateAction<string>>] {
    // eslint-disable-next-line no-prototype-builtins
    const savedValue: string = savedValueMapString.hasOwnProperty(savedKey)
        ? savedValueMapString[savedKey]
        : defaultValue;
    const [value, setValue] = useState<string>(savedValue);

    useEffect(() => {
        savedValueMapString[savedKey] = value;
    }, [value, savedKey]);

    return [value, setValue];
}

const savedValueMapNumber: Record<string, number> = {};

export function useStaticNumberState(
    defaultValue: number,
    savedKey: string
): [number, Dispatch<SetStateAction<number>>] {
    // eslint-disable-next-line no-prototype-builtins
    const savedValue: number = savedValueMapNumber.hasOwnProperty(savedKey)
        ? savedValueMapNumber[savedKey]
        : defaultValue;
    const [value, setValue] = useState<number>(savedValue);

    useEffect(() => {
        savedValueMapNumber[savedKey] = value;
    }, [value, savedKey]);

    return [value, setValue];
}
