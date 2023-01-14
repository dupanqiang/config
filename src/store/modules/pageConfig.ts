/*
 * @Author: 赵永飞
 * @Date: 2021-09-06 16:57:52
 * @LastEditTime: 2023-01-14 13:54:50
 * @LastEditors: zhao yongfei
 * @Description: In User Settings Edit
 * @FilePath: /dfs-page-config/src/store/modules/pageConfig.ts
 */
import { formatDate, handleEnter } from "@/utils";
import { getTargetComp, getSelectOption } from "@/common/js/pageConfigUtils";
import service from "@/utils/service";
const state = {
  // 页面配置数据
  pageConfigData: {},
};
// getters
const getters = {
  // 获取页面配置数据
  _GET_CONFIG_DATA(state: any) {
    return function (key: string) {
      return state.pageConfigData[key];
    };
  },
};
// mutations
const mutations = {
  // 储存页面配置数据
  savaPageConfigData(state: any, payload: any) {
    state.pageConfigData[payload.pageKey] = payload;
  },
  // 更新form表单和按钮
  updateSearchForm(state: any, payload: { formComp: any; status: number }) {
    payload.formComp.elementGroup = payload.formComp.searchFormFn(payload.status);
    payload.formComp.elementGroup = payload.formComp.searchHandleFn(
      payload.status
    );
    // 重置searchData
    payload.formComp.elementGroup.forEach((item: any) => {
      payload.formComp.searchData[item.prop] = item.value;
    });
    formBindFunction(state, payload.formComp);
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
  },
};
// actions
const actions = {
  // 初始化入口
  async _INIT_PAGE(event: any, payload: any) {
    const { state, commit, dispatch } = event;
    // 初始化配置信息
    initData(event, payload);
    // 存储配置信息
    commit("savaPageConfigData", payload);

    const components = payload.components;
    let firstComp = components[0];
    // 判断第一个组件是按钮组还是form
    if (firstComp.widget === "searchForm") {
      //
      // formBindFunction(state, firstComp);
      // 绑定函数
      // tableBindFunction(event, payload);

      firstComp.effects.forEach((item: any) => {
        const comp = getTargetComp(event, payload.pageKey, item.target);
        if (comp.widget == "table") {
          const formData = getFormData(firstComp); // formData查询参数
          const ownParams = getOwnSearchData(comp); // 自身查询参数
          comp.formData = { ...formData, ...ownParams }; // 给table添加查询参数
          dispatch("_TABLE_QUERY", { tableComp: comp });
        }
      });
      // 回车查询
      handleEnter(() => {
        event.dispatch("_QUERY_LIST", {
          formComp: firstComp,
          pageKey: payload.pageKey,
        });
      });
    } else if (firstComp.widget === "table") {
      // 绑定函数
      // tableBindFunction(event, payload);
      // table直接查询
      dispatch("_TABLE_QUERY", { tableComp: firstComp });
    }
    components.forEach((co: any) => {
      if (co.widget === "searchForm") {
        formBindFunction(state, co);
      } else if (co.widget === "table") {
        // 绑定函数
        tableBindFunction(event, payload);
      }
    });
  },
  updateColumns(event: any, payload: {pageKey: string, tableComp: any; status: number }) {
    if (payload.tableComp.columnsFn)
      payload.tableComp.columns = payload.tableComp.columnsFn(payload.status);
      const pageConfigData = event.getters["_GET_CONFIG_DATA"](payload.pageKey);
      tableBindFunction(event, pageConfigData)
  },
  // 查询
  _QUERY_LIST(event: any, payload: { formComp: any; pageKey: string }) {
    payload.formComp.effects.forEach((item: any) => {
      const comp = getTargetComp(event, payload.pageKey, item.target);
      if (comp.widget == "table") {
        const formData = getFormData(payload.formComp); // formData查询参数
        Object.keys(formData).forEach((key: string) => {
          comp.formData[key] = formData[key];
        });
        event.dispatch("_TABLE_QUERY", { tableComp: comp });
      }
    });
  },
  // 查询列表查询
  _TABLE_QUERY(event: any, { tableComp, row }: any) {
    if (tableComp.searchBefore) {
      if (tableComp.searchBefore(tableComp, row) === false) {
        return;
      }
      if (row) tableComp.formData = getOwnSearchData(tableComp); // 自身查询参数
    }

    event.rootState.loading = true;
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
        event.rootState.loading = false;
      });
  },
};

