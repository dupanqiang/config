<!--
 * @Author: zengkai
 * @Date: 2022-07-06 13:54:40
 * @LastEditTime: 2022-08-19 16:10:52
 * @LastEditors: zengkai
 * @FilePath: /dfs-page-vue/src/components/rowComponents/detileTag.vue
-->
<template>
  <div>
    <span
      class="labelText"
      :style="`width:${componentOption.labelWidth}`"
      v-if="componentOption.label"
      >{{ componentOption.label }}：
    </span>
    <el-tag>{{ componentOption.value }}</el-tag>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent } from "vue";
export default defineComponent({
  name: "tag",
  props: {
    componentOption: {
      type: Object,
    },
  },
  components: {},
  setup() {
    const state = reactive({});
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="less" scoped></style>
