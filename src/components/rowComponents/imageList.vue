<!--
 * @Author: zengkai
 * @Date: 2022-05-31 20:00:56
 * @LastEditTime: 2022-08-19 16:11:00
 * @LastEditors: zengkai
 * @FilePath: /dfs-page-vue/src/components/rowComponents/imageList.vue
-->
<template>
  <div>
    <span
      class="labelText"
      :style="`width:${componentOption.labelWidth}`"
      v-if="componentOption.label"
      >{{ componentOption.label }}：
    </span>
    <img
      :style="
        componentOption.style || 'width: 80px; height: 80px; margin-right: 10px'
      "
      v-for="componentOptionItem in componentOption.value"
      :src="componentOptionItem"
      alt=""
    />
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent } from "vue";
export default defineComponent({
  name: "imageList",
  components: {},
  props: {
    componentOption: {
      type: Array,
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
