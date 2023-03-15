'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../hooks/index.js');
var props = require('../../../utils/props.js');
var index = require('../../../hooks/use-locale/index.js');

const configProviderProps = props.buildProps({
  ...index.useLocaleProps,
  size: {
    type: String,
    values: ["large", "medium", "small", "mini"]
  },
  button: {
    type: props.definePropType(Object)
  }
});

exports.configProviderProps = configProviderProps;
//# sourceMappingURL=config-provider.js.map
