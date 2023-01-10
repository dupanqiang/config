<!--
 * @Author: zengkai
 * @Date: 2022-05-31 20:00:56
 * @LastEditTime: 2022-06-28 12:08:05
 * @LastEditors: zengkai
 * @FilePath: /odm-pc/src/components/dbsDetile/components/imageOne.vue
-->
<template>
  <div :style="componentOption.style">
    <img
      style="width: 100%; height: 100%"
      :src="componentOption.value[0]"
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
      type: Object,
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
