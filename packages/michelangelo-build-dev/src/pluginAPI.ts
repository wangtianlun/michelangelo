export default class PluginAPI {
  private id: string;
  private service: any;
  private API_TYPE: any;
  constructor(id: string, service: any) {
    this.id = id;
    this.service = service;

    this.API_TYPE = {
      ADD: Symbol('add'),
      MODIFY: Symbol('modify'),
      EVENT: Symbol('event')
    }
    this.addMethods();
  }

  private addMethods() {
    [
      'onStart',
      'onStartAsync',
      'onRouteChange'
    ].forEach(method => {
      let type = this.API_TYPE.ADD;

      this.registerMethod(method, { type })
    });
  }

  private registerMethod(methodName: string, opts: any) {
    const { type, apply } = opts;

    this.service.pluginMethods[methodName] = (...args: any) => {
      this.register(methodName, (opts: any) => {
        return args[0]();
      });
    }
  }

  private register(hook: any, fn: any) {
    const { pluginHooks } = this.service;
    pluginHooks[hook] = pluginHooks[hook] || [];
    pluginHooks[hook].push({
      fn
    });
  }
}