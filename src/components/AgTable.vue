<!--
 * @Author: zhaoyongfei
 * @Date: 2021-08-24 17:18:13
 * @LastEditTime: 2023-01-11 22:10:31
 * @LastEditors: zhao yongfei
 * @Description: In User Settings Edit
 * @FilePath: /dfs-page-config/src/components/AgTable.vue
-->
<!--
 * enableCellTextSelection=true  ensureDomOrder=true 允许选中文本
-->
<template>
  <ag-grid-vue
    class="ag-theme-alpine"
    :class="[storageColumnsKey]"
    :style="{opacity: showTable ? 1 : 0}"
    headerHeight="22"
    :rowHeight="configFlag.rowHeight"
    :columnDefs="columnDefs"
    :defaultColDef="defaultColDef"
    :rowData="rowData"
    rowSelection="multiple"
    :rowMultiSelectWithClick="configFlag.rowMultiSelectWithClick"
    :autoGroupColumnDef="configFlag.autoGroupColumnDef"
    :suppressRowDeselection="false"
    :suppressRowClickSelection="
      configFlag.suppressRowClickSelection ||
      (!configFlag.suppressRowClickSelection &&
        configFlag.suppressRowClickSelection !== false)
        ? true
        : false
    "
    @grid-ready="onGridReady"
    @selection-changed="onSelectionChanged"
    :getRowStyle="getRowStyle"
    :enableCellTextSelection="true"
    :ensureDomOrder="true"
    :groupSelectsChildren="configFlag.groupSelectsChildren"
    @viewport-changed="viewportChanged"
    @rowSelected="onRowSelected"
    @rowClicked="onRowClicked"
    @dragStopped="dragStopped"
    @cellClicked="onCellClicked"
    :suppressAggFuncInHeader="true"
    :suppressContextMenu="true"
  >
    <!-- :rowClassRules="{
      'green-color': function(params) { return params.data.id == 11716; },
      'yellow-color': function(params) { return params.data.year === 2004; },
    }" -->
  </ag-grid-vue>
  <!-- 插槽 -->
  <slot :name="configFlag.slotName"></slot>
  <div style="display: flex; justify-content: end">
    <el-pagination
      v-if="pageInfo"
      style="margin-top: 5px"
      :total="totalNum"
      :pageNum="pageInfo.currentPage"
      :pageSize="pageInfo.pageSize"
      layout="total,sizes, prev, pager, next"
      @sizeChange="sizeChange"
      @currentChange="currentChange"
      :page-sizes="[20, 50, 100, 300, 500]"
      small
    />
  </div>
  <ColumnCheck
    :gridApi="gridApi"
    :storageColumnsKey="storageColumnsKey"
    :columnDefs="columnDefs"
    :columnUpdate="columnUpdate"
  ></ColumnCheck>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, toRefs, watch } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import '@/common/css/aggrid.less';
