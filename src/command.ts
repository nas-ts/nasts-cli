import { Command } from 'commander';

export interface ICommandArgument {
  argument: string;
  description: string;
}

export interface ICommandOption {
  flags: string[];
  description: string;
}

export interface ICreateNewCommandOptions {
  command: string;
  description?: string;
  arguments?: ICommandArgument[];
  options?: ICommandOption[];
  action: (...args: any[]) => void;
}

export const createNewCommand = (
  newCommandOptions: ICreateNewCommandOptions,
): void => {
  const program = new Command();
  program
    .name(newCommandOptions.command)
    .description(newCommandOptions.description || '');

  newCommandOptions.arguments?.forEach((argument) => {
    program.argument(argument.argument, argument.description);
  });

  newCommandOptions.options?.forEach((option) => {
    program.option(option.flags.join(', '), option.description);
  });

  program.action(newCommandOptions.action);

  program.parse(process.argv);
};
