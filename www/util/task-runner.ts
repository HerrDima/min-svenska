export type PromiseResolveType<Result> = (result: Result) => unknown;
export type QueueRunningTaskType = () => Promise<unknown> | unknown;

type QueueTaskType = {
    reject: PromiseResolveType<Error>;
    resolve: PromiseResolveType<void>;
    task: QueueRunningTaskType;
};

export type TaskRunnerOnTaskDoneArgumentType = {
    restTaskCount: number;
    taskInProgressCount: number;
};
type TaskRunnerOnTaskDoneType = (taskRunnerData: TaskRunnerOnTaskDoneArgumentType) => void;

export type TaskRunnerConfigType = {
    maxWorkerCount: number;
    onTaskEnd?: TaskRunnerOnTaskDoneType;
};

function noop() {
    return;
}

export class TaskRunner {
    private readonly taskList: Array<QueueTaskType> = [];
    private maxWorkerCount = 1;
    private currentWorkerCount = 0;
    private readonly onTaskEnd: TaskRunnerOnTaskDoneType = noop;

    constructor(config: TaskRunnerConfigType) {
        const {maxWorkerCount, onTaskEnd} = config;

        if (maxWorkerCount < 1) {
            throw new Error('[TaskRunner]: maxWorkerCount should be >= 1.');
        }

        this.taskList = [];
        this.maxWorkerCount = maxWorkerCount;
        this.currentWorkerCount = 0;
        this.onTaskEnd = onTaskEnd || noop;
    }

    private getCurrentWorkerCount(): number {
        return this.currentWorkerCount;
    }

    private getTaskCount(): number {
        return this.taskList.length;
    }

    private getHasFreeWorkers(): boolean {
        return this.getCurrentWorkerCount() < this.maxWorkerCount;
    }

    add(runningTask: QueueRunningTaskType): Promise<void> {
        return new Promise<void>((resolve: PromiseResolveType<void>, reject: PromiseResolveType<Error>): void => {
            this.taskList.push({reject, resolve, task: runningTask});

            if (this.getHasFreeWorkers()) {
                this.run();
            }
        });
    }

    private async run() {
        const [fistTask] = this.taskList;

        this.taskList.splice(0, 1);

        if (fistTask) {
            this.currentWorkerCount += 1;

            try {
                await fistTask.task();
                fistTask.resolve();
            } catch (error: unknown) {
                if (error instanceof Error) {
                    fistTask.reject(error);
                } else {
                    fistTask.reject(new Error('[TaskRunner]: Task running with error!'));
                }
            }

            this.currentWorkerCount -= 1;

            this.onTaskEnd({
                restTaskCount: this.getTaskCount(),
                taskInProgressCount: this.currentWorkerCount,
            });
        }

        if (this.getTaskCount() > 0) {
            await this.run();
        }
    }
}
