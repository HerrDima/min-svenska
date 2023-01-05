// eslint-disable-next-line complexity
export function makeCssArray(value?: Array<number> | number): [number, number, number, number] {
    if (typeof value === 'number') {
        return [value, value, value, value];
    }

    if (!Array.isArray(value)) {
        return [0, 0, 0, 0];
    }

    const arrayLength = value.length;

    switch (arrayLength) {
        case 0: {
            return [0, 0, 0, 0];
        }
        case 1: {
            return [value[0], value[0], value[0], value[0]];
        }
        case 2: {
            return [value[0], value[1], value[0], value[1]];
        }
        case 3: {
            return [value[0], value[1], value[2], value[1]];
        }
        case 4: {
            return [value[0], value[1], value[2], value[3]];
        }
        default: {
            console.error('makeCssArray: too big array');
            return [value[0], value[1], value[2], value[3]];
        }
    }
}
