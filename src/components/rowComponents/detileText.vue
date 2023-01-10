<!--
 * @Author: zengkai
 * @Date: 2022-07-06 13:54:40
 * @LastEditTime: 2022-08-19 16:09:44
 * @LastEditors: zengkai
 * @FilePath: /dfs-page-vue/src/components/rowComponents/detileText.vue
-->
<template>
  <div>
    <span
      class="labelText"
      :style="`width:${componentOption.labelWidth}`"
      v-if="componentOption.label"
      >{{ componentOption.label }}：
    </span>
    <span>{{ componentOption.value }}</span>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent } from "vue";
import "./common.less";
export default defineComponent({
  name: "text",
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

<style lang="less" scoped>
.labelText {
  display: inline-block;
  text-align: right;
}
</style>
