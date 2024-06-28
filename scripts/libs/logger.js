import chalk from 'chalk';

export class Logger {
  name;

  constructor(name) {
    this.name = name;
  }

  log(message, breaks = 1) {
    process.stdout.write(`${chalk.cyan(`[${this.name}]`)} ${message}${'\n'.repeat(breaks)}`);
  }

  info(message, breaks = 1) {
    this.log(`${chalk.cyan('→')} ${message}`, breaks);
  }

  success(message, breaks = 1) {
    this.log(`${chalk.green('✓')} ${message}`, breaks);
  }

  error(message, breaks = 1) {
    this.log(`${chalk.red('✗')} ${message}`, breaks);
  }
}
