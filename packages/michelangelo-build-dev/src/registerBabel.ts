import { join, isAbsolute } from 'path';
import { existsSync } from 'fs';
import { uniq } from 'lodash';
import { winPath } from 'michelangelo-utils';
import registerBabel from 'af-webpack/lib/registerBabel';
import { getConfigPaths } from 'michelangelo-core/lib/getUserConfig';

let files: any = [];

function initFiles(cwd: any) {
  files = uniq(files.concat(getConfigPaths(cwd)));
}

export default function({ cwd }: any) {
  initFiles(cwd);

  const only = files.map((f: string) => {
    const fullPath = isAbsolute(f) ? f : join(cwd, f);
    return winPath(fullPath);
  });

  let absSrcPath = join(cwd, 'src');
  if (!existsSync(absSrcPath)) {
    absSrcPath = cwd;
  }


}