import {useCallback, useMemo, useState} from 'react';

type StateHooksType<DataType> = {
    isInProgress: boolean;
    processError: Error | null;
    reset: () => void;
    result: DataType | null;
    setIsInProgress: (isInProgress: boolean) => void;
    setProcessError: (processError: Error | null) => void;
    setResult: (result: DataType | null) => void;
};

export function useApiHooks<DataType>(): StateHooksType<DataType> {
    const [isInProgress, setIsInProgress] = useState<boolean>(false);
    const [processError, setProcessError] = useState<Error | null>(null);
    const [result, setResult] = useState<DataType | null>(null);

    const reset = useCallback(() => {
        setProcessError(null);
        setIsInProgress(false);
        setResult(null);
    }, [setProcessError, setIsInProgress, setResult]);

    return useMemo(() => {
        return {
            isInProgress,
            processError,
            reset,
            result,
            setIsInProgress,
            setProcessError,
            setResult,
        };
    }, [isInProgress, setIsInProgress, processError, setProcessError, result, setResult, reset]);
}
