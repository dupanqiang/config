<!--
 * @author: zhao yongfei
 * @Date: 2022-02-14 22:05:50
 * @description: 
 * @LastEditTime: 2022-09-22 10:46:04
 * @LastEditors: zengkai
 * @FilePath: /odm-pc/src/views/purchase/purchaseList/components/CellBomNo.vue
-->
<template>
  <div v-if="!params.node?.rowPinned">
    <span
      style="cursor: pointer; color: blue; text-decoration: underline"
      @click.stop="showBomInfo(params)"
    >
      {{ row.bomNo }}
    </span>
    <span
      v-if="row.bomId"
      style="cursor: pointer; color: blue; margin-left: 8px"
      @click.stop="printBomInfo(params)"
    >
      打印
    </span>
    <span
      style="cursor: pointer; color: blue; margin-left: 8px"
      @click.stop="wachInfo(params)"
    >
      洗水唛
    </span>
  </div>
</template>
<script>
import {
  reactive,
  toRefs,
  defineComponent,
  onMounted,
  getCurrentInstance,
} from "vue";
import { ElButton } from "element-plus";

export default defineComponent({
  components: {
    ElButton,
  },
  setup() {
    const { ctx } = getCurrentInstance();
    const state = reactive({
      row: {},
      params: {},
    });
    function showBomInfo({ api, rowIndex, data }) {
      state.params.showBomInfo(data);
    }
    function printBomInfo({ api, rowIndex, data }) {
      state.params.printBomInfo(data);
    }
    function wachInfo({ api, rowIndex, data }) {
      state.params.wachInfo(data);
    }

    onMounted(() => {
      state.row = ctx.params.data;
      state.params = ctx.params;
    });
    return {
      ...toRefs(state),
      showBomInfo,
      printBomInfo,
      wachInfo,
    };
  },
});
</script>
