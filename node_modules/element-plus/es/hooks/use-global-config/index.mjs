import { inject, toRef } from 'vue';
import '../../tokens/index.mjs';
import { configProviderContextKey } from '../../tokens/config-provider.mjs';

function useGlobalConfig(key) {
  const config = inject(configProviderContextKey, {});
  if (key) {
    return toRef(config, key);
  } else {
    return config;
  }
}

export { useGlobalConfig };
//# sourceMappingURL=index.mjs.map
