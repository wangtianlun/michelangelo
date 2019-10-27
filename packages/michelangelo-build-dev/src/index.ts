import { join } from 'path';
import { cloneDeep } from 'lodash';
import UserConfig from './userconfig';
import PluginAPI from './pluginAPI';
import getPlugins from './getPlugins';
import registerBabel from './registerBabel';
import getPaths from './getPaths';

const debug = require('debug')('michelangelo-build-dev');

export default class Service {
  private commands = {};
  private pluginHooks = {};
  private plugins: any = [];
  private pluginMethods: any = {};
  private config: any = {};
  private cwd: any;
  private pkg: any;
  constructor({ cwd }: any) {
    this.cwd = cwd;

    try {
      this.pkg = require(join(this.cwd, 'package.json'));
      console.log(this.pkg);
    } catch(ex) {
      this.pkg = {};
    }

    registerBabel({
      cwd: this.cwd,
    });

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
      this.plugins.push(plugin);
    });
  }

  private initPlugin(plugin: any) {
    const { id, apply, opts } = plugin;

    try {
      const api: any = new Proxy(new PluginAPI(id, this), {
        get: (target, prop) => {

        }
      });
      api.onOptionChange = (fn: any) => {

      }

      apply(api);
      plugin._api = api;
    } catch (error) {
      
    }
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
