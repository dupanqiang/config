<!--
 * @Author: zhao yongfei
 * @Date: 2020-12-15 11:00:37
 * @LastEditTime: 2023-12-12 14:50:30
 * @LastEditors: zhao yongfei
 * @Description: table内字段编辑
 * @FilePath: /dfs-page-config/src/components/CellOperation.vue
-->
<template>
  <div @click.stop v-if="params.node && !params.node.rowPinned" class="cell-operation-btn-box">
    <template v-for="item in elementGroup" :key="item.label">
      <span
        class="dfs-text-btn"
        :style="item.style"
        v-if="item.type === 'text'"
        v-show="(item.isShow === undefined || item.isShow === true || (typeof item.isShow == 'function' && item.isShow(row)) || item.isShow.prop && searchData[item.isShow.prop] == item.isShow.value)"
        :type="item.buttonType || 'primary'"
        :disabled="typeof item.disabled === 'function' ? item.disabled(row) : item.disabled"
        @click="handleClick({option: item, row: (row ? row : groupRow), gridOption: params})">{{ item.text }}
      </span>
      <el-button
        v-else
        v-show="(item.isShow === undefined || item.isShow === true || (typeof item.isShow == 'function' && item.isShow(row)) || item.isShow.prop && searchData[item.isShow.prop] == item.isShow.value)"
        :type="item.buttonType || 'primary'"
        :disabled="typeof item.disabled === 'function' ? item.disabled(row) : item.disabled"
        size="small"
        @click="handleClick({option: item, row: (row ? row : groupRow), gridOption: params})">{{ item.text }}
      </el-button>
    </template>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, defineComponent, onMounted, getCurrentInstance } from "vue";
import store from "@/store"
import { getTargetComp, getRelationComp } from "@/common/js/pageConfigUtils";
export default defineComponent({
  setup() {
    const state = reactive({
      row: {},
      params:<any> {},
      elementGroup: [],
      // 分组时的数据
      groupRow: {}
    })
    function handleClick(params) {
      if (params.option.event === "dialog") {
        dialog(params)
      } else {
        params.option.handleClick(params)
      }
    }
    function dialog({option, row}) {
      if (option.showDialogBefore) {
        let components = {}
        if (option.relation) {
          components = getRelationComp(store, state.params.pageKey, option.relation)
        }
        if (option.showDialogBefore(components, row, option) === false) {
          return
        }
      }
      const dialogRef = store.getters['_GET_DIALOGREF'](state.params.pageKey)
      dialogRef.option = option
      dialogRef.dialog = true

      if(option.formTarget) {
        const component = getTargetComp(store, state.params.pageKey, option.formTarget)
        component.row = row
      }
    }
    onMounted(() => {
      const { data:{params} }:any = getCurrentInstance();
      state.row = params.data;
      state.params = params;
      state.elementGroup = params.elementGroup;
      const childrenAfterFilter = params.node.childrenAfterFilter
      state.groupRow = childrenAfterFilter && childrenAfterFilter[0] ? childrenAfterFilter[0].data : {}
    });
    return {
      ...toRefs(state),
      handleClick
    };
  }
});
</script>

<style lang="less">
.cell-operation-btn-box {
  min-height: 30px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}
</style>


