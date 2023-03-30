#!/usr/bin/env node

import { program } from 'commander';
import { createNewProject } from './commands/new.command';
import { INewProjectOptions } from './types/new-project-options.interface';

// Create new project
program
  .command('new')
  .description('Create a new nasts project')
  .argument('<project-name>', 'Name of project, used as directory name')
  .option('-l --lint', 'Pass this flag to setup linting in the new project')
  .option(
    '-p --prettier',
    'Pass this flag to setup prettier in the new project',
  )
  .action((projectName: string, options: INewProjectOptions) => {
    createNewProject(projectName, options);
  });

// // To Be Implemented:
// // Start nasts project
// program
//   .command('start')
//   .description('Start nasts project')
//   .action(() => {
//     console.log('Starting project...');
//   });

// // Build nasts project
// program
//   .command('build')
//   .description('Build nasts project')
//   .action(() => {
//     console.log('Starting project...');
//   });

// // Test nasts project
// program
//   .command('test')
//   .description('Run tests and receive coverage report for nasts project')
//   .action(() => {
//     console.log('Starting project...');
//   });

// // Add module to nasts project
// program
//   .command('add')
//   .description(
//     'Adds a new item to nasts project, e.g. Controllers, Middleware, etc.',
//   )
//   .argument('<type-to-add>', 'Type to add, e.g. controller, middleware, etc.')
//   .argument('<name>', 'Name of new item to add')
//   .action((typeToAdd: string, name: string) => {
//     console.log(`Adding ${name} as ${typeToAdd}`);
//   });

program.parse(process.argv);

/*

COMMANDS:
nasts:
  new <project-name>
  start
  build
  test
  add <type> <name>

*/

// case sensitive routing
// dont expose x-powered-by
