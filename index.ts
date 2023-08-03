/*
 * @author: zhao yongfei
 * @Date: 2023-01-09 13:54:56
 * @description: 
 * @LastEditTime: 2023-08-03 11:57:26
 * @LastEditors: zhao yongfei
 * @FilePath: /dfs-page-config/index.ts
 */
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import '@/common/css/aggrid.less';
import '@/common/css/global.less';
import install from '@/components/index'
import store from "@/store";
import Page from "@/components/Page.vue";
import Form from "@/components/form"
import UploadComp from "@/components/uploadComp"
import EleTable from "@/components/eleTable";
import AgTable from "@/components/agTable";
interface Option {
  store: any;
  baseUrl: string;
  useI18n?: Function;
  locale?: string
}
export default (App, option: Option) => {
  ['getters', '_actions'].forEach(key => {
    Object.keys(store[key]).forEach(k => {
      option.store[key][k] = store[key][k]
    })
  });
  store.commit('saveUrl', option.baseUrl);
  store.commit('saveLocale', option.locale);
  option.store.state._CONFIG_DATA = store.state._CONFIG_DATA;
  option.store.state._BASE_URL = option.baseUrl;
  (store as any)._mutations.setLoading = option.store._mutations.setLoading;
  install(App);
  App.component("DfsPageConfig", Page);
  const useI18n = () => {
    return {
      t: (str) => str
    }
  };
  App.config.globalProperties.useI18n = option.useI18n || useI18n
}

export {
  Form,
  AgTable,
  EleTable,
  UploadComp
}
