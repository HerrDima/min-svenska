# Autotests

## End-to-End test: jest + puppeteer

Required libraries:
1. jest
2. ts-jest
3. @types/jest

4. puppeteer
5. @types/puppeteer

Running example:
```bash
$ jest ./test-e2e/ [--runInBand]
```

`--runInBand` - run tests sequentially


## Unit test: jest + react-*

Required libraries:
1. jest
2. ts-jest
3. @types/jest

4. @testing-library/react
5. @testing-library/jest-dom

6*. use https://mswjs.io/ to make http request

7*. use https://github.com/testing-library/react-hooks-testing-library to test react hooks

Jest config `./jest.config.js`
```javascript
module.exports = {
    bail: true, // stop after first failing test
    collectCoverage: true,
    errorOnDeprecated: true,
    injectGlobals: true,
    maxConcurrency: 1,
    maxWorkers: 1,
    moduleNameMapper: {
        '^\\S+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    },
    modulePathIgnorePatterns: ['<rootDir>/tsc-check/'],
    passWithNoTests: true,
    preset: 'ts-jest',
    rootDir: '../../',
    setupFilesAfterEnv: ['./test-unit/config/setup-jest.ts'],
    silent: true,
    testEnvironment: 'jsdom', // required - @testing-library/jest-dom, 'node' | 'jsdom'
    testTimeout: 10e3,
};
```

Jest config `./jest.config.ts`
```typescript
import type {Config} from 'jest';

const config: Config = {
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
    testEnvironment: 'node',
    testTimeout: 10e3,
};

// eslint-disable-next-line import/no-default-export
export default config;
```


Running example:
```bash
$ jest ./test-unit/ --coverage
```


## BackstopJS

Documentation: https://github.com/garris/BackstopJS

Documentation about scenarios' settings: https://github.com/garris/BackstopJS#using-backstopjs

Generating test bitmaps
```bash
$ backstop test --config="./test-backstop/backstop-config.json"
```

```bash
$ backstop approve --config="./test-backstop/backstop-config.json"
```
