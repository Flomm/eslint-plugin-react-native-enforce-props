import { ESLintUtils } from '@typescript-eslint/utils';
import { defaultComponents } from './default-components';

export const createRule = ESLintUtils.RuleCreator(name => 'Flomm');

type Options = [
  {
    disableDefaultComponents?: string[];
    enableComponents?: string[];
  }?,
];

type MessageIds = 'missingTestId';

export const enforceProps = createRule<Options, MessageIds>({
  name: 'enforce-props',
  meta: {
    docs: {
      description: 'Enforce a specific set of props on specific elements',
    },
    type: 'suggestion',
    messages: {
      missingTestId: "Missing 'testID' attribute in {{component}} component.",
    },
    schema: [],
  },
  defaultOptions: [],
  create: context => {
    const options = context.options[0] || {};
    const { disableDefaultComponents = [], enableComponents = [] } = options;

    return {
      JSXOpeningElement({ name, attributes }) {
        if (name.type !== 'JSXIdentifier') {
          return;
        }

        const componentName = name.name;

        const filteredDefaultComponents = defaultComponents.filter(
          component => !disableDefaultComponents.includes(component),
        );
        const mergedAllowedComponents = [...filteredDefaultComponents, ...enableComponents];
        if (mergedAllowedComponents.includes(componentName)) {
          const hasTestIDAttribute = attributes.some(
            attribute => attribute.type === 'JSXAttribute' && attribute.name.name === 'testID',
          );

          if (!hasTestIDAttribute) {
            context.report({
              node: name,
              messageId: 'missingTestId',
              data: {
                component: componentName,
              },
            });
          }
        }
      },
    };
  },
});
