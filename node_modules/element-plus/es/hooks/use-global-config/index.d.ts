import type { Ref } from 'vue';
import type { ConfigProviderContext } from 'element-plus/es/tokens';
export declare function useGlobalConfig<K extends keyof ConfigProviderContext>(key: K): Ref<ConfigProviderContext[K]>;
export declare function useGlobalConfig(): ConfigProviderContext;
