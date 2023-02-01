import assert from 'node:assert/strict';

import {describe, test} from '@jest/globals';

import {waitForTime} from '../../test-unit/util/test-util-time';

import {TaskRunner} from './task-runner';

const defaultTimeOut = 50;

describe('TaskRunner', () => {
    test('Constructor', () => {
        const taskRunner = new TaskRunner({maxWorkerCount: 2});

        assert.equal(taskRunner instanceof TaskRunner, true);
    });

    test('Constructor with wrong parameters', () => {
        assert.throws(() => new TaskRunner({maxWorkerCount: -0.5}));
    });

    test('Add task', async () => {
        const taskRunner = new TaskRunner({maxWorkerCount: 1});

        let increaseMe = 0;

        await taskRunner.add(async () => {
            await waitForTime(defaultTimeOut);
            increaseMe += 1;
        });

        assert.equal(increaseMe, 1);
    });

    test('Check queue order', async () => {
        const taskRunner = new TaskRunner({maxWorkerCount: 1});

        let increaseMe = 0;

        taskRunner.add(async () => {
            await waitForTime(defaultTimeOut);
            increaseMe += 1;
        });

        await taskRunner.add(async () => {
            assert.equal(increaseMe, 1);

            await waitForTime(defaultTimeOut);
            increaseMe += 1;
        });

        assert.equal(increaseMe, 2);
    });

    test('Add task with known/regular Error', async () => {
        const taskRunner = new TaskRunner({maxWorkerCount: 1});

        let increaseMe = 0;
        let isErrorCaught = false;

        taskRunner.add(async () => {
            await waitForTime(defaultTimeOut);
            increaseMe += 1;
        });

        try {
            await taskRunner.add(async () => {
                await waitForTime(defaultTimeOut);
                throw new Error('I am the ERROR!');
            });
        } catch (error: unknown) {
            assert.equal(error instanceof Error ? error?.message : '', 'I am the ERROR!');
            isErrorCaught = true;
        }

        await taskRunner.add(async () => {
            await waitForTime(defaultTimeOut);
            increaseMe += 1;
        });

        assert.equal(increaseMe, 2);
        assert.equal(isErrorCaught, true);
    });

    test('Add task with unknown Error', async () => {
        const taskRunner = new TaskRunner({maxWorkerCount: 1});

        let increaseMe = 0;
        let isErrorCaught = false;

        taskRunner.add(async () => {
            await waitForTime(defaultTimeOut);
            increaseMe += 1;
        });

        try {
            await taskRunner.add(async () => {
                await waitForTime(defaultTimeOut);
                // eslint-disable-next-line no-throw-literal
                throw 'I am an ERROR!';
            });
        } catch (error: unknown) {
            assert.equal(error instanceof Error && error?.message.toString().startsWith('[TaskRunner]:'), true);
            isErrorCaught = true;
        }

        await taskRunner.add(async () => {
            await waitForTime(defaultTimeOut);
            increaseMe += 1;
        });

        assert.equal(increaseMe, 2);
        assert.equal(isErrorCaught, true);
    });

    test('Add several tasks and with deifferent time of exection, maxWorkerCount: 1', async () => {
        const taskRunner = new TaskRunner({maxWorkerCount: 1});

        const listOfTime: Array<number> = [];

        taskRunner.add(async () => {
            await waitForTime(200);
            listOfTime.push(200);
        });

        taskRunner.add(async () => {
            await waitForTime(100);
            listOfTime.push(100);
        });

        taskRunner.add(async () => {
            await waitForTime(10);
            listOfTime.push(10);
        });

        await waitForTime(350); // 200 + 100 + 10 and + 40 for "switching" between tasks

        assert.deepEqual(listOfTime, [200, 100, 10]);
    });

    test('Add several tasks and with deifferent time of exection, maxWorkerCount: 2', async () => {
        const taskRunner = new TaskRunner({maxWorkerCount: 2});

        const listOfTime: Array<number> = [];

        taskRunner.add(async () => {
            await waitForTime(200);
            listOfTime.push(200);
        });

        taskRunner.add(async () => {
            await waitForTime(100);
            listOfTime.push(100);
        });

        taskRunner.add(async () => {
            await waitForTime(10);
            listOfTime.push(10);
        });

        await waitForTime(205); // most long task, other tasks should be "inside" the longest task

        assert.deepEqual(listOfTime, [100, 10, 200]);
    });

    test('Add several tasks and with deifferent time of exection, maxWorkerCount: 3', async () => {
        const taskRunner = new TaskRunner({maxWorkerCount: 3});

        const listOfTime: Array<number> = [];

        taskRunner.add(async () => {
            await waitForTime(200);
            listOfTime.push(200);
        });

        taskRunner.add(async () => {
            await waitForTime(100);
            listOfTime.push(100);
        });

        taskRunner.add(async () => {
            await waitForTime(10);
            listOfTime.push(10);
        });

        await waitForTime(205); // most long task, other tasks should be "inside" the longest task

        assert.deepEqual(listOfTime, [10, 100, 200]);
    });
});
