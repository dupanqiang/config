<!--
 * @author: zhao yongfei
 * @Date: 2023-02-07 15:22:46
 * @description: 
 * @LastEditTime: 2023-02-07 16:08:14
 * @LastEditors: zhao yongfei
 * @FilePath: /dfs-page-config/src/components/Descriptions.vue
-->
<template>
  <el-descriptions
    :title="componentOption.title"
    :direction="componentOption.vertical || 'horizontal'"
    :column="componentOption.column || 1"
    :size="componentOption.size"
    :border="componentOption.border"
    :style="componentOption.style"
    style="margin-bottom: 10px;"
  >
    <el-descriptions-item
      v-for="item in componentOption.children"
      :key="item.text"
      :label="item.label"
      :span="item.span"
      :align="item.align || 'left'"
    >{{item.text}}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Descriptions",
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
    
  },
});
</script>

<!-- <style lang="less" scoped>

</style> -->
