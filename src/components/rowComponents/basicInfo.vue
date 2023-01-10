<!--
 * @Author: zengkai
 * @Date: 2022-06-19 23:36:54
 * @LastEditTime: 2022-08-17 11:51:30
 * @LastEditors: zengkai
 * @FilePath: /dfs-page-vue/src/components/rowComponents/basicInfo.vue
-->
<template>
  <el-row style="display: flex; align-items: center">
    <el-col
      style="padding: 10px 0"
      :span="itemChild.span"
      v-for="(itemChild, index) in componentOption.children"
    >
      <slot :itemChild="itemChild"></slot>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent } from "vue";
import componentsMap from "./componentsMap.vue";
import RowItem from "./rowItem.vue";
export default defineComponent({
  name: "BasicInformation",
  components: {
    ComponentsMap: componentsMap,
    RowItem,
  },
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
.containerInfo {
  display: flex;
  align-items: center;
}
</style>
