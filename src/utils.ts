import fs from 'fs';
import readline from 'readline';

export const createDir = (dirName: string): void => {
  fs.mkdirSync(dirName);
};

export const removeDir = (dirName: string, recursive = true): void => {
  fs.rmdirSync(dirName, { recursive });
};

export const doesPathExist = (path: string): boolean => {
  return fs.existsSync(path);
};

export const askForInput = async (prompt: string): Promise<string> => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(`${prompt} `, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
};
