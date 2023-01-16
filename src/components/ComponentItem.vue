<!--
 * @author: zhao yongfei
 * @Date: 2023-01-13 17:16:32
 * @description: 
 * @LastEditTime: 2023-01-16 15:23:53
 * @LastEditors: zhao yongfei
 * @FilePath: /dfs-page-config/src/components/ComponentItem.vue
-->
<template>
  <div class="ag-grid-container">
    <template v-for="comp in configOption" :key="comp.key">
      <component
        v-if="comp.type === 'SplitScreen'"
        :is="comp.type"
        :componentOption="comp"
        :pageKey="pageKey"
      >
        <template v-slot:top>
          <ComponentItem
            v-if="comp.topComponents && comp.topComponents.length"
            :pageKey="pageKey"
            :configOption="comp.topComponents"
          ></ComponentItem>
        </template>
        <template v-slot:bottom>
          <ComponentItem
            v-if="comp.downComponents && comp.downComponents.length"
            :pageKey="pageKey"
            :configOption="comp.downComponents"
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
import { initPage } from "@/common/js/pageConfigUtils";
import { useStore } from "vuex"

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
    const store = useStore()
    props.configOption.forEach((item: any) => {
      if ((item.type == "Form"  || item.type == "ButtonGroup") && item.elementGroup) {
        watch(() => item.elementGroup, (option) => {
          option && option.forEach((item: any) => {
          if (item.slot) item.slotName = item.slot + '_'
        })
        }, {immediate: true})
      }
    });
    if (!store.state._CONFIG_DATA[props.pageKey]) {
      initPage({pageKey: props.pageKey, components: props.configOption}, store);
    }
  },
});
</script>

<style lang="less" scoped>
  
</style>
