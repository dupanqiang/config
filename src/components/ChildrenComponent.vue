<!--
 * @author: zhao yongfei
 * @Date: 2023-01-13 17:16:32
 * @description: 
 * @LastEditTime: 2023-02-07 15:30:07
 * @LastEditors: zhao yongfei
 * @FilePath: /dfs-page-config/src/components/ChildrenComponent.vue
-->
<template>
    <template v-for="comp in configOption" :key="comp.key">
      <component
        :is="comp.type"
        :componentOption="comp"
        :pageKey="pageKey"
      >
        <!-- <template v-for="item in comp.elementGroup||[].filter(item => item.slot)" :key="item.slot" v-slot:[item.slotName]>
          <slot :name="item.slot"></slot>
        </template> -->
        <ChildrenComponent
          v-if="comp.children && comp.children.length"
          :pageKey="pageKey"
          :configOption="comp.children"
        ></ChildrenComponent>
      </component>
    </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    pageKey: {
      type: String,
      required: true,
    },
    configOption: {
      type: Array,
      default: [],
    },
  },
  setup(props: any) {
    // props.configOption.forEach((item: any) => {
    //   if ((item.type == "Form"  || item.type == "ButtonGroup") && item.elementGroup) {
    //     watch(() => item.elementGroup, (option) => {
    //       option && option.forEach((item: any) => {
    //         if (item.slot) item.slotName = item.slot + '_'
    //       })
    //     }, {immediate: true})
    //   }
    // });
  },
});
</script>

<style lang="less" scoped>
  
</style>
