'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
require('../../tokens/index.js');
var configProvider = require('../../tokens/config-provider.js');

function useGlobalConfig(key) {
  const config = vue.inject(configProvider.configProviderContextKey, {});
  if (key) {
    return vue.toRef(config, key);
  } else {
    return config;
  }
}

exports.useGlobalConfig = useGlobalConfig;
//# sourceMappingURL=index.js.map
