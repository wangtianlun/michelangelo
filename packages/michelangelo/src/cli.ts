import buildDevOpts from './buildDevOpts';
import yParser from 'yargs-parser';

const script = process.argv[2];
const args = yParser(process.argv.slice(3));


switch (script) {
  case 'dev':
    require(`../lib/scripts/${script}.js`);
    break;

  default: {
    const Service = require('michelangelo-build-dev/lib/index').default;
    new Service(buildDevOpts(args));
    break;
  }
}


