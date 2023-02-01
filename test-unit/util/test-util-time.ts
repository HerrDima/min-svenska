/* global setTimeout */

export function waitForTime(timeInMs: number): Promise<void> {
    return new Promise<void>((resolve: () => void) => {
        setTimeout(resolve, timeInMs);
    });
}
