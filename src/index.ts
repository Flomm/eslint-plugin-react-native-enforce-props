import { RuleModule } from '@typescript-eslint/utils/ts-eslint';
import { ESLint } from 'eslint';
import { rules } from './rules';
import fs from 'fs';

type RuleKey = keyof typeof rules;

const pkg: { name: string; version: string } = JSON.parse(fs.readFileSync(new URL('../package.json'), 'utf8'));

interface Plugin extends Omit<ESLint.Plugin, 'rules'> {
  rules: Record<RuleKey, RuleModule<any, any, any>>;
}

const meta = {
  name: pkg.name,
  version: pkg.version,
};

export { rules, meta };
