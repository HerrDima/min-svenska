/* global NodeJS, setTimeout, clearTimeout */

import {useCallback, useMemo, useState} from 'react';

import {convertToError} from './error';

export function noop(): unknown {
    return;
}

export function debounce<ArgsType extends Array<unknown>>(
    wrappedFunction: (...args: ArgsType) => unknown,
    waitInMs: number
): (...args: ArgsType) => void {
    let timeout: NodeJS.Timeout | null = null;

    return function debouncedFunction(...args: ArgsType): void {
        if (timeout !== null) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            wrappedFunction(...args);
        }, waitInMs);
    };
}

export function throttle<ArgsType extends Array<unknown>>(
    wrappedFunction: (...args: ArgsType) => unknown,
    periodInMs: number
): (...args: ArgsType) => void {
    let lastCallTimeStamp = 0;

    return function throttledFunction(...args: ArgsType): void {
        const nowTimeStamp: number = Date.now();

        if (nowTimeStamp - lastCallTimeStamp >= periodInMs) {
            lastCallTimeStamp = nowTimeStamp;
            wrappedFunction(...args);
        }
    };
}

type FunctionStateType<ArgsType extends Array<unknown>, ResultType> = {
    error: Error | null;
    execute: (...args: ArgsType) => Promise<ResultType>;
    isInProgress: boolean;
    result: ResultType | null;
};

export function useMakeExecutableState<ArgsType extends Array<unknown>, ResultType>(
    wrappedFunction: (...args: ArgsType) => Promise<ResultType>
): FunctionStateType<ArgsType, ResultType> {
    const [isInProgress, setIsInProgress] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [result, setResult] = useState<ResultType | null>(null);

    const execute = useCallback(
        async (...args: ArgsType): Promise<ResultType> => {
            setError(null);
            setIsInProgress(true);
            setResult(null);

            try {
                const functionResult: ResultType = await wrappedFunction(...args);

                setResult(functionResult);
                setIsInProgress(false);

                return functionResult;
            } catch (functionError: unknown) {
                const executeError = convertToError(functionError);

                setError(convertToError(functionError));
                setIsInProgress(false);

                throw executeError;
            }
        },
        [wrappedFunction]
    );

    return useMemo<FunctionStateType<ArgsType, ResultType>>((): FunctionStateType<ArgsType, ResultType> => {
        return {error, execute, isInProgress, result};
    }, [error, execute, isInProgress, result]);
}
