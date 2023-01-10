<!--
 * @author: zhao yongfei
 * @Date: 2022-08-12 10:57:04
 * @description: 
 * @LastEditTime: 2022-08-13 11:07:55
 * @LastEditors: zhao yongfei
 * @FilePath: /dfs-page-vue/src/components/ElTable.vue
-->

<template>
  <div class="PublicTable">
    <el-table
      ref="tableRef"
      class="dbs-table"
      :class="[cusClass]"
      :border="configFlag.border"
      :header-row-style="headerRowStyle"
      :data="data"
      :max-height="tableMaxHeight"
      :height="tableHeight"
      :highlight-current-row="highlightCurrentRow"
      :current-row-key="-1"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
      :span-method="objectSpanMethod"
      :row-class-name="tableRowClassName"
      :key="key"
      :row-key="rowKey"
      :show-summary="showSummary"
      @header-click="headerClick"
    >
      <!--    :row-key="(row) => row[rowKey] || rowKey" -->
      <!-- 全选单选 -->
      <el-table-column
        v-if="configFlag.selection"
        :selectable="selecTableFun"
        align="center"
        width="40"
        type="selection"
        fixed="left"
      />
      <!-- 序号列 -->
      <el-table-column
        v-if="configFlag.index"
        align="center"
        width="100"
        type="index"
        :index="1"
        :label="configFlag.indexName || '序号'"
      />
      <!-- 循环遍历表头展示数据 -->
      <el-table-column
        v-for="item in columns"
        :show-overflow-tooltip="item.tooltip"
        :key="item.value"
        :width="item.width || ''"
        :height="item.height || ''"
        :max-height="item.maxHeight || ''"
        :min-width="item.minWidth || ''"
        :prop="item.value"
        :label="item.label"
        :align="item.align || 'center'"
        :sortable="item.sortable"
        :sort-method="item.sortMethod"
        header-align="center"
        :fixed="item.fixed"
        :class-name="item.className"
      >
        <template v-if="item.customizeHeader || false" #header>
          <slot
            :class="item.className"
            name="HEADER"
            :scope="{ item, columnIndex }"
          />
        </template>
        <template v-slot="scope">
          <!-- 根据需求添加效果 返回的slot可以优化.自己来吧. -->
          <!-- v-bind="{ scope }" -->
          <slot v-if="item.slot" :name="item.slot" :scope="scope" />
          <div v-else-if="!item.render">
            <span :class="item.className">{{ scope.row[item.value] }} </span>
          </div>
          <div v-else-if="item.render">
            <span :class="item.className">
              {{ item.render(scope.row) }}
            </span>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- :hide-on-single-page="true" -->
    <el-pagination
      v-if="configFlag.needPage"
      style="padding: 5px 10px; background: #fff"
      :total="totalNum"
      :pageNum="pageInfo.currentPage"
      :pageSize="pageInfo.pageSize"
      layout="total,sizes, prev, pager, next"
      @sizeChange="sizeChange"
      @currentChange="currentChange"
      :page-sizes="[10, 20, 30, 50, 100]"
      small
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import SortableJs from "sortablejs";

