<!--
 * @author: zhao yongfei
 * @Date: 2022-02-14 22:05:50
 * @description: 
 * @LastEditTime: 2023-01-10 22:16:50
 * @LastEditors: zhao yongfei
 * @FilePath: /dfs-page-config/src/views/example2/components/CellId.vue
-->
<template>
  <div>
    <span class="oem-row-id" @click="handleClick(row)">{{row.id}}</span>
    <span v-if="row.priority" class="order-tag" :class="{emergency: row.priority == '急'}">
      <span>{{ row.priority }}</span>
    </span> 
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, defineComponent, onMounted, getCurrentInstance } from "vue";

export default defineComponent({
  setup() {
    const { ctx }:any = getCurrentInstance();
    const state = reactive({
      row:<any> {}
    })
    function handleClick(row: any) {
      ctx.params.callBackFn(row)
    }
    onMounted(() => {
      state.row = ctx.params.data;
      const priority = state.row.orderPriorityNewDesc?.substring(1) || ""
      if (state.row.orderPriorityNewDesc == "P4") {
        state.row.priority = '首'
      } else if (priority != "" && priority < 4) {
        state.row.priority = '急'
      }
    });
    return {
      ...toRefs(state),
      handleClick
    };
  }
});
</script>
<style>
.oem-row-id {
  padding-left: 10px;
  color: blue;
  cursor: pointer;
}
</style>
