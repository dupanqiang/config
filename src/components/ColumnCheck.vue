<!--
 * @author: zhao yongfei
 * @Date: 2023-01-10 13:02:15
 * @description: 
 * @LastEditTime: 2023-08-02 19:54:31
 * @LastEditors: zhao yongfei
 * @FilePath: /dfs-page-config/src/components/ColumnCheck.vue
-->
<template>
  <div ref="elColumnCheckedPanel" v-show="show" :style="{left: left, top: top, bottom: bottom}" class="header-checked" @click.stop>
    <p class="header-checked-header">
      {{t("自定义显示字段")}}
    </p>
    <div class="header-checked-body">
      <el-checkbox
        v-for="(column, index) in columns" :key="column.headerName + index"
        v-show="column.headerName !== ' '"
        v-model="column.show" :label="column.headerName">
      </el-checkbox>
    </div>
    <div class="header-checked-footer">
      <el-button type="default" size="small" @click="reset" style="margin-right: 4px">{{t("还原")}}</el-button>
      <el-button type="primary" size="small" @click="confirm">{{t("确定")}}</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onActivated, reactive, toRefs, watch, nextTick, getCurrentInstance } from 'vue'

export default defineComponent({
  props: {
    gridApi: {
      type: Object,
      default: {}
    },
    storageColumnsKey: {
      type: String,
      default: ''
    },
    columnDefs: {
      type: Array,
      default: []
    },
    columnUpdate: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const { t } = getCurrentInstance().appContext.config.globalProperties.useI18n();
    const elColumnCheckedPanel = ref()
    const state = reactive({
      show: false,
      left: '',
      top: '',
      bottom: 'auto',
      columns: <any>[]
    })
    watch(() => props.columnUpdate, () => {
      state.columns = props.columnDefs.map((item: any) => {
        return {...item, show: !item.hide}
      })
    })
    state.columns = props.columnDefs.map((item: any) => {
      return {...item, show: !item.hide}
    })
    function confirm() {
      state.columns.forEach((item: any) => {
        item.hide = !item.show
      });
      updateColumns(state.columns)
      const columns = state.columns.map((item: any) => {
        return {
          field: item.field,
          headerName: item.headerName,
          width: item.width,
          minWidth: item.minWidth,
          hide: item.hide
        }
      })
      localStorage.setItem(props.storageColumnsKey, JSON.stringify(columns))
    }
    function reset() {
      state.columns.forEach((item: any) => {
        if (item.rowGroup) {
            item.hide = true
            item.show = false
        } else {
            item.hide = false
            item.show = true
        }
      });
      updateColumns(state.columns)
      localStorage.removeItem(props.storageColumnsKey)
    }
    function updateColumns(columns: any) {
      props.gridApi.setColumnDefs(columns);
      state.show = false
    }
    function closeColumnsPanel() {
      state.show = false
    }
    function addEvent() {
      if (!props.storageColumnsKey) return
      setTimeout(() => {
        const ele: any = document.querySelector(`.${props.storageColumnsKey} .ag-header`)
        if (!ele) return
        ele.oncontextmenu = (e: any) => {
          state.left = e.pageX + 'px'
          state.top = e.pageY + 'px'
          setTimeout(() => {
            state.show = true
            nextTick(() => {
              const elHeight = elColumnCheckedPanel.value.clientHeight
              const docHeight = document.documentElement.clientHeight
              if (elHeight + 20 > docHeight - e.pageY) {
                state.top = 'auto'
                state.bottom = '10px'
              }
            })
          })
          e.preventDefault()
        }
      }, 1000)
      document.removeEventListener("click", closeColumnsPanel, false)
      document.removeEventListener("contextmenu", closeColumnsPanel, false)
      document.addEventListener("click", closeColumnsPanel, false)
      document.addEventListener("contextmenu", closeColumnsPanel, false)
    }
    addEvent()
    onActivated(() => {
      addEvent()
    })
    return {
      t,
      elColumnCheckedPanel,
      ...toRefs(state),
      confirm,
      reset
    }
  }
})
</script>
<style lang="less">
  .header-checked {
    position: fixed;
    background: #fff;
    border: 1px solid #dcdee2;
    min-width: 200px;
    font-size: 12px;
    z-index: 200;
    .header-checked-header {
      background-color: #0094ff;
      text-align: center;
      line-height: 28px;
      color: #fff;
      font-weight: bold;
      margin: 0;
    }
    .header-checked-body {
      max-height: 70vh;
      overflow-y: auto;
      .el-checkbox {
        padding: 0 6px;
        display: flex;
        align-items: center;
        height: 24px;
        .el-checkbox__label {
          font-weight: 400;
          color: #333;
        }
        &.is-checked {
          .el-checkbox__label {
            color: #409eff;
          }
        }
      }
    }
    .header-checked-footer {
      padding: 4px;
      text-align: right;
      border-top: 1px solid #f3f3f3;
      .el-button {
        min-height: 22px;
      }
    }
  }
</style>
