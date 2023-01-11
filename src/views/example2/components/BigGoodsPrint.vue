<!--
 * @author: zhao yongfei
 * @Date: 2022-02-14 22:13:46
 * @description: 
 * @LastEditTime: 2023-01-11 20:46:26
 * @LastEditors: zhao yongfei
 * @FilePath: /dfs-page-config/src/views/example2/components/BigGoodsPrint.vue
-->
<template>
  <el-dialog
    title="打印版单"
    v-model="dialog"
    width="98%"
    center
    :append-to-body="true"
  >
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  props: {
    data: {
      type: Object,
    },
  },
  setup(props: any) {
    const state = reactive({
      dialog: false,
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>
<style lang="less">
.big-goods-dialog {
  margin: 1vh auto 0 !important;
  .el-dialog__body {
    height: 94vh;
  }
}
</style>
