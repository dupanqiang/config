<!--
 * @Author: zengkai
 * @Date: 2022-06-30 18:36:43
 * @LastEditTime: 2022-08-22 20:26:48
 * @LastEditors: zengkai
 * @FilePath: /dfs-page-vue/src/components/rowComponents/col.vue
-->
<template>
  <el-col :style="style" :class="class" :span="span" :offset="offset">
    <slot />
  </el-col>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent } from "vue";
export default defineComponent({
  name: "Col",
  components: {},
  props: {
    style: {
      type: String,
      default: "",
    },
    class: {
      type: String,
      default: "",
    },
    span: {
      type: Number,
      default: 24,
    },
    offset: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const state = reactive({});
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="less" scoped></style>
