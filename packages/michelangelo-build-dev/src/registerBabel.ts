import { join, isAbsolute } from 'path';
import { uniq } from 'lodash';
import { winPath } from 'michelangelo-utils';
import { getConfigPaths } from 'michelangelo-core/lib/getUserConfig';

let files: any = [];

function initFiles(cwd: any) {
  files = uniq(files.concat(getConfigPaths(cwd)));
}

export default function({ cwd }: any) {
  initFiles(cwd);

  const only = files.map((f: string) => {
    const fullPath = isAbsolute(f) ? f : join(cwd, f);

    console.log(fullPath);
  });
}