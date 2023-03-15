import '../../../hooks/index.mjs';
import { buildProps, definePropType } from '../../../utils/props.mjs';
import { useLocaleProps } from '../../../hooks/use-locale/index.mjs';

const configProviderProps = buildProps({
  ...useLocaleProps,
  size: {
    type: String,
    values: ["large", "medium", "small", "mini"]
  },
  button: {
    type: definePropType(Object)
  }
});

export { configProviderProps };
//# sourceMappingURL=config-provider.mjs.map
