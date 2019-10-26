export default function(opts: any) {
  const { cwd } = opts;

  const builtInPlugins = [
    './plugins/404'
  ];

  const pluginsObj = [
    ...builtInPlugins.map(p => {
      let opts;
      const apply = require(p);

      return {
        id: p.replace(/^.\//, 'built-in:'),
        apply: apply.default || apply,
        opts,
      }
    })
  ];

  return pluginsObj;
}