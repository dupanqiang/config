/*
 * @Author: your name
 * @Date: 2020-12-14 20:49:39
 * @LastEditTime: 2023-01-16 20:06:39
 * @LastEditors: zhao yongfei
 * @Description: In User Settings Edit
 * @FilePath: /dfs-page-config/src/store/index.ts
 */
import { createStore } from "vuex";
import { handleEnter } from "@/utils";
import { getTargetComp, getFormData } from "@/common/js/pageConfigUtils";
import service from "@/utils/service";
// import createPersistedState from "vuex-persistedstate";
export default createStore({
  // plugins: [createPersistedState()],
  state: {
    // 页面配置数据
    _CONFIG_DATA: {},
    _BASE_URL: import.meta.env.VITE_APP_API
  },
  getters: {
    // 获取页面配置数据
    _GET_CONFIG_DATA(state: any) {
      return function (key: string) {
        return state._CONFIG_DATA[key]['components'];
      };
    },
  },
  mutations: {
    saveUrl(state: any, payload: any) {
      state._BASE_URL = payload;
    },
    // 储存页面配置数据
    savaPageConfigData(state: any, payload: any) {
      state._CONFIG_DATA[payload.pageKey] = {
        components: payload.components
      };
      state.dialogRef = payload.dialogRef
    },
    // 储存table数据
    updateRowData(state: any, payload: { tableComp: any; res: any }) {
      if (payload.res) {
        payload.tableComp.data.result = payload.res.result || [];
        payload.tableComp.data.totalNum = payload.res.totalNum || 0;
      } else {
        payload.tableComp.data = [];
        payload.tableComp.data.totalNum = 0;
      }
      // 清除选中数据
      payload.tableComp.selectedRows = [];
    }
  },
  actions: {
    // 初始化入口
    _INIT_PAGE(event: any, configData: any) {
      // 存储配置信息
      event.commit("savaPageConfigData", configData);
      // 初始化配置信息
      initData(event, configData.components, configData.pageKey);
    },
    // 查询
    _QUERY_LIST(event: any, { pageKey, target }) {
      const tableComp:any = getTargetComp(event, pageKey, target);
      event.dispatch("_TABLE_QUERY", { tableComp, pageKey });
    },
    // 查询列表查询
    _TABLE_QUERY(event: any, { tableComp, pageKey, row }: any) {
      if (tableComp.searchBefore) {
        if (tableComp.searchBefore(tableComp, row) === false) {
          return;
        }
      }

      let formData = {}
      let formComp = {}
      if (tableComp.dependencies) {
        formComp = getTargetComp(event, pageKey, tableComp.dependencies);
        formData = getFormData(formComp); // formData查询参数
      }
      const ownParams = getOwnSearchData(tableComp, formComp); // 自身查询参数
      tableComp.formData = { ...formData, ...ownParams }; // 给table添加查询参数

      // event.state.loading = true;
      const params = handleParams(tableComp);
      // 查询
      let paramsKey = tableComp.method == "GET" ? "params" : "data";
      service({
        url: event.state._BASE_URL + tableComp.url,
        [paramsKey]: params || {},
        method: tableComp.method || "POST",
      })
        .then((res: any) => {
          // 统一返回数据字段名
          res = filterRes(res);
          tableComp.searchAfter && tableComp.searchAfter(res);
          event.commit("updateRowData", { tableComp: tableComp, res: res });
        })
        .finally(() => {
          // event.state.loading = false;
        });
    },
  },
});
// 初始化数据
function initData(event: any, components: any[], pageKey: string) {
  components.forEach((comp: any) => {
    if (comp.children) initData(event, comp.children, pageKey)
    if (comp.type == "Form") {
      comp.formData = {};
      // 设置formData对象
      if (comp.elementGroup && comp.elementGroup.length) {
        comp.elementGroup.forEach((item: any) => {
          item.value = item.value ? item.value : null;
          comp.formData[item.prop] = item.value;
        });
      } else {
        comp.elementGroup = [];
      }
    }
    if (comp.type == "AgTable") {
      // 设置默认分页
      if (!comp.pageInfo) {
        comp.pageInfo = { pageNum: 1, currentPage: 1, pageSize: 50 };
      }
      if (comp.initQuery) {
        event.dispatch("_TABLE_QUERY", { pageKey: pageKey, tableComp: comp });
      }
      tableBindFunction(event, comp, pageKey);
    }
  });
}
// table绑定方法
function tableBindFunction(event: any, tableComp: any, pageKey) {
  // 绑定行点击函数
  if (tableComp.configFlag && tableComp.configFlag.isRowClick) {
    const targetTableComp = getTargetComp(event, pageKey, tableComp.target);
    tableComp.onRowClickedFn = (row: any) => {
      event.dispatch("_TABLE_QUERY", {
        pageKey: pageKey,
        tableComp: targetTableComp,
        row: row,
      });
    };
  }
  // 复选框选择
  if (tableComp.configFlag && tableComp.configFlag.checkboxSelection) {
    tableComp.onSelectionChanged = (selectedRows: any[]) => {
      tableComp.selectedRows = selectedRows;
    };
  }
  tableComp.columns.forEach((item: any) => {
    // 单元格编辑
    if (item.cellRendererParams && item.cellRendererParams.url) {
      const cellRendererParams = item.cellRendererParams;
      const cb = cellRendererParams.callBack;
      cellRendererParams.callBackFn = (
        row: any,
        key: string,
        data: string
      ) => {
        const params = cellRendererParams.params
          ? cellRendererParams.params(row, key, data)
          : {};
        params[key] = data;
        let paramsKey =
          cellRendererParams.method == "GET" ? "params" : "data";
        service({
          url: event.state._BASE_URL + cellRendererParams.url,
          [paramsKey]: params,
          method: cellRendererParams.method || "POST",
        }).then((res: any) => {
          row[key] = data;
          cb && cb(row, res);
        });
      };
    }
    // 操作栏
    if (item.field == "action") {
      item.cellRendererFramework = "CellOperationBtn";
      item.cellRendererParams = {...item}
    }
  })
}

// 获取自身查询参数
function getOwnSearchData(comp: any, formComp: any) {
  const params: any = {};
  if (comp.params) {
    Object.keys(comp.params).forEach((key: string) => {
      if (typeof comp.params[key] == "function") {
        params[key] = comp.params[key](formComp);
      } else {
        params[key] = comp.params[key];
      }
    });
  }
  return params;
}
// 处理查询参数
function handleParams(tableComp: any) {
  let params: any = tableComp.formData || {};
  params = { ...params, ...tableComp.pageInfo };
  // 设置导出查询参数
  tableComp.exportDataSearchParams = params;
  return params;
}
// 处理查询结果数据格式
function filterRes(res: any) {
  if (!res) return;
  let data: any = {};
  data.totalNum = res.totalNum || res.total || 0;
  data.result = res.result || res.items || res.records || res;
  if (!data.result.length) data.result = [];
  return data;
}
