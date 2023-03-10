import assert from 'node:assert/strict';

import {describe, test} from '@jest/globals';

import {waitForTime} from '../../test-unit/util/test-util-time';

import {Queue} from './queue';

const defaultTimeOut = 50;

describe('Queue', () => {
    test('Constructor', () => {
        const queue = new Queue();

        assert.equal(queue instanceof Queue, true);
    });

    test('Add task', async () => {
        const queue = new Queue();

        let increaseMe = 0;

        await queue.add(async () => {
            await waitForTime(defaultTimeOut);
            increaseMe += 1;
        });

        assert.equal(increaseMe, 1);
    });

    test('Check queue order', async () => {
        const queue = new Queue();

        let increaseMe = 0;

        queue.add(async () => {
            await waitForTime(defaultTimeOut);
            increaseMe += 1;
        });

        await queue.add(async () => {
            assert.equal(increaseMe, 1);

            await waitForTime(defaultTimeOut);
            increaseMe += 1;
        });

        assert.equal(increaseMe, 2);
    });

    test('Add task with known/regular Error', async () => {
        const queue = new Queue();

        let increaseMe = 0;
        let isErrorCaught = false;

        queue.add(async () => {
            await waitForTime(defaultTimeOut);
            increaseMe += 1;
        });

        try {
            await queue.add(async () => {
                await waitForTime(defaultTimeOut);
                throw new Error('I am the ERROR!');
            });
        } catch (error: unknown) {
            assert.equal(error instanceof Error ? error?.message : '', 'I am the ERROR!');
            isErrorCaught = true;
        }

        await queue.add(async () => {
            await waitForTime(defaultTimeOut);
            increaseMe += 1;
        });

        assert.equal(increaseMe, 2);
        assert.equal(isErrorCaught, true);
    });

    test('Add task with unknown Error', async () => {
        const queue = new Queue();

        let increaseMe = 0;
        let isErrorCaught = false;

        queue.add(async () => {
            await waitForTime(defaultTimeOut);
            increaseMe += 1;
        });

        try {
            await queue.add(async () => {
                await waitForTime(defaultTimeOut);
                // eslint-disable-next-line no-throw-literal
                throw 'I am an ERROR!';
            });
        } catch (error: unknown) {
            assert.equal(error instanceof Error && error?.message.toString().startsWith('[Queue]:'), true);
            isErrorCaught = true;
        }

        await queue.add(async () => {
            await waitForTime(defaultTimeOut);
            increaseMe += 1;
        });

        assert.equal(increaseMe, 2);
        assert.equal(isErrorCaught, true);
    });
});
