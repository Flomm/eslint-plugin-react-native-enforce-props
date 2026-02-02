import { rules } from './rules';

const { name, version } = require('../package.json') as typeof import('../package.json');

const meta = {
  name,
  version,
  namespace: 'react-native-enforce-props',
};

export { rules, meta };
