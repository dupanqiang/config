/*
 * @author: zhao yongfei
 * @Date: 2023-01-09 13:54:56
 * @description: 
 * @LastEditTime: 2023-01-14 13:51:16
 * @LastEditors: zhao yongfei
 * @FilePath: /dfs-page-config/index.ts
 */
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import '@/common/css/aggrid.less';
import install from '@/components/index'
import store from "@/store";
import Page from "@/components/Page.vue";
interface Option {
  store: any;
  baseUrl: string
}
export default function (App, option: Option) {
  install(App)
  const arr = ['state', 'getters', '_actions']
  arr.forEach(key => {
    Object.keys(store[key]).forEach(k => {
      option.store[key][k] = store[key][k]
    })
  })
  option.store.state._BASE_URL = option.baseUrl
  store.commit('saveUrl', option.baseUrl)
  App.component("DfsPageConfig", Page);
}
