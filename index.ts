/*
 * @author: zhao yongfei
 * @Date: 2023-01-09 13:54:56
 * @description: 
 * @LastEditTime: 2023-01-10 11:39:20
 * @LastEditors: zhao yongfei
 * @FilePath: /dfs-page-config/index.ts
 */
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import ElementPlus from "element-plus"
import localeZh from 'element-plus/lib/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import '@/common/css/aggrid.less';
import '@/common/css/global.less';
import store from "@/store";
import Page from "@/components/Page.vue";

export default function (App) {
  App.use(store)
  .use(ElementPlus, { locale: localeZh, size: 'mini'})
  .component("DfsPageConfig", Page);
}