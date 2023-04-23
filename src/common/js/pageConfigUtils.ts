/*
 * @Author: zhaoyongfei
 * @Date: 2021-09-01 16:54:13
 * @LastEditTime: 2023-04-23 20:10:33
 * @LastEditors: zhao yongfei
 * @Description: In User Settings Edit
 * @FilePath: /dfs-page-config/src/common/js/pageConfigUtils.ts
 * 
 * @param { string } pageKey 页面状态管理键名（全局唯一）
 * @param { object } components 页面配置组件
 * @param { object } dialogs 弹窗组件
 * @param { object } store 状态管理store
 */
import { formatDate } from "@/utils";
import service from "@/utils/service";
  // 初始化
  const initPage = (configData: any, store: any) => {
    store.dispatch("_INIT_PAGE", {
      pageKey: configData.pageKey,
      components: configData.components,
      dialogRef: configData.dialogRef
    })
  }
  // const initPage = (configData: any, store: any) => {
  //   let components = []
  //   configData.components.forEach((copm:any) => {
  //     if (copm.type === 'SplitScreen') {
  //       if (copm.topComponents && copm.downComponents) {
  //         components = copm.topComponents.concat(copm.downComponents)
  //       } else {
  //         components = configData.components
  //       }
  //     }
  //   })
  //   store.dispatch("_INIT_PAGE", {
  //     pageKey: configData.pageKey,
  //     components: components
  //   })
  // }
  
  // form查询
  const queryData = (store: any, pageKey: string, target: string) => {
    store.dispatch("_QUERY_LIST", { pageKey: pageKey, target: target })
  }
  
  // 获取目标对象
  let component:any = {}
  function getTargetComp({ getters }: any, pageKey: string, comKey: string) {
    component = {}
    const _GET_CONFIG_DATA = getters._GET_CONFIG_DATA;
    if (!_GET_CONFIG_DATA(pageKey)) return {};
    const components = _GET_CONFIG_DATA(pageKey);
    getComp(components, comKey)
    if (!component.type) {
      throw new Error(`没有找到key为'${comKey}'的组件，请检查是否已定义`)
    }
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
    const components = {}
    relation.forEach(key => {
      const comp = getTargetComp(store, pageKey, key);
      components[key] = comp
    })
    return components
  }
  // 获取下拉框数据
  let obj:any = {}
  function getSelectOption(state: any, item: any ) {
    const dataKey = item.url + (item.dataKey ? '-' + item.dataKey : '')
    if (state[dataKey] && !item.noCache) {
      item.options = state[dataKey];
    } else {
      if (obj[item.url]) {
        obj[item.url].push(item)
        return
      } else {
        obj[item.url] = [item]
      }
      let paramsKey = item.method == "POST" ? "data" : "params"
      const params = typeof item.params === 'function' ? item.params() : item.params
      let base_url = state._BASE_URL
      if (item.service === 'c2') base_url = base_url.replace('c1', 'c2')
      service({
        url: base_url + item.url,
        [paramsKey]: params || {},
        method: item.method || "GET"
      })
      .then((res: any) => {
        const result = res[item.dataKey] || res.items || res
        state[dataKey] = result;
        const dataObj = obj[item.url]
        if (dataObj) {
          dataObj.forEach(item => {
            item.options = res[item.dataKey] || result
          })
          delete obj[item.url]
        }
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
        data[item.prop] = formData[item.prop]+'' === '0' ? 0 : (formData[item.prop] || null);
      } else {
        data[item.prop] = item.value || null;
      }
      // 处理时间
      if (item.type === "Daterange" || item.type === "DateTimerange") {
        if (!data[item.prop]) {
          data[item.startTime] = null;
          data[item.endTime] = null;
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
    getTargetComp,
    getSelectOption,
    getFormData,
    getRelationComp
  }
  