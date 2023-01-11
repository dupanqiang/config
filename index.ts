/*
 * @author: zhao yongfei
 * @Date: 2023-01-09 13:54:56
 * @description: 
 * @LastEditTime: 2023-01-10 15:30:29
 * @LastEditors: zhao yongfei
 * @FilePath: /dfs-page-config/index.ts
 */
// import '@/common/css/global.less';
import store from "@/store";
import Page from "@/components/Page.vue";

export default function (App) {
  App.use(store)
  // .use(ElementPlus, { locale: localeZh, size: 'mini'})
  App.component("DfsPageConfig", Page);
}