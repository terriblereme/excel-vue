'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var get = require('lodash/get');
var en = require('../../locale/lang/en.js');
var props = require('../../utils/props.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var get__default = /*#__PURE__*/_interopDefaultLegacy(get);

const useLocaleProps = props.buildProps({
  locale: {
    type: props.definePropType(Object)
  }
});
const localeContextKey = Symbol("localeContextKey");
let cache;
const provideLocale = () => {
  const vm = vue.getCurrentInstance();
  const props = vm.props;
  const locale = vue.computed(() => props.locale || en["default"]);
  const lang = vue.computed(() => locale.value.name);
  const t = buildTranslator(locale);
  const provides = {
    locale,
    lang,
    t
  };
  cache = provides;
  vue.provide(localeContextKey, provides);
};
const buildTranslator = (locale) => (path, option) => translate(path, option, vue.unref(locale));
const translate = (path, option, locale) => get__default["default"](locale, path, path).replace(/\{(\w+)\}/g, (_, key) => {
  var _a;
  return `${(_a = option == null ? void 0 : option[key]) != null ? _a : `{${key}}`}`;
});
const localeProviderMaker = (locale = en["default"]) => {
  const lang = vue.ref(locale.name);
  const localeRef = vue.ref(locale);
  return {
    lang,
    locale: localeRef,
    t: buildTranslator(localeRef)
  };
};
const useLocale = () => {
  return vue.inject(localeContextKey, cache || localeProviderMaker(en["default"]));
};

exports.buildTranslator = buildTranslator;
exports.localeContextKey = localeContextKey;
exports.localeProviderMaker = localeProviderMaker;
exports.provideLocale = provideLocale;
exports.translate = translate;
exports.useLocale = useLocale;
exports.useLocaleProps = useLocaleProps;
//# sourceMappingURL=index.js.map
