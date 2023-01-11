/*
 * @author: zhao yongfei
 * @Date: 2023-01-09 11:53:20
 * @description: 
 * @LastEditTime: 2023-01-11 16:41:03
 * @LastEditors: zhao yongfei
 * @FilePath: /dfs-page-config/src/main.ts
 */
import 'element-plus/dist/index.css'
// import '@/common/css/global.less';
import { createApp } from 'vue';
import App from '@/App.vue'
import store from "@/store";
import ElementPlus from "element-plus"
import localeZh from 'element-plus/lib/locale/lang/zh-cn'


const app = createApp(App);
app.use(store)
.use(ElementPlus, { locale: localeZh, size: 'mini'})
.mount('#app');
