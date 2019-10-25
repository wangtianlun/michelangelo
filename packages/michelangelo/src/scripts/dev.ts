import yParser from 'yargs-parser';
import fork from 'michelangelo-build-dev/lib/fork';

(async () => {
  const args = yParser(process.argv.slice(2));

  const child = fork(require.resolve('../../lib/scripts/realDev.js'));

  child.on('exit', () => {

  });

  child.on('message', () => {

  });
})();