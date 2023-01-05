import fileSystem from 'node:fs/promises';

export function writeStringToFile(pathToFile: string, data: string): Promise<void> {
    return fileSystem.writeFile(pathToFile, data);
}
