import { fork } from 'child_process';

export default function start(scriptPath: string, opts = {}) {
  const child = fork(scriptPath, process.argv.slice(2));

  return child;
}