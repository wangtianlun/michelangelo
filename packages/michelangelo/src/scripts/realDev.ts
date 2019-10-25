import yParser from 'yargs-parser';
import buildDevOpts from '../buildDevOpts';

const args = yParser(process.argv.slice(2));
const opts = buildDevOpts(args);
process.env.NODE_ENV = 'development';

const Service = require('michelangelo-build-dev/lib/index').default;

new Service(opts).run('dev', args);
