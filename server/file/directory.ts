import fileSystem from 'node:fs/promises';
import path from 'node:path';
import {constants} from 'node:fs';

export async function getHasAccessToDirectory(...args: Array<string>): Promise<boolean> {
    try {
        // eslint-disable-next-line no-bitwise
        await fileSystem.access(path.join(...args), constants.R_OK | constants.W_OK);

        return true;
        // eslint-disable-next-line no-empty
    } catch {}

    return false;
}

export async function makeDirectory(...args: Array<string>): Promise<void> {
    const pathToFolder: string = path.join(...args);
    const hasAccessToDirectory = await getHasAccessToDirectory(pathToFolder);

    if (!hasAccessToDirectory) {
        await fileSystem.mkdir(pathToFolder);
    }
}
export async function tryToMakeDirectorySilent(...args: Array<string>): Promise<void> {
    const pathToFolder: string = path.join(...args);

    try {
        await fileSystem.mkdir(pathToFolder);
    } catch {
        // console.log('[ERROR]: tryToMkDir: can not create folder:', path.join(...args));
    }
}

export async function tryToRemoveDirectory(...args: Array<string>): Promise<void> {
    try {
        await fileSystem.rmdir(path.join(...args), {recursive: true});
    } catch {
        // console.log('[ERROR]: tryToRmDir: can not create folder:', path.join(...args));
    }
}
