import { ESLintUtils } from '@typescript-eslint/utils';
import { defaultComponentsToCheck } from './default-components-to-check';

export const createRule = ESLintUtils.RuleCreator(name => 'Flomm');

type Options = [
  {
    componentsToCheck?: string[];
    propsToCheck?: string[];
  }?,
];

type MessageIds = 'missingProp';

export const enforceProps = createRule<Options, MessageIds>({
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
          componentsToCheck: {
            type: 'array',
            items: { type: 'string' },
          },
          propsToCheck: {
            type: 'array',
            items: { type: 'string' },
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [],
  create: context => {
    const options = context.options[0] || {};
    const { componentsToCheck = defaultComponentsToCheck, propsToCheck = [] } = options;

    if (propsToCheck.length < 1) {
      throw new Error(
        'eslint-plugin-react-native-enforce-props - At least one prop must be specified with the `propsToCheck` option!',
      );
    }

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
