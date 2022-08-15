import { createApp } from "vue";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import locale from 'element-plus/lib/locale/lang/zh-cn' //中文

createApp(App).use(store).use(router).use(ElementPlus, {locale}).mount("#app");
