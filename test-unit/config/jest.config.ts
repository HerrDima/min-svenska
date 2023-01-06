import type {Config} from 'jest';

export const jestTestUnitConfig: Config = {
    bail: false, // true - stop after first failing test
    collectCoverage: true,
    errorOnDeprecated: true,
    injectGlobals: false,
    maxConcurrency: 1,
    maxWorkers: 1,
    moduleNameMapper: {
        '^\\S+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    },
    modulePathIgnorePatterns: ['<rootDir>/tsc-check/'],
    passWithNoTests: true,
    preset: 'ts-jest',
    rootDir: '../../',
    setupFilesAfterEnv: [],
    silent: true,
    testEnvironment: 'jsdom', // @testing-library/jest-dom
    testTimeout: 10e3,
};

// eslint-disable-next-line import/no-default-export
export default jestTestUnitConfig;
