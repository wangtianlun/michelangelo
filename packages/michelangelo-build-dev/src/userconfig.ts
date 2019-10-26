import getUserConfig from 'michelangelo-core/lib/getUserConfig';

class UserConfig {
  static getConfig(opts: any = {}) {
    const { cwd, service } = opts;
    return getUserConfig({
      cwd,
      defaultConfig: service.applyPlugins('modifyDefaultConfig', {
        initialValue: {},
      })
    });
  }
}

export default UserConfig;
