#!/usr/bin/env node

import path from 'path';
import { Command } from 'commander/esm.mjs';
import { cwd } from 'process';
import action from '../src/commander.js';

const program = new Command();
program
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    action(path.resolve(cwd(), filepath1), path.resolve(cwd(), filepath2));
  });
program.parse();
