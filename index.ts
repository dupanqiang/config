/*
 * @author: zhao yongfei
 * @Date: 2023-01-09 13:54:56
 * @description: 
 * @LastEditTime: 2023-02-03 14:24:15
 * @LastEditors: zhao yongfei
 * @FilePath: /dfs-page-config/index.ts
 */
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import '@/common/css/aggrid.less';
// import install from '@/components/index'
import store from "@/store";
import Page from "@/components/Page.vue";
import SplitScreen from "@/components/SplitScreen.vue";
import Form from "@/components/Form.vue";
import ButtonGroup from "@/components/ButtonGroup.vue";
import AgTable from "@/components/AgTable.vue";
import CommonDialog from "@/components/CommonDialog.vue";
// import CellOperation from "@/components/CellOperation.vue"
import CellItemEdit from "@/components/CellItemEdit.vue"
import EleTable from "@/components/eleTable";
interface Option {
  store: any;
  baseUrl: string
}
const components = [
  SplitScreen,
  Form,
  ButtonGroup,
  AgTable,
  CommonDialog,
  // CellOperation,
  CellItemEdit,
]
export default (App, option: Option) => {
  const arr = ['state', 'getters', '_actions']
  arr.forEach(key => {
    Object.keys(store[key]).forEach(k => {
      option.store[key][k] = store[key][k]
    })
  })
  option.store.state._BASE_URL = option.baseUrl
  store.commit('saveUrl', option.baseUrl)
  components.map(component => {
    App.component(component.name, component)
  })
  App.component("DfsPageConfig", Page);
}

export {
  SplitScreen,
  Form,
  ButtonGroup,
  AgTable,
  CommonDialog,
  // CellOperation,
  CellItemEdit,
  EleTable
}