// 初始化数据
function initData(event: any, payload: any) {
  event
  payload.components.forEach((comp: any) => {
    if (comp.widget == "searchForm") {
      comp.searchData = {};
      // 设置searchData对象
      if (comp.elementGroup && comp.elementGroup.length) {
        comp.elementGroup.forEach((item: any) => {
          item.value = item.value ? item.value : null;
          comp.searchData[item.prop] = item.value;
        });
      } else {
        comp.elementGroup = [];
      }
    }
    if (comp.widget == "table") {
      // 设置默认分页
      if (!comp.pageInfo)
        comp.pageInfo = { pageNum: 1, currentPage: 1, pageSize: 50 };
    }
  });
}
// table绑定方法
function tableBindFunction(event: any, configData: any) {
  configData.components.forEach((comp: any) => {
    if (comp.widget == "table") {
      // 绑定行点击函数
      if (comp.configFlag && comp.configFlag.isRowClick) {
        const targetTableComp = getTargetComp(
          event,
          configData.pageKey,
          comp.effects[0].target
        );
        comp.onRowClickedFn = (row: any) => {
          event.dispatch("_TABLE_QUERY", {
            tableComp: targetTableComp,
            row: row,
          });
        };
      }
      // 复选框选择
      if (comp.configFlag && comp.configFlag.checkboxSelection) {
        comp.onSelectionChanged = (selectedRows: any[]) => {
          comp.selectedRows = selectedRows;
        };
      }
      comp.columns.forEach((item: any) => {
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
          item.cellRendererParams = {
            elementGroup: item.elementGroup,
            cycleButton: item.cycleButton || "",
            className: item.className,
          };
          const evevsList = ["query", "reset", "download", "export", "custom"];
          item.elementGroup.forEach((item: any) => {
            if (!evevsList.includes(item.event)) {
              item.handle = comp.handle;
            }
          });
        }
      });
      // 操作栏按钮
      const lastColumn = comp.columns[comp.columns.length - 1];
      if (lastColumn.field == 'action') {
        lastColumn.cellRendererFramework = "CellOperationBtn";
        lastColumn.cellRendererParams = {
          elementGroup: lastColumn.elementGroup
        }
        lastColumn.elementGroup.forEach((item: any) => {
          item.handle = comp.handle
        });
      }
    }
  });
}
// form button 绑定方法
function formBindFunction(state: any, formComp: any) {
  // 按钮绑定方法
  const evevsList = ["query", "reset", "download", "export", "custom"];
  formComp.elementGroup.forEach((item: any) => {
    if (!evevsList.includes(item.event)) {
      item.handle = formComp.handle;
    }
  });
  // 下拉框接口查询
  formComp.elementGroup.forEach((item: any) => {
    if (item.type === "Select" && item.url) {
      getSelectOption(state, item);
    }
  });
}
// 获取form参数
function getFormData(formComp: any) {
  let formData: any = {};
  const searchData = formComp.searchData;
  formComp.elementGroup.forEach((item: any) => {
    // 如果是隐藏的表单，取默认值
    if (
      item.isShow === undefined ||
      item.isShow === true ||
      (item.isShow.prop && searchData[item.isShow.prop] == item.isShow.value)
    ) {
      formData[item.prop] = searchData[item.prop];
    } else {
      formData[item.prop] = item.value;
    }
    // 处理时间
    if (item.type === "Daterange" || item.type === "DateTimerange") {
      if (!formData[item.prop]) {
        formData[item.startTime] = "";
        formData[item.endTime] = "";
      } else {
        formData[item.startTime] = formatDate(
          formData[item.prop][0],
          item.type === "Daterange" ? "yyyy-MM-dd" : "yyyy-MM-dd HH:mm:ss"
        );
        formData[item.endTime] = formatDate(
          formData[item.prop][1],
          item.type === "Daterange" ? "yyyy-MM-dd" : "yyyy-MM-dd HH:mm:ss"
        );
      }
      delete formData[item.prop];
    }
  });
  return formData;
}
// 获取自身查询参数
function getOwnSearchData(comp: any, status?: string) {
  const params: any = {};
  if (comp.params) {
    Object.keys(comp.params).forEach((key: string) => {
      if (typeof comp.params[key] == "function") {
        params[key] = comp.params[key](status);
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

export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
