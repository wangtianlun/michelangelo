import { join } from 'path';
import { cloneDeep } from 'lodash';
import UserConfig from './userconfig';
import getPlugins from './getPlugins';

const debug = require('debug')('michelangelo-build-dev');

export default class Service {
  private commands = {};
  private pluginHooks = {};
  private plugins: any = [];
  private config: any = {};
  private cwd: any;
  constructor({ cwd }: any) {
    this.cwd = cwd;
    this.config = UserConfig.getConfig({
      cwd: this.cwd,
      service: this,
    });

    this.plugins = this.resolvePlugins();
  }

  private applyPlugins(key: string, opts: any) {

  }

  private resolvePlugins() {
    try {
      return getPlugins({
        cwd: this.cwd,
      });
    } catch (error) {
      
    }
  }

  private initPlugins() {
    const plugins = cloneDeep(this.plugins);
    this.plugins = [];

    plugins.forEach((plugin: any) => {
      this.initPlugin(plugin);
    });
  }

  private initPlugin(plugin: any) {
    console.log(plugin);
  }

  private init() {
    this.initPlugins();
  }

  public run(name: string = 'help', args: any) {
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
