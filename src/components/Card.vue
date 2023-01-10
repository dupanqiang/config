<!--
 * @Author: your name
 * @Date: 2021-08-26 19:43:30
 * @LastEditTime: 2022-08-13 15:23:33
 * @LastEditors: zhao yongfei
 * @Description: In User Settings Edit
 * @FilePath: /dfs-page-vue/src/components/Card.vue
-->
<template>
  <el-card class="components-card" :style="componentOption.style">
    <template v-slot:header>
      <div class="clearfix">
        <span>{{ componentOption.label }}</span>
      </div>
    </template>
    <slot></slot>
  </el-card>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent } from "vue";

export default defineComponent({
  name: "Card",
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
  setup() {
    const state = reactive({});
    return {
      ...toRefs(state),
    };
  },
});
</script>

<!-- <style lang="less" scoped>
.components-card {
  display: flex;
  flex-direction: column;
  &:deep(.el-card__body) {
    flex: 1;
  }
}
</style> -->
