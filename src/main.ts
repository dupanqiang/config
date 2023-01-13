/*
 * @author: zhao yongfei
 * @Date: 2023-01-09 11:53:20
 * @description: 
 * @LastEditTime: 2023-01-13 17:45:10
 * @LastEditors: zhao yongfei
 * @FilePath: /dfs-page-config/src/main.ts
 */
import 'element-plus/dist/index.css'
// import '@/common/css/global.less';
import { createApp } from 'vue';
import install from './components/index'
import App from '@/App.vue'
import store from "@/store";
console.log(store)

const app = createApp(App);
install(app)
app.use(store)
.mount('#app');
