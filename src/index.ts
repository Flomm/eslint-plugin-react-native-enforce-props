import { rules } from './rules';
import pkg from '../package.json';

const meta = {
  name: pkg.name,
  version: pkg.version,
  namespace: 'react-native-enforce-props',
};

export { rules, meta };
