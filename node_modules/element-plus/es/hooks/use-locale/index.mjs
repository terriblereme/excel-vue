import { getCurrentInstance, computed, provide, unref, ref, inject } from 'vue';
import get from 'lodash/get';
import English from '../../locale/lang/en.mjs';
import { buildProps, definePropType } from '../../utils/props.mjs';

const useLocaleProps = buildProps({
  locale: {
    type: definePropType(Object)
  }
});
const localeContextKey = Symbol("localeContextKey");
let cache;
const provideLocale = () => {
  const vm = getCurrentInstance();
  const props = vm.props;
  const locale = computed(() => props.locale || English);
  const lang = computed(() => locale.value.name);
  const t = buildTranslator(locale);
  const provides = {
    locale,
    lang,
    t
  };
  cache = provides;
  provide(localeContextKey, provides);
};
const buildTranslator = (locale) => (path, option) => translate(path, option, unref(locale));
const translate = (path, option, locale) => get(locale, path, path).replace(/\{(\w+)\}/g, (_, key) => {
  var _a;
  return `${(_a = option == null ? void 0 : option[key]) != null ? _a : `{${key}}`}`;
});
const localeProviderMaker = (locale = English) => {
  const lang = ref(locale.name);
  const localeRef = ref(locale);
  return {
    lang,
    locale: localeRef,
    t: buildTranslator(localeRef)
  };
};
const useLocale = () => {
  return inject(localeContextKey, cache || localeProviderMaker(English));
};

export { buildTranslator, localeContextKey, localeProviderMaker, provideLocale, translate, useLocale, useLocaleProps };
//# sourceMappingURL=index.mjs.map
