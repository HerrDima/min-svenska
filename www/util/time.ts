/* global setTimeout */
import {LocaleNameEnum} from '../provider/locale/locale-context-type';

import {getFormattedNumber, NumberFormatOptionsType, TimeSizeEnum} from './format';

export type TimeItemType = {count: number; unitType: TimeSizeEnum};

export type GetDateTimeDifferenceOptionType = {
    formatOption?: NumberFormatOptionsType;
    localeName: LocaleNameEnum;
    milliseconds: number;
    sliceSize: number;
};

export function getDateTimeHumanSize(option: GetDateTimeDifferenceOptionType): string {
    const {milliseconds, sliceSize, localeName, formatOption} = option;

    const minuteSize = 60; // 60 seconds
    const hourSize = 60; // 60 minutes
    const daySize = 24; // 24 hours
    const monthSize = 30; // 30 days
    const yearSize = 12; // 12 months

    const seconds = milliseconds / 1e3;
    const minutes = seconds / minuteSize;
    const hours = minutes / hourSize;
    const days = hours / daySize;
    // const weeks = days / 7;
    const months = days / monthSize;
    const years = months / yearSize;

    const yearPart = Math.floor(years);
    const monthPart = Math.floor(months) % yearSize;
    // const weekPart = Math.floor(weeks);
    const dayPart = Math.floor(days) % monthSize;
    const hourPart = Math.floor(hours) % daySize;
    const minutePart = (Math.floor(minutes) % 24) % hourSize;
    const secondPart = ((Math.floor(seconds) % 24) % 60) % minuteSize;

    return [
        {count: yearPart, unitType: TimeSizeEnum.year},
        {count: monthPart, unitType: TimeSizeEnum.month},
        {count: dayPart, unitType: TimeSizeEnum.day},
        {count: hourPart, unitType: TimeSizeEnum.hour},
        {count: minutePart, unitType: TimeSizeEnum.minute},
        {count: secondPart, unitType: TimeSizeEnum.second},
    ]
        .filter((timeItem: TimeItemType): boolean => timeItem.count >= 1)
        .slice(0, sliceSize)
        .filter((timeItem: TimeItemType): boolean => timeItem.count >= 1)
        .map((timeItem: TimeItemType): string => {
            const {count, unitType} = timeItem;

            return getFormattedNumber(localeName, count, {
                style: 'unit',
                unit: unitType,
                unitDisplay: 'long',
                ...formatOption,
            });
        })
        .join(' ');
}

export function secondsToHuman(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const restOfSeconds = Math.floor(seconds % 60);

    return `${minutes}:${restOfSeconds}`;
}

export function dateIsoToHumanView(dateIso: string): string {
    return dateIso.replace('T', ' ').replace(/\.\S+/, '');
}

export function waitForTime(timeInMs: number): Promise<void> {
    return new Promise<void>((resolve: () => void) => {
        setTimeout(resolve, timeInMs);
    });
}

export async function waitForCallback(
    callBack: () => Promise<boolean> | boolean,
    maxCount: number,
    timeOutMs: number
): Promise<boolean> {
    if (maxCount === 0) {
        throw new Error('waitForCallback, timeout');
    }

    const isDone = await callBack();

    if (isDone) {
        return true;
    }

    await waitForTime(timeOutMs);

    return waitForCallback(callBack, maxCount - 1, timeOutMs);
}

export async function takeTimeLog(label: string, task: () => Promise<unknown> | unknown): Promise<void> {
    const {log, time, timeLog} = console;

    log(`${label}: begin`);
    time(label);

    await task();

    timeLog(label, ': done');
}

export function logTakenTime(prefix: string, className: string) {
    return (target: unknown, memberName: string, propertyDescriptor: PropertyDescriptor) => {
        return {
            get() {
                // eslint-disable-next-line consistent-this, @typescript-eslint/no-this-alias, unicorn/no-this-assignment
                const context: unknown = this;

                async function wrapperFunction(): Promise<void> {
                    const {log, time, timeLog} = console;

                    const fullLabel = `${prefix} [${className}] ${memberName}`.trim();

                    log(`${fullLabel}: begin`);
                    time(fullLabel);

                    const name = 'value';
                    const mayBeFunction: unknown = propertyDescriptor[name];

                    if (typeof mayBeFunction === 'function') {
                        await Reflect.apply(mayBeFunction, context, []);
                    } else {
                        throw new TypeError(`[logTakenTime]: ${memberName} is not a function`);
                    }

                    timeLog(fullLabel, 'done');
                }

                // eslint-disable-next-line prefer-reflect
                Object.defineProperty(context, memberName, {
                    configurable: true,
                    value: wrapperFunction,
                    writable: true,
                });

                return wrapperFunction;
            },
        };
    };
}
