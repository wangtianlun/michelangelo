import { existsSync } from 'fs';
import { join } from 'path';
import extend from 'michelangelo-utils/lib/extend';

interface IOpts {
  cwd?: string;
  defaultConfig?: any;
  onError?: Function;
}

export function getConfigFile(cwd: any) {
  const files = ['config/config.js'];
  const validFiles = files.filter(f => existsSync(join(cwd, f)));

  if (validFiles[0]) {
    return join(cwd, validFiles[0]);
  }
}

export function getConfigByConfigFile(configFile: string, opts: IOpts = {}) {
  const isDev = process.env.NODE_ENV === 'development';
  const { defaultConfig } = opts;

  const configs = [
    defaultConfig,

  ];
}

export default function(opts: IOpts = {}) {
  const { cwd, defaultConfig } = opts;
  const absConfigFile = getConfigFile(cwd);

  if (absConfigFile) {
    return getConfigByConfigFile(absConfigFile, {
      defaultConfig
    });
  }
}