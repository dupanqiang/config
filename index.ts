/*
 * @author: zhao yongfei
 * @Date: 2023-01-09 13:54:56
 * @description: 
 * @LastEditTime: 2023-01-13 20:42:36
 * @LastEditors: zhao yongfei
 * @FilePath: /dfs-page-config/index.ts
 */
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import '@/common/css/aggrid.less';
import install from '@/components/index'
import store from "@/store";
import Page from "@/components/Page.vue";

export default function (App, option) {
  install(App)
  const arr = ['state', 'getters', '_mutations', '_actions']
  arr.forEach(key => {
    Object.keys(store[key]).forEach(k => {
      option.store[key][k] = store[key][k]
    })
  })
  App.component("DfsPageConfig", Page);
}
