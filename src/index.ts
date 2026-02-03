import { rules } from './rules';
import pkg from '../package.json';
import { ESLint } from 'eslint';
import { RuleModule } from '@typescript-eslint/utils/ts-eslint';
import { EnforcePropsRuleOptions } from './rules/enforce-props-rule-options.type';

type RuleKey = keyof typeof rules;

interface Plugin extends Omit<ESLint.Plugin, 'rules'> {
  rules: Record<RuleKey, RuleModule<string, EnforcePropsRuleOptions>>;
}
const plugin: Plugin = {
  meta: {
    name: pkg.name,
    version: pkg.version,
    namespace: 'react-native-enforce-props',
  },
  rules,
};

export { rules };

export default plugin;
