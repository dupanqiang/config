<!--
 * @Author: zhao yongfei
 * @Date: 2020-12-15 11:00:37
 * @LastEditTime: 2023-01-14 00:01:34
 * @LastEditors: zhao yongfei
 * @Description: table内字段编辑
 * @FilePath: /dfs-page-config/src/components/CellOperationBtn.vue
-->
<!--
 * @Author: zhao yongfei
 * @Date: 2020-12-15 11:00:37
 * @LastEditTime: 2022-08-10 15:23:13
 * @LastEditors: dupan
 * @Description: table内字段编辑
 * @FilePath: /fe-supply-chain/src/components/CellOperationBtn.vue
-->
<template>
  <div @click.stop v-if="params.node && !params.node.rowPinned" class="cell-operation-btn-box">
    <template v-for="item in elementGroup" :key="item.label">
      <span 
        class="text-btn"
        :style="item.style"
        v-if="item.type === 'text'"
        v-show="(item.isShow === undefined || item.isShow === true || (typeof item.isShow == 'function' && item.isShow(row)) || item.isShow.prop && searchData[item.isShow.prop] == item.isShow.value)"
        :type="item.buttonType || 'primary'"
        :disabled="typeof item.disabled === 'function' ? item.disabled(row) : item.disabled"
        @click="item.handleClick({option: item, row: (row ? row : groupRow), gridOption: params})">{{ item.text }}
      </span>
      <el-button
        v-else
        v-show="(item.isShow === undefined || item.isShow === true || (typeof item.isShow == 'function' && item.isShow(row)) || item.isShow.prop && searchData[item.isShow.prop] == item.isShow.value)"
        :type="item.buttonType || 'primary'"
        :disabled="typeof item.disabled === 'function' ? item.disabled(row) : item.disabled"
        size="small"
        @click="item.handleClick({option: item, row: (row ? row : groupRow), gridOption: params})">{{ item.text }}
      </el-button>
    </template>
  </div>
</template>
<script>
import { reactive, toRefs, defineComponent, onMounted, getCurrentInstance } from "vue";
export default defineComponent({
  setup() {
    const { ctx } = getCurrentInstance();
    const state = reactive({
      row: {},
      params: {},
      elementGroup: [],
      // 分组时的数据
      groupRow: {}
    })
    onMounted(() => {
      state.row = ctx.params.data;
      state.params = ctx.params;
      state.elementGroup = ctx.params.elementGroup;
      const childrenAfterFilter = ctx.params.node.childrenAfterFilter
      state.groupRow = childrenAfterFilter && childrenAfterFilter[0] ? childrenAfterFilter[0].data : {}
    });
    return {
      ...toRefs(state)
    };
  }
});
</script>

<style lang="less">
.cell-operation-btn-box {
  padding: 4px 0;
  .text-btn {
    color: #00aff7;
    margin: 2px;
    cursor: pointer;
  }
}
</style>


