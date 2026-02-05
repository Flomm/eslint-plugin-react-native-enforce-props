import { EnforceableOptions } from './enforce-props-rule-options.type';

export const RulePresets: Record<string, EnforceableOptions> = {
  testID: {
    componentsToCheck: ['TouchableOpacity', 'TouchableHighlight', 'TouchableNativeFeedback', 'Pressable'],
    propsToCheck: ['testID'],
  },
};
