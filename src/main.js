import {createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import store from './store'
import AOS from "aos";
import "aos/dist/aos.css";
import * as Icons from '@element-plus/icons-vue'
import Vant from "vant"
import "vant/lib/index.css"
import {hasPermission} from "@/utils/auth"
import consts from "@/utils/consts"
import Print from 'vue3-print-nb';
//import Print from 'print-js';



AOS.init();
const app =createApp(App);
//挂载全局方法
app.config.globalProperties.hasPermission = hasPermission;
app.config.globalProperties.$consts = consts;
app.use(store).use(router).use(ElementPlus,{ locale: zhCn,}).use(Vant).mount('#app');
// 注册全局组件
app.use(Print);
for(let iconName in Icons){
  app.component(iconName,Icons[iconName])
}
window.addEventListener('unhandledrejection', function browserRejectionHandler(event) { // 禁用Promise reject输出控制台
  event && event.preventDefault()
})