<!--
 * @Author: zengkai
 * @Date: 2022-08-03 18:10:06
 * @LastEditTime: 2022-08-04 16:42:28
 * @Description: 
 * @LastEditors: zengkai
 * @FilePath: /odm-pc/src/components/dbsDetile/components/imgCarousel.vue
-->
<template>
  <div :style="componentOption.style">
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="item in componentOption.value" :key="item">
        <img :src="item" alt="" lazy />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent } from "vue";
export default defineComponent({
  name: "ImgCarousel",
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

<style lang="less" scoped>
img {
  width: 100%;
}
</style>
