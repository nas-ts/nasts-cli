import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { INewProjectOptions } from '../types/new-project-options.interface';
import { askForInput, createDir, doesPathExist, removeDir } from '../utils';

export const createNewProject = async (
  projectName: string,
  options: INewProjectOptions,
): Promise<void> => {
  console.log(`Creating new nasts project with name: ${projectName}...`);

  await createProjectDirectory(projectName);
  createDir(`${projectName}/src`);
  createDir(`${projectName}/src/controllers`);
  createDir(`${projectName}/src/middleware`);
  createPackageJson(projectName);
  createTsConfig(projectName);
  createGitignore(projectName);

  //   if (options.lint) {
  //     createEslintRc();
  //     addEslintPackages();
  //   }

  //   if (options.prettier) {
  //     createPrettierRc();
  //     addPrettierPacakges();
  //   }

  createIndex(projectName);
  createExampleController(projectName);
  createExampleMiddleware(projectName);
  installPackages(projectName);
};

const createProjectDirectory = async (projectName: string) => {
  if (doesPathExist(projectName)) {
    console.log(`${projectName} already exists.`);
    console.log(
      `Type 'n' if you do NOT want to overwrite the ${projectName} directory`,
    );
    const wantToDelete = await askForInput(
      'Do you want to overwrite this directory? (y/n)',
    );
    if (wantToDelete.toLowerCase() === 'y') {
      removeDir(projectName);
      createDir(projectName);
    } else {
      process.exit(0);
    }
  } else {
    createDir(projectName);
    console.log(`${projectName} created successfully.`);
  }
};

const createPackageJson = (projectName: string) => {
  const exampleTsConfigJsonPath = path.join(
    __dirname,
    '..',
    '..',
    'files',
    'package.example.json',
  );
  const examplePackageJson = JSON.parse(
    fs.readFileSync(exampleTsConfigJsonPath, 'utf8'),
  );
  examplePackageJson.name = projectName;
  const newPackageJsonPath = `${projectName}/package.json`;
  fs.writeFileSync(
    newPackageJsonPath,
    JSON.stringify(examplePackageJson, null, 2),
  );
};

const createTsConfig = (projectName: string) => {
  const exampleTsConfigJsonPath = path.join(
    __dirname,
    '..',
    '..',
    'files',
    'tsconfig.example.json',
  );
  const exampleTsConfig = JSON.parse(
    fs.readFileSync(exampleTsConfigJsonPath, 'utf8'),
  );
  exampleTsConfig.name = projectName;
  const newTsConfig = `${projectName}/tsconfig.json`;
  fs.writeFileSync(newTsConfig, JSON.stringify(exampleTsConfig, null, 2));
};

const createGitignore = (projectName: string) => {
  const gitignorePath = path.join(
    __dirname,
    '..',
    '..',
    'files',
    '.gitignore.example',
  );
  const newGitignorePath = `${projectName}/.gitignore`;
  fs.copyFileSync(gitignorePath, newGitignorePath);
};

const createIndex = (projectName: string) => {
  const indexPath = path.join(
    __dirname,
    '..',
    '..',
    'files',
    'index.example.ts',
  );
  const newIndexPath = `${projectName}/src/index.ts`;
  fs.copyFileSync(indexPath, newIndexPath);
};

const createExampleMiddleware = (projectName: string) => {
  const exampleMiddlewarePath = path.join(
    __dirname,
    '..',
    '..',
    'files',
    'example-logger.middleware.example.ts',
  );
  const newExampleMiddlewarePath = `${projectName}/src/middleware/example-logger.middleware.ts`;
  fs.copyFileSync(exampleMiddlewarePath, newExampleMiddlewarePath);
};

const createExampleController = (projectName: string) => {
  const exampleControllerPath = path.join(
    __dirname,
    '..',
    '..',
    'files',
    'example.controller.example.ts',
  );
  const newExampleControllerPath = `${projectName}/src/controllers/example.controller.ts`;
  fs.copyFileSync(exampleControllerPath, newExampleControllerPath);
};

const installPackages = (projectName: string) => {
  const targetPath = path.join(process.cwd(), projectName);
  process.chdir(targetPath);
  execSync('npm i');
};
