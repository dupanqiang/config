/*
 * @author: zhao yongfei
 * @Date: 2023-01-09 13:54:56
 * @description: 
 * @LastEditTime: 2023-01-12 18:07:08
 * @LastEditors: zhao yongfei
 * @FilePath: /dfs-page-config/index.ts
 */
// import '@/common/css/global.less';
import Page from "@/components/Page.vue";

export default function (App, {store}) {
  App.use(store)
  // .use(ElementPlus, { locale: localeZh, size: 'mini'})
  App.component("DfsPageConfig", Page);
}