import { join } from 'path';

const debug = require('debug')('michelangelo-build-dev');

export default class Service {
  private commands = {};
  private pluginHooks = {};
  private plugins: any = [];
  private cwd: any;
  constructor({ cwd }: any) {
    this.cwd = cwd;
    this.plugins = this.resolvePlugins();

    console.log(join(this.cwd, 'package.json'));
  }

  private applyPlugins(key: string, opts: any) {

  }

  private resolvePlugins() {
    try {
      return [];
    } catch (error) {
      
    }
  }

  private initPlugins() {

  }

  private init() {
    this.initPlugins();
  }

  public run(name: string = 'help', args: any) {
    console.log('service run');
    this.init();
    return this.runCommand(name, args);
  }

  private runCommand(rawName: string, rawArgs: any) {
    debug(`raw command name: ${rawName}, args: ${JSON.stringify(rawArgs)}`);
    this.applyPlugins('_modifyCommand', {
      initialValue: {
        name: rawName,
        args: rawArgs,
      }
    });
  }
}
