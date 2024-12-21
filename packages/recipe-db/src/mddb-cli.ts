import { createRequire } from 'node:module';
import * as path from 'node:path';

const require = createRequire(import.meta.url);

const mddbPackageRoot = path.dirname(require.resolve('mddb/package.json'));
const mddbPackageJson = require(path.join(mddbPackageRoot, 'package.json'));
const mddbBinPath = path.join(mddbPackageRoot, mddbPackageJson.bin.mddb);

export { mddbBinPath };
