import { RuleTester } from '@typescript-eslint/rule-tester';
import tsParser from '@typescript-eslint/parser';
import { enforceProps } from '../../rules/enforce-props';

const ruleTester = new RuleTester({
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      projectService: {
        allowDefaultProject: ['*.ts*'],
      },
    },
  },
});

describe('enforce-props', () => {
  describe('should work properly when valid', () => {
    ruleTester.run('enforce-props', enforceProps, {
      valid: [
        {
          code: `<View><Image testID="test" /></View>`,
          options: [
            {
              componentsToCheck: ['Image', 'TouchableOpacity'],
              propsToCheck: ['testID'],
            },
          ],
        },
        {
          code: `<View><TouchableOpacity testID="test" /></View>`,
          options: [
            {
              componentsToCheck: ['Image', 'TouchableOpacity'],
              propsToCheck: ['testID'],
            },
          ],
        },
      ],
      invalid: [],
    });
  });

  describe('should work properly when invalid', () => {
    ruleTester.run('enforce-props', enforceProps, {
      valid: [],
      invalid: [
        {
          code: `<View><Image /><TouchableOpacity/></View>`,
          options: [
            {
              componentsToCheck: ['Image'],
              propsToCheck: ['testID'],
            },
          ],
          errors: [
            {
              messageId: 'missingProp',
              data: {
                componentName: 'Image',
                prop: 'testID',
              },
            },
          ],
        },
        {
          code: `<View><Image /><TouchableOpacity testID="test"/></View>`,
          options: [
            {
              componentsToCheck: ['Image', 'TouchableOpacity'],
              propsToCheck: ['onPress', 'testID'],
            },
          ],
          errors: [
            {
              messageId: 'missingProp',
              data: {
                componentName: 'Image',
                prop: 'onPress',
              },
            },
            {
              messageId: 'missingProp',
              data: {
                componentName: 'Image',
                prop: 'testID',
              },
            },
            {
              messageId: 'missingProp',
              data: {
                componentName: 'TouchableOpacity',
                prop: 'onPress',
              },
            },
          ],
        },
      ],
    });
  });
});
