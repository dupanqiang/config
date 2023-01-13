<!--
 * @author: zhao yongfei
 * @Date: 2023-01-13 17:16:32
 * @description: 
 * @LastEditTime: 2023-01-13 17:46:30
 * @LastEditors: zhao yongfei
 * @FilePath: /dfs-page-config/src/components/ComponentItem.vue
-->
<template>
  <div class="ag-grid-container">
    <template v-for="comp in configOption" :key="comp.key">
      <component
        v-if="comp.type === 'SplitScreenTempl'"
        :is="comp.type"
        :componentOption="comp"
        :pageKey="pageKey"
      >
        <template v-slot:top>
          <ComponentItem
            v-if="comp.children && itemChild.children.length"
            :pageKey="pageKey"
            :configOption="itemChild.children"
          ></ComponentItem>
        </template>
        <template v-slot:bottom>
          <ComponentItem
            v-if="comp.children && itemChild.children.length"
            :pageKey="pageKey"
            :configOption="itemChild.children"
          ></ComponentItem>
        </template>
      </component>
      <slot v-else-if="comp.slot" :name="comp.slot"></slot>
      <component
        v-else
        :is="comp.type"
        :componentOption="comp"
        :pageKey="pageKey"
      >
        <template v-for="item in comp.elementGroup||[].filter(item => item.slot)" :key="item.slot" v-slot:[item.slotName]>
          <slot :name="item.slot"></slot>
        </template>
        <ComponentItem
          v-if="comp.children && comp.children.length"
          :pageKey="pageKey"
          :configOption="comp.children"
        ></ComponentItem>
      </component>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";

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
  setup(props) {
    console.log(props.configOption)
    props.configOption.forEach((item: any) => {
      if ((item.type == "Form"  || item.type == "ButtonGroup") && item.elementGroup) {
        watch(() => item.elementGroup, (option) => {
          option && option.forEach((item: any) => {
          if (item.slot) item.slotName = item.slot + '_'
        })
        }, {immediate: true})
      }
    });
  },
});
</script>

<style lang="less" scoped>
  
</style>
