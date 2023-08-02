<!--
 * @author: zhao yongfei
 * @Date: 2023-01-10 13:02:15
 * @description: 
 * @LastEditTime: 2023-08-02 12:01:44
 * @LastEditors: zhao yongfei
 * @FilePath: /dfs-page-config/src/components/Page.vue
-->
<template>
  <div class="ag-grid-container">
    <template v-for="comp in pageConfigData.components.filter(item => item.type !== 'dialog')" :key="comp.key">
      <slot v-if="comp.slot" :name="comp.slot"></slot>
      <component
        v-else-if="comp.type === 'SplitScreen'"
        :is="comp.type"
        :componentOption="comp"
        :pageKey="pageConfigData.pageKey"
      >
        <template v-slot:top>
          <template v-for="(comp, index) in comp.topComponents.filter(item => item.type !== 'dialog')" :key="comp.key || index">
            <slot v-if="comp.slot" :name="comp.slot"></slot>
            <component
              :is="comp.type"
              :componentOption="comp"
              :pageKey="pageConfigData.pageKey"
            >
              <template v-for="item in comp.elementGroup||[].filter(item => item.slot)" :key="item.slot" v-slot:[item.slotName]>
                <slot :name="item.slot"></slot>
              </template>
              <ChildrenComponent :configOption="comp.children" :pageKey="pageConfigData.pageKey"></ChildrenComponent>
            </component>
          </template>
        </template>
        <template v-slot:bottom>
          <template v-for="comp in comp.downComponents.filter(item => item.type !== 'dialog')" :key="comp.key">
            <slot v-if="comp.slot" :name="comp.slot"></slot>
            <component
              :is="comp.type"
              :componentOption="comp"
              :pageKey="pageConfigData.pageKey"
            >
              <template v-for="item in comp.elementGroup||[].filter(item => item.slot)" :key="item.slot" v-slot:[item.slotName]>
                <slot :name="item.slot"></slot>
              </template>
              <ChildrenComponent :configOption="comp.children" :pageKey="pageConfigData.pageKey"></ChildrenComponent>
            </component>
          </template>
        </template>
      </component>
      <component
        v-else
        :is="comp.type"
        :componentOption="comp"
        :pageKey="pageConfigData.pageKey"
      >
        <template v-for="item in comp.elementGroup||[].filter(item => item.slot)" :key="item.slot" v-slot:[item.slotName]>
          <slot :name="item.slot"></slot>
        </template>
        <ChildrenComponent :configOption="comp.children" :pageKey="pageConfigData.pageKey"></ChildrenComponent>
      </component>
    </template>
  </div>
  <CommonDialog ref="dialogRef" :pageKey="pageConfigData.pageKey"></CommonDialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { handleEnter } from "@/utils";
import { useStore } from "vuex";
import { initPage, queryData } from "@/common/js/pageConfigUtils";
import HeaderTip from "@/components/HeaderTip.vue"
import CellOperation from "@/components/CellOperation.vue"
import CellItemEdit from "@/components/CellItemEdit.vue"

export default defineComponent({
  components: {
    HeaderTip,
    CellOperation,
    CellItemEdit
  },
  props: {
    pageConfigData: {
      type: Object,
      default: {}
    }
  },
  setup(props) {
    const store = useStore();
    const dialogRef = ref();
    let pageConfigData = props.pageConfigData;
    let components = []
    pageConfigData.components.forEach(copm => {
      if (copm.type === 'SplitScreen') {
        if (copm.topComponents && copm.downComponents) {
          components.push(...copm.topComponents, ...copm.downComponents)
        }
      } else {
        components.push(copm)
      }
    })
    components.forEach((item: any) => {
      if ((item.type == "Form" || item.type == "ButtonGroup") && item.elementGroup) {
        watch(() => item.elementGroup, (elementGroup) => {
          elementGroup && setSlotName(elementGroup)
        }, {immediate: true})
      }
    });
    // 设置form按钮插槽的slotName
    function setSlotName(options: any[]) {
      options.forEach((item: any) => {
        if (item.slot) item.slotName = item.slot + '_'
      })
    }
    // 初始化页面
    initPage({pageKey: pageConfigData.pageKey, components: components, dialogRef: dialogRef}, store);
    handleEnter((ev: any) => {
      const pageKey = ev.target.dataset.pagekey
      const target = ev.target.dataset.target
      if (target) {
        queryData(store, pageKey, target)
      }
    })
    return {
      dialogRef
    }
  },
});
</script>

<style lang="less" scoped>
  
</style>