export default defineComponent({
  props: {
    columns: {
      // 表头数据  文案和绑定值，以及需要特殊处理的slot
      type: Array,
      default: () => [],
    },

    data: {
      type: Array, // 后台数据
      default: () => [],
    },
    totalNum: {
      type: Number,
      default: () => 0,
    },
    pageInfo: {
      // 分页数据
      type: Object,
      default: () => {
        return {
          pageNum: 1,
          pageSize: 20,
        };
      },
    },
    configFlag: {
      // 配置  其他table配置依次添加
      type: Object,
      default: () => {
        return {
          needPage: false, // 是否需要排序
          selection: false, // 是否需要多选
          index: false, // 是否需要序号
          border: true,
        };
      },
    },
    tableHeight: {
      // 可以监听屏幕高度获取。
      // 高度
      type: String,
    },
    tableMaxHeight: {
      // 可以监听屏幕高度获取。
      // 高度
      type: String,
    },
    headerRowStyle: {
      type: Object,
      default: () => {
        return {
          color: "#333",
        };
      },
    },
    highlightCurrentRow: {
      type: Boolean,
      default: false,
    },
    selecTableFun: {
      type: Function,
      default: () => {
        return true;
      },
    },
    objectSpanMethod: {
      type: Function,
      default: () => {
        return true;
      },
    },
    showSummary: {
      type: Boolean,
      default: false,
    },
    key: {
      type: String,
      default: () => {
        return "";
      },
    },
    rowKey: {
      type: String,
      default: () => {
        return "";
      },
    },
    cusTableRowClassName: {
      type: Function,
    },
    dragRow: {
      type: Boolean,
      default: false,
    },
    cusClass: {
      type: String,
      default: () => {
        return "";
      },
    },
    dragBtn: {
      type: String,
      default: () => {
        return "";
      },
    },
  },
  emits: [
    "getTableRef",
    "handleChange",
    "handleSortChange",
    "handleSelectionChange",
    "dragChangeData",
    "headerClick",
  ],
  setup(props, context) {
    // shift多选所用变量
    // let isPressShiftKey = false;
    // let index = -1;
    // let oldIndex = -1;
    // let lock = false;
    // let sortable = "";
    const tableRef = ref();
    const tableMaxHeight: any = ref(props.tableMaxHeight);
    context.emit("getTableRef", tableRef);

    // 设置条数
    function sizeChange(pageSize: any) {
      console.log("设置条数:", pageSize);
      // props.pageInfo.pageSize = pageSize;
      // context.emit("handleChange", props.pageInfo);
      context.emit("handleChange", { pageSize: pageSize });
    }

    // 翻页
    function currentChange(currentPage: any) {
      console.log("翻页:", currentPage);
      // props.pageInfo.currentPage = currentPage;
      // context.emit("handleChange", props.pageInfo);
      context.emit("handleChange", { currentPage: currentPage });
    }
    function handleSelectionChange(row: any) {
      context.emit("handleSelectionChange", row);
    }

    function headerClick(column: any, event: any) {
      context.emit("headerClick", { column, event });
    }

    function tableRowClassName({
      row,
      rowIndex,
    }: {
      row: any;
      rowIndex: number;
    }) {
      row.index = rowIndex;
      if (!props.selecTableFun(row)) {
        return "disabled";
      }
    }
    // 多选
    // let timer: any = null;
    // function handleSelectionChange(selObj: any) {
    //   // 按shift多选逻辑
    //   /*******************************/
    //   clearTimeout(timer);
    //   timer = setTimeout(() => {
    //     context.emit("handleSelectionChange", selObj);
    //   }, 30);
    //   if (lock) return;
    //   if (selObj.length) {
    //     index = selObj[selObj.length - 1].index;
    //   } else {
    //     index = -1;
    //   }
    //   let min = Math.min(oldIndex, index);
    //   let max = Math.max(oldIndex, index);
    //   if (oldIndex > -1 && isPressShiftKey) {
    //     for (let i = min + 1; i <= max; i++) {
    //       lock = true;
    //       if (props.selecTableFun(props.data[i])) {
    //         tableRef.value.toggleRowSelection(props.data[i], true);
    //       }
    //     }
    //     lock = false;
    //   }
    //   oldIndex = index;
    //   /*******************************/
    // }
    // 排序
    function sortChange(item: { order: string; prop: string }) {
      context.emit("handleSortChange", { order: item.order, prop: item.prop });
    }
    // // 如果支持多选，监听shift事件
    // if (props.configFlag.selection) {
    //   function handleKeydown(ev: any) {
    //     let e = ev || event;
    //     if (e.keyCode === 16) {
    //       isPressShiftKey = true;
    //     }
    //   }
    //   function handleKeyup(ev: any) {
    //     let e = ev || event;
    //     if (e.keyCode === 16) {
    //       isPressShiftKey = false;
    //     }
    //   }
    //   setTimeout(() => {
    //     document.removeEventListener("keydown", handleKeydown, false);
    //     document.removeEventListener("keyup", handleKeyup, false);
    //     document.addEventListener("keydown", handleKeydown, false);
    //     document.addEventListener("keyup", handleKeyup, false);
    //   }, 500);
    // }
    function rowDrop() {
      let tbody: any = "";
      let dragData: any = [];

      if (props.cusClass) {
        tbody = document.querySelector(
          `.${props.cusClass} .el-table__body-wrapper tbody`
        );
      } else {
        tbody = document.querySelector(`.el-table__body-wrapper tbody`);
      }
      dragData = props.data;
      sortable = SortableJs.create(tbody, {
        animation: 150,
        handle: props.dragBtn,
        onEnd({ newIndex, oldIndex }: any) {
          let currRow = dragData.splice(oldIndex, 1)[0];
          dragData.splice(newIndex, 0, currRow);
          context.emit("dragChangeData", dragData);
        },
      });
    }
    // function setHeight() {
    //   let dom = document.querySelector(".dbs-table");
    //   if (dom) {
    //     let th = window.innerHeight - dom?.getBoundingClientRect().top - 35;
    //     tableMaxHeight.value = th;
    //   }
    // }
    onMounted(() => {
      // setHeight();

      // window.addEventListener("resize", (e) => {
      //   setHeight();
      // });

      props.dragRow && rowDrop();
    });
    return {
      tableRef,
      sizeChange,
      currentChange,
      handleSelectionChange,
      sortChange,
      tableRowClassName,
      tableMaxHeight,
      headerClick,
    };
  },
});
</script>

<style lang="less" scoped>
.PublicTable {
  size: 12px;
}
</style>
