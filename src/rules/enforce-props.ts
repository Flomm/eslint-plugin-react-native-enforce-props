import { ESLintUtils } from '@typescript-eslint/utils';
import { EnforceableOptions, EnforcePropsRuleOptions } from './enforce-props-rule-options.type';
import { RulePresets } from './presets';

const createRule = ESLintUtils.RuleCreator(name => name);

type MessageIds = 'missingProp';

const checkProperty = (value: string[], type: keyof EnforceableOptions) => {
  if (value.length < 1) {
    throw new Error(
      `eslint-plugin-react-native-enforce-props - At least one element must be specified in the '${type}' option!`,
    );
  }
};

const createDataToCheck = ({
  preset,
  componentsToCheck = [],
  propsToCheck = [],
}: EnforcePropsRuleOptions): EnforceableOptions => {
  if (preset) {
    return RulePresets[preset];
  }
  checkProperty(componentsToCheck, 'componentsToCheck');
  checkProperty(propsToCheck, 'propsToCheck');
  return {
    componentsToCheck,
    propsToCheck,
  };
};

export const enforceProps = createRule<[EnforcePropsRuleOptions?], MessageIds>({
  name: 'enforce-props',
  meta: {
    docs: {
      description: 'Enforce a specific set of props on specific elements',
    },
    type: 'suggestion',
    messages: {
      missingProp: 'Missing {{prop}} prop on {{componentName}} component.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          preset: { type: 'string' },
          componentsToCheck: {
            type: 'array',
            items: { type: 'string' },
            description:
              'The rule will check these components. Defaults to [ TouchableOpacity, TouchableHighlight, TouchableNativeFeedback, Pressable]',
          },
          propsToCheck: {
            type: 'array',
            items: { type: 'string' },
            description: 'These are the enforced props. Example: ["testID", "onPress"]. Required.',
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [],
  create: context => {
    const options = context.options[0] || {};
    const { preset } = options;

    if (preset !== undefined && !(preset in RulePresets)) {
      throw new Error('eslint-plugin-react-native-enforce-props - Invalid `preset` option! Accepted values: `testID`');
    }

    const { componentsToCheck, propsToCheck } = createDataToCheck(options);

    return {
      JSXOpeningElement({ name, attributes }) {
        if (name.type !== 'JSXIdentifier') {
          return;
        }

        const componentName = name.name;

        if (!componentsToCheck.includes(componentName)) {
          return;
        }

        propsToCheck.forEach(prop => {
          const hasProp = attributes.some(
            attribute => attribute.type === 'JSXAttribute' && attribute.name.name === prop,
          );

          if (!hasProp) {
            context.report({
              node: name,
              messageId: 'missingProp',
              data: {
                prop,
                componentName,
              },
            });
          }
        });
      },
    };
  },
});
