export type PromiseResolveType<Result> = (result: Result) => unknown;
export type QueueRunningTaskType = () => Promise<unknown> | unknown;

type QueueTaskType = {
    reject: PromiseResolveType<Error>;
    resolve: PromiseResolveType<void>;
    task: QueueRunningTaskType;
};

type TaskRunnerConfigType = {
    maxWorkerCount: number;
};

export class TaskRunner {
    private taskList: Array<QueueTaskType> = [];

    // private isWorking = false;
    private maxWorkerCount = 1;
    private currentWorkerCount = 0;

    constructor(config: TaskRunnerConfigType) {
        const {maxWorkerCount} = config;

        if (maxWorkerCount < 1) {
            throw new Error('[TaskRunner]: maxWorkerCount should be >= 1.');
        }

        this.taskList = [];
        this.maxWorkerCount = maxWorkerCount;
        this.currentWorkerCount = 0;
    }

    private getHasFreeWorkers(): boolean {
        return this.currentWorkerCount < this.maxWorkerCount;
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
            try {
                this.currentWorkerCount += 1;

                await fistTask.task();
                fistTask.resolve();

                this.currentWorkerCount -= 1;
            } catch (error: unknown) {
                this.currentWorkerCount -= 1;
                if (error instanceof Error) {
                    fistTask.reject(error);
                } else {
                    fistTask.reject(new Error('[TaskRunner]: Task running with error!'));
                }
            }
        }

        if (this.taskList.length > 0) {
            await this.run();
        }
    }
}
