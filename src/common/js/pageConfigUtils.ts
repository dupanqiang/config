/*
 * @Author: zhaoyongfei
 * @Date: 2021-09-01 16:54:13
 * @LastEditTime: 2022-08-11 20:37:09
 * @LastEditors: zhao yongfei
 * @Description: In User Settings Edit
 * @FilePath: /dfs-page-vue/src/common/js/pageConfig.ts
 * 
 * @param { string } pageKey 页面状态管理键名（全局唯一）
 * @param { object } configData 页面配置数据
 * @param { object } store 状态管理store
 */
import service from "@/utils/service";
  // 初始化
  const initPage = (configData: any, store: any) => {
    let components = configData.components;
    if (configData.splitScreen && configData.downComponents) {
      components = components.concat(configData.downComponents)
    }
   
    store.dispatch("init", {
      pageKey: configData.pageKey,
      components: components
    })
  }
  
  // form查询
  const queryData = (pageKey: string, store: any) => {
    const components = store.getters['getPageConfigData'](pageKey).components;
    let formComp = null;
    for (let i = 0; i < components.length; i++) {
      if (components[i].widget === "searchForm") {
        formComp = components[i];
      }
    }
    
    store.dispatch("queryList", { formComp: formComp, pageKey: pageKey })
  }
  // table查询
  const tableQuery = (store: any, pageKey: string, target: string) => {
    const tableComp = getTargetComp(store, pageKey, target);
    store.dispatch("tableQuery", {tableComp: tableComp});
  }
  
  // 获取目标对象
  function getTargetComp({ getters }: any, pageKey: string, target: string) {
    const getPageConfigData = getters['getPageConfigData'] || getters.getPageConfigData;
    if (!getPageConfigData(pageKey)) return {};
    const components = getPageConfigData(pageKey).components;
    for (let i = 0; i < components.length; i++) {
      if (components[i].key === target) {
        return components[i];
      }
    }
    return {}
  }
  // 获取下拉框数据
  function getSelectOption(state: any, item: any ) {
    if (state[item.url]) {
      item.options = state[item.url];
    } else {
      let paramsKey = item.method == "POST" ? "data" : "params"
      service({
        url: state.baseUrl + item.url,
        [paramsKey]: item.params || {},
        method: item.method || "GET"
      })
      .then((res: any) => {
        const result = res.items || res.list || res.detail || res
        item.options = result;
        if (!item.noCache) state[item.url] = result;
      })
    }
  }
    
  export {
    initPage,
    queryData,
    tableQuery,
    getTargetComp,
    getSelectOption
  }
  