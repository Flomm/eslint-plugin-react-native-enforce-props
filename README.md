# eslint-plugin-react-native-enforce-props

📝 Enforce a specific set of props on specific elements.

## Setup

### Pre-Requisites

Before starting, make sure you have ESLint as a `devDependency` of your project.

### Installation

Next, install `eslint-plugin-react-native-enforce-props`:

```sh
npm install eslint-plugin-react-native-enforce-props --save-dev

# or

yarn add eslint-plugin-react-native-enforce-props --dev
```

## Usage

Import the plugin in your eslint config, add it to the plugins section and set the rules you want to use:
```
const enforceProps = require('../eslint-plugin-react-native-enforce-props/dist/index');

module.exports = tsEslint.config(
  { ignores: ['babel.config.js', '*.jpg', 'index.js'] },
  {
    ...other options...
    plugins: {
        ...other plugins...
      'react-native-enforce-props': enforceProps,
    },
    rules: {
       ...other rules...
      'react-native-enforce-props/enforce-props': [
        'error',
        {
          propsToCheck: ['onPress'],
          componentsToCheck: ['TouchableOpacity'],
        },
      ],
    }
  },
);
```



## Supported Rules

The plugin provides the following rules:
<!-- begin auto-generated rules list -->

| Name                                         | Description                                          |
| :------------------------------------------- | :--------------------------------------------------- |
| [enforce-props](docs/rules/enforce-props.md) | Enforce a specific set of props on specific elements |

<!-- end auto-generated rules list -->

## License
eslint-plugin-react-native-enforce-props is licensed under the [MIT License](LICENSE.md).

### Maintenance Status: Active
