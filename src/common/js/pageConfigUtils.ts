/*
 * @Author: zhaoyongfei
 * @Date: 2021-09-01 16:54:13
 * @LastEditTime: 2023-01-13 20:24:42
 * @LastEditors: zhao yongfei
 * @Description: In User Settings Edit
 * @FilePath: /dfs-page-config/src/common/js/pageConfigUtils.ts
 * 
 * @param { string } pageKey 页面状态管理键名（全局唯一）
 * @param { object } configData 页面配置数据
 * @param { object } store 状态管理store
 */
import { formatDate } from "@/utils";
import service from "@/utils/service";
  // 初始化
  const initPage = (configData: any, store: any) => {
    store.dispatch("init", {
      pageKey: configData.pageKey,
      components: configData.components
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
  let component:any = {}
  function getTargetComp({ getters }: any, pageKey: string, comKey: string) {
    component = {}
    const getPageConfigData = getters.getPageConfigData;
    if (!getPageConfigData(pageKey)) return {};
    const components = getPageConfigData(pageKey);
    getComp(components, comKey)
    return component
  }
  function getComp(components, comKey) {
    for (let i = 0; i < components.length; i++) {
      if (components[i].children) getComp(components[i].children, comKey)
      if (components[i].key === comKey) component = components[i]
    }
  }
  // 获取依赖对象
  function getRelationComp(store, pageKey: string, relation: string[]) {
    const components = []
    relation.forEach(key => {
      const comp = getTargetComp(store, pageKey, key);
      components[key] = comp
    })
    return components
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
  // 获取form参数
  const getFormData = (formComp: any) => {
    let data: any = {};
    const formData = formComp.formData;
    formComp.elementGroup.forEach((item: any) => {
      // 如果是隐藏的表单，取默认值
      if (
        item.isShow === undefined ||
        item.isShow === true ||
        (item.isShow.prop && formData[item.isShow.prop] == item.isShow.value)
      ) {
        data[item.prop] = formData[item.prop];
      } else {
        data[item.prop] = item.value;
      }
      // 处理时间
      if (item.type === "Daterange" || item.type === "DateTimerange") {
        if (!data[item.prop]) {
          data[item.startTime] = "";
          data[item.endTime] = "";
        } else {
          data[item.startTime] = formatDate(
            data[item.prop][0],
            item.type === "Daterange" ? "yyyy-MM-dd" : "yyyy-MM-dd HH:mm:ss"
          );
          data[item.endTime] = formatDate(
            data[item.prop][1],
            item.type === "Daterange" ? "yyyy-MM-dd" : "yyyy-MM-dd HH:mm:ss"
          );
        }
        delete data[item.prop];
      }
    });
    return data;
  }
  export {
    initPage,
    queryData,
    tableQuery,
    getTargetComp,
    getSelectOption,
    getFormData,
    getRelationComp
  }
  