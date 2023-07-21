<!--
 * @Author: Do not edit
 * @Date: 2023-04-06 18:11:58
 * @LastEditTime: 2023-07-21 14:38:00
 * @LastEditors: zhao yongfei
 * @Description: In User Settings Edit
 * @FilePath: /dfs-page-config/src/components/HeaderTip.vue
-->
<template>
  <span class="ag-header-cell-tip">
    <img class="" src="@/assets/images/helpbg.gif" alt="" :title="params.text">
    {{params.displayName}}
  </span>
</template>
<script lang="ts">
import {
  reactive,
  toRefs,
  defineComponent,
  onBeforeMount,
  getCurrentInstance,
} from "vue";

export default defineComponent({
  setup() {
    const state = reactive({
      params: <any>{}
    });
    onBeforeMount(() => {
      const { data }:any = getCurrentInstance();
      state.params = data.params;
    });
    return {
      ...toRefs(state)
    };
  },
});
</script>
