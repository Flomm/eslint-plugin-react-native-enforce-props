import { RulePresets } from './presets';

export type EnforcePropsRuleOptions = {
  componentsToCheck?: string[];
  propsToCheck?: string[];
  preset?: keyof typeof RulePresets;
};

export type EnforceableOptions = Omit<Required<EnforcePropsRuleOptions>, 'preset'>;
