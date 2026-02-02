import { rules } from './rules';
import fs from 'fs';

const pkg: { name: string; version: string } = JSON.parse(fs.readFileSync(new URL('../package.json'), 'utf8'));

const meta = {
  name: pkg.name,
  version: pkg.version,
};

export { rules, meta };
