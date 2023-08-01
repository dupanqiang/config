/*
 * @author: zhao yongfei
 * @Date: 2023-01-09 13:54:56
 * @description: 
 * @LastEditTime: 2023-08-01 20:40:12
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
// import SplitScreen from "@/components/SplitScreen.vue";;
// import ButtonGroup from "@/components/ButtonGroup.vue";
// import CommonDialog from "@/components/CommonDialog.vue";
// // import CellOperation from "@/components/CellOperation.vue"
// import CellItemEdit from "@/components/CellItemEdit.vue"
import Form from "@/components/form"
import UploadComp from "@/components/uploadComp"
import EleTable from "@/components/eleTable";
import AgTable from "@/components/agTable";
// import Descriptions from "@/components/Descriptions.vue"
interface Option {
  store: any;
  baseUrl: string;
  useI18n?: Function
}
// const components = [
//   SplitScreen,
//   Form,
//   ButtonGroup,
//   AgTable,
//   CommonDialog,
//   // CellOperation,
//   CellItemEdit,
//   Descriptions
// ]
export default (App, option: Option) => {
  ['state', 'getters', '_actions'].forEach(key => {
    Object.keys(store[key]).forEach(k => {
      option.store[key][k] = store[key][k]
    })
  })
  option.store.state._BASE_URL = option.baseUrl
  store.commit('saveUrl', option.baseUrl)
  store.commit('saveState', option.store)
  store.commit('useI18n', option.useI18n)
  // components.map(component => {
  //   App.component(component.name, component)
  // })
  install(App)
  App.component("DfsPageConfig", Page);
}

export {
  // SplitScreen,
  // ButtonGroup,
  // CommonDialog,
  // // CellOperation,
  // CellItemEdit,
  Form,
  AgTable,
  EleTable,
  UploadComp
}