import { useStore } from "vuex";
// import { useRoute } from "vue-router";
import { sum } from "@/utils/index";
import ColumnCheck from "./ColumnCheck.vue";
export default defineComponent({
  components: { AgGridVue, ColumnCheck },
  props: {
    pageKey: {
      type: String,
      default: "",
    },
    componentOption: {
      type: Object,
      default: {},
    }
  },
  emits: [
    "onGridReady",
    "handleSelectionChange",
    "onViewportChanged",
    "onRowSelected",
    "onRowClicked",
  ],
  setup(props: any, context) {
    const store = useStore();
    // const route = useRoute();
    let gridApi: any = null;
    // 获取页面配置信息
    const tableComp = props.componentOption;
    let oldRowIndex = -1;
    let oldRowData = {};
    const state = reactive({
      showTable: true,
      defaultColDef: {
        resizable: true,
        headerClass: tableComp.configFlag?.headerClass,
        // lockPosition: true
      },
      columnDefs: tableComp.columns,
      configFlag: <any>{
        rowHeight: 30,
        checkboxSelection: false, // 显示复选框
        rowSelection: "multiple", // Type of row selection, set to either 'single' or 'multiple' to enable selection
        rowMultiSelectWithClick: false, // to allow multiple rows to be selected with clicks
        suppressRowDeselection: false, // prevent rows from being deselected if you hold down Ctrl and click the row
        suppressRowClickSelection: true, // If true, rows won't be selected when clicked. Use, for example, when you want checkbox selection, and don't want to also select the row when the row is clicked.
        index: false, // 是否需要序号
        border: true,
        isRowClick: false,
        isTotal: false,
        groupSelectsChildren: false, //
        autoGroupColumnDef: {},
      },
      pageInfo: tableComp.pageInfo,
      rowData: computed(() => {
        if (tableComp.data.result.length) {
          setTimeout(() => {
            state.showTable = true
          }, 300);
        }
        return tableComp.data.result;
      }),
      totalNum: computed(() => {
        return Number(tableComp.data.totalNum);
      }),
      storageColumnsKey: computed(() => {
        return (
          // (route.name as string) +
          (tableComp.status || "") +
          (tableComp.key || "")
          // (route.params.status || "")
        )
      }),
      gridApi: null,
      columnUpdate: 0,
    });

    if (tableComp.configFlag) {
      Object.keys(tableComp.configFlag).forEach((key: any) => {
        state.configFlag[key] = tableComp.configFlag[key];
      });
    }
    if (state.configFlag.isRowClick) {
      // 如果设置行点击，数据变化的时候重置oldRowIndex
      watch(
        () => props.tableComp.data.result,
        () => {
          oldRowIndex = -1;
        }
      );
    }
    // 添加复选框
    if (state.configFlag.checkboxSelection) {
      state.columnDefs = [
        {
          headerName: " ",
          field: " ",
          width: 30,
          resizable: false,
          headerCheckboxSelectionFilteredOnly: true,
          headerCheckboxSelection: true,
          checkboxSelection: state.configFlag.checkboxSelection,
          pinned: "left",
        },
        ...tableComp.columns,
      ];
    }
    if (state.configFlag.total) {
      watch(
        () => props.tableComp.data.result,
        () => {
          getTotal();
        }
      );
    }
    // 总计的添加
    function getTotal() {
      const bottomRows = [];
      let obj = <any>{};
      state.columnDefs.map((item: any, index: any) => {
        obj.type = "total";
        if (index === 0) {
          obj[item.field] = "总计";
        } else if (item.showTotal) {
          obj[item.field] = getTotalQuantity(
            props.tableComp.data.result,
            item.field
          );
        } else {
          obj[item.field] = ""
        }
      });
      bottomRows.push(obj);
      gridApi.setPinnedBottomRowData(bottomRows);
    }
    // 页面总计的计算
    function getTotalQuantity(items: any, key: string) {
      let num = 0;
      for (let i = 0; i < items.length; i++) {
        num = sum(num, parseFloat(!items[i][key] ? 0 : items[i][key]));
      }
      return num;
    }
    watch(
      () => tableComp.columns,
      () => {
        // 过滤默认hide项
        const columns = tableComp.columns.filter((item: any) => {
          if (!item.rowGroup) {
            item.hide = item.hide ? item.hide : false;
            return !item.hide;
          } else {
            return item;
          }
        });
        // 添加复选框
        if (state.configFlag.checkboxSelection) {
          state.columnDefs = [
            {
              headerName: " ",
              field: " ",
              width: 30,
              resizable: false,
              headerCheckboxSelectionFilteredOnly: true,
              headerCheckboxSelection: true,
              checkboxSelection: state.configFlag.checkboxSelection,
              pinned: "left",
            },
            ...columns,
          ];
        } else {
          state.columnDefs = columns;
        }
        setColumns();
        state.columnUpdate = Date.now();
        setTimeout(() => {
          if (state.configFlag.sizeColumnsToFit) {
            gridApi.sizeColumnsToFit();
          }
        });
      }
    );
    function setColumns() {
      let storageColumns = localStorage.getItem(state.storageColumnsKey);
      if (storageColumns) {
        const columns = JSON.parse(storageColumns);
        columns.forEach((item: any, index: number) => {
          for (let i = 0, len = state.columnDefs.length; i < len; i++) {
            const column = state.columnDefs[i];
            if (column.headerName === item.headerName) {
              column.index = index;
              column.width = item.width;
              column.minWidth = item.minWidth;
              column.hide = item.hide || false;
              break;
            }
          }
        });
        state.columnDefs.sort((objectA: any, objectB: any) => {
          return objectA.index - objectB.index;
        });
      }
    }
    setColumns();
    function dragStopped(e: any) {
      let columns = e.api.getColumnDefs();
      columns = columns.map((item: any, i: number) => {
        if (item.hide) {
          state.columnDefs[i].hide = true;
        }
        return {
          field: item.field,
          headerName: item.headerName,
          width: item.width,
          minWidth: item.minWidth,
          hide: item.hide,
        };
      });
      localStorage.setItem(state.storageColumnsKey, JSON.stringify(columns));
      state.columnUpdate = Date.now();
    }
    function getRowStyle(params: any) {
      const styleObj = props.getRowStyle ? props.getRowStyle(params) : {};
      const rowNode = params.api.getRowNode(params.rowIndex);
      if (typeof state.configFlag.checkboxSelection === "function") {
        rowNode.selectable = state.configFlag.checkboxSelection(params);
      }
      if (params.node.isClicked === undefined) {
        return styleObj;
      } else {
        if (params.node.isClicked) {
          return { "background-color": "#ffe48d", ...styleObj };
        } else {
          return { "background-color": "", ...styleObj };
        }
      }
    }
    function onRowSelected(event: any) {
      context.emit("onRowSelected", event);
    }
    function viewportChanged() {
      context.emit("onViewportChanged");
    }
    function onGridReady(params: any) {
      gridApi = state.gridApi = params.api;
      if (state.configFlag.sizeColumnsToFit) {
        params.api.sizeColumnsToFit();
      }
      context.emit("onGridReady", params.api);
    }
    // 选中行
    function onSelectionChanged(event: any) {
      // var selectedNodes = event.api.getSelectedNodes();
      var selectedRows = event.api.getSelectedRows();
      // context.emit("handleSelectionChange", selectedRows);
      tableComp.onSelectionChanged &&
        tableComp.onSelectionChanged(selectedRows);
    }
    // 点击行
    function onRowClicked(event: any) {
      if (event.rowPinned) return;
      if (oldRowIndex === event.rowIndex) return;
      if (state.configFlag.isRowClick) {
        if (oldRowIndex > -1) {
          // 清除旧的标识
          const oldRowNode = event.api.getRowNode(oldRowIndex);
          oldRowNode.isClicked = false;
          oldRowNode.setData(oldRowData);
        }
        // 设置新的标识
        const rowNode = event.api.getRowNode(event.rowIndex);
        rowNode.isClicked = true;
        rowNode.setData(event.data);
        // context.emit("onRowClicked", event);
        tableComp.onRowClickedFn && tableComp.onRowClickedFn(event, tableComp);
        // 缓存旧数据
        oldRowIndex = event.rowIndex;
        oldRowData = event.data;
      }
    }
    function onCellClicked(event: any) {
      state.configFlag.onCellClicked &&
        state.configFlag.onCellClicked(
          {
            field: event.colDef.field,
            data: event.data,
            rowIndex: event.rowIndex,
            tableComp: tableComp,
          },
          event
        );
    }
    // function getSelectedRows() {
    //   const selectedNodes = state.gridApi.getSelectedNodes();
    //   const selectedData = selectedNodes.map( (node: any) => node.data );
    //   const selectedDataStringPresentation = selectedData.map( (node: any) => `${node.make} ${node.model}`).join(', ');
    //   alert(`Selected nodes: ${selectedDataStringPresentation}`);
    // }
    // 设置条数
    function sizeChange(pageSize: any) {
      tableComp.pageInfo.pageSize = pageSize;
      store.dispatch("tableQuery", { tableComp: tableComp });
    }
    // 翻页
    function currentChange(currentPage: any) {
      tableComp.pageInfo.currentPage = currentPage;
      tableComp.pageInfo.pageNum = currentPage;

      store.dispatch("tableQuery", { tableComp: tableComp });
    }
    return {
      ...toRefs(state),
      onGridReady,
      dragStopped,
      sizeChange,
      onSelectionChanged,
      currentChange,
      viewportChanged,
      onRowSelected,
      onRowClicked,
      onCellClicked,
      getRowStyle,
    };
  },
});
</script>
