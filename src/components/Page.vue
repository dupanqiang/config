<!--
 * @author: zhao yongfei
 * @Date: 2023-01-10 13:02:15
 * @description: 
 * @LastEditTime: 2023-01-16 20:06:15
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
  <CommonDialog ref="dialogRef" :option="option" :pageKey="pageConfigData.pageKey"></CommonDialog>
  <!-- <CommonDialog ref="commonDialogRef" :popupData="popupData" :selectedRows="selectedRows" :selectedNodes="selectedNodes" @on-success="handleSuccess"></CommonDialog> -->
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, watch, onActivated } from "vue";
import { useStore } from "vuex";
import { initPage, tableQuery, queryData, getTargetComp } from "@/common/js/pageConfigUtils";
import { handleEnter } from "@/utils";
import CellOperationBtn from "@/components/CellOperationBtn.vue"
import CellItemEdit from "@/components/CellItemEdit.vue"
import { ElMessage } from "element-plus";

export default defineComponent({
  components: {
    CellOperationBtn,
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
    let target: string;
    const state = reactive({
      popupData: <any> undefined,
      selectedRows: [],
      selectedNodes: []
    })

    let pageConfigData = props.pageConfigData;
    let components = []
    pageConfigData.components.forEach(copm => {
      if (copm.type === 'SplitScreen') {
        if (copm.topComponents && copm.downComponents) {
          components = copm.topComponents.concat(copm.downComponents)
        }
      } else {
        components = pageConfigData.components
      }
    })
    // 将handleFn添加到form对象
    addHandleFn(components);
    
    function handleFn({option, row}: any) {
      // 自定义方法
      if (option.unwantSelectData && option.handleFn) { // 不需要table数据
        option.handleFn(option)
      } else if (option.handleFn) {
        state.selectedRows = row ? [row] : getTargetComp(store, pageConfigData.pageKey, option.target).selectedRows || [];
        if (state.selectedRows.length == 0) return ElMessage.warning("请选择数据");
        option.handleFn(option, state.selectedRows)
      } else {
        // 弹窗
        for (let i = 0, popupGroup = pageConfigData.popupGroup; i < popupGroup.length; i++) {
          if (popupGroup[i].key === option.target) {
            state.popupData = popupGroup[i];
            target = popupGroup[i].target;
            break;
          }
        }
        state.selectedRows = row ? [row] : getTargetComp(store ,pageConfigData.pageKey, state.popupData.target).selectedRows || [];
        state.selectedNodes = getTargetComp(store ,pageConfigData.pageKey, state.popupData.target).selectedNodes || [];
        if (state.selectedRows.length == 0 && !option.unwantSelectData) return ElMessage.warning("请选择数据");
        // 显示弹窗之前钩子
        if (state.popupData.showDialogBefore) {
          if (state.popupData.showDialogBefore(state.selectedRows) === false) {
            return
          }
        }
        dialogRef.value.dialog = true;
      }
    }
    
    function handleSuccess(res: any) {
      state.popupData.data.isQueryList !== false && getData();
      if (state.popupData.data.callback) {
        state.popupData.data.callback(res, state.selectedRows, state.selectedNodes)
      }
      if (state.popupData.data.updateTabData) {
        getTargetComp(store, pageConfigData.pageKey, state.popupData.data.updateTabData.target).updateTabData()
      }
    }

    // 将handleFn添加到form对象
    function addHandleFn(components: any[]) {
      components.forEach((item: any) => {
        // if (item.type == "Form" || item.widget == "AgTable") {
        //   item.handle = handleFn
        // }
        // 设置form按钮插槽的slotName
        if ((item.type == "Form" || item.type == "ButtonGroup") && item.elementGroup) {
          watch(() => item.elementGroup, (elementGroup) => {
            elementGroup && setSlotName(elementGroup)
          }, {immediate: true})
        }
      });
    }
    // 设置form按钮插槽的slotName
    function setSlotName(options: any[]) {
      options.forEach((item: any) => {
        if (item.slot) item.slotName = item.slot + '_'
      })
    }
    // 初始化页面
    initPage({pageKey: pageConfigData.pageKey, components: components, dialogRef: dialogRef}, store);

    // 查询
    function getData() {
      tableQuery(store, pageConfigData.pageKey, target)
    }
    onActivated(() => {
      // 回车查询
      handleEnter(() => {
        queryData(pageConfigData.pageKey, store)
      })
    })
    return {
      ...toRefs(state),
      dialogRef,
      handleSuccess
    }
  },
});
</script>

<style lang="less" scoped>
  
</style>
