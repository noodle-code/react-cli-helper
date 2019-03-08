#!/usr/bin/env node
let command = require('./src/command');
let executeCommand = require('./src/execute');

command.runNextCommand(executeCommand);
