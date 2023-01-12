<!--
 * @author: zhao yongfei
 * @Date: 2023-01-10 13:02:15
 * @description: 
 * @LastEditTime: 2023-01-13 01:42:37
 * @LastEditors: zhao yongfei
 * @FilePath: /dfs-page-config/src/components/Page.vue
-->
<template>
  <div class="ag-grid-container">
    <SplitScreenTempl v-if="pageConfigData.splitScreen">
      <!-- 列表页 -->
      <template v-slot:list>
        <template v-for="comp in pageConfigData.components" :key="comp.widget">
          <!-- 头部状态按钮 -->
          <!-- <StatusGroup v-if="comp.widget === 'statusGroup'" :statusComp="comp" :pageKey="pageConfigData.pageKey"></StatusGroup> -->
          <!-- <dbsFormNew v-if="comp.widget === 'searchForm'" :formComp="comp" :pageKey="pageConfigData.pageKey"></dbsFormNew> -->
          <slot v-if="comp.widget === 'searchForm'" name="slot1"></slot>
          <!-- <dbsAgGrid v-if="comp.widget === 'Table'" :tableComp="comp" :pageKey="pageConfigData.pageKey">
            <template v-slot:[comp.configFlag?.slotName]>
              <slot :name="comp.configFlag?.slotName"></slot>
            </template>
          </dbsAgGrid> -->
        </template>
      </template>
      <!-- 详情页 -->
      <template v-slot:details>
        <template v-for="downComp in pageConfigData.downComponents" :key="downComp.key">
          <!-- <dbsFormNew v-if="downComp.widget === 'searchForm'" :formComp="downComp" :pageKey="pageConfigData.pageKey">
            <template v-for="item in downComp.buttonGroup.filter(item => item.slot)" :key="item.slot" v-slot:[item.slotName]>
              <slot :name="item.slot"></slot>
            </template>
          </dbsFormNew> -->
          <!-- <dbsAgGrid
            v-if="downComp.widget === 'Table'"
            :tableComp="downComp"
            :pageKey="pageConfigData.pageKey"
          ></dbsAgGrid> -->
        </template>
      </template>
    </SplitScreenTempl>
    <template v-else v-for="comp in pageConfigData.components" :key="comp.key">
      <component
        :is="comp.type"
        :componentOption="comp"
        :pageKey="pageConfigData.pageKey"
      >
        <template v-for="comp in comp.children" :key="comp.key">
          <component
            :style="comp.style"
            :is="comp.type"
            :componentOption="comp"
            :pageKey="pageConfigData.pageKey"
          >
          </component>
        </template>
      </component>
      <!-- 头部状态按钮 -->
      <!-- <StatusGroup v-if="comp.widget === 'statusGroup'" :comp="comp" :pageKey="pageConfigData.pageKey"></StatusGroup>
      <searchForm v-if="comp.widget === 'searchForm'" :comp="comp" :pageKey="pageConfigData.pageKey">
        <template v-for="item in comp.formGroup.filter(item => item.slot)" :key="item.slot" v-slot:[item.slotName]>
          <slot :name="item.slot"></slot>
        </template>
        <template v-for="item in comp.buttonGroup.filter(item => item.slot)" :key="item.slot" v-slot:[item.slotName]>
          <slot :name="item.slot"></slot>
        </template>
      </searchForm>
      <slot v-if="comp.widget === 'searchForm'" name="slot1"></slot>
      <Table v-if="comp.widget === 'Table'" :comp="comp" :pageKey="pageConfigData.pageKey"></Table> -->
    </template>
  </div>
  <CommonDialog ref="commonDialogRef" :popupData="popupData" :selectedRows="selectedRows" :selectedNodes="selectedNodes" @on-success="handleSuccess"></CommonDialog>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, watch, onActivated } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { initPage, tableQuery, queryData, getTargetComp } from "@/common/js/pageConfigUtils";
import { handleEnter } from "@/utils";
import Form from "@/components/Form.vue";
import ButtonGroup from "@/components/ButtonGroup.vue";
import AgTable from "@/components/AgTable.vue";
import CommonDialog from "./CommonDialog.vue";
import CellOperationBtn from "@/components/CellOperationBtn.vue"
import CellItemEdit from "@/components/CellItemEdit.vue"
import { ElMessage } from "element-plus";

export default defineComponent({
  components: {
    Form,
    ButtonGroup,
    AgTable,
    CommonDialog,
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
    const router = useRouter();
    const commonDialogRef = ref();
    let target: string;
    const state = reactive({
      popupData: <any> undefined,
      selectedRows: [],
      selectedNodes: []
    })

    let pageConfigData = props.pageConfigData;
    // 将handleFn添加到form对象
    addHandleFn(pageConfigData.components);
    if (pageConfigData.downComponents) {
      addHandleFn(pageConfigData.downComponents);
    }
    
    function handleFn({option, row}: any) {
      // 跳转
      if (option.event == "jump") {
        if (option.jumpParams) {
          const routerParams: any = {};
          if (option.jumpParams.params) {
            const params = option.jumpParams.params;
            Object.keys(params).forEach((key: string) => {
              if (typeof params[key] === 'function') {
                routerParams[key] = params[key](row)
              } else {
                routerParams[key] = params[key]
              }
            });
          }
          router.push({name: option.jumpParams.name, params: routerParams})
        } else if (option.jumpFn) {
          option.jumpFn(row)
        }
      } else {
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
          commonDialogRef.value.dialog = true;
        }
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
        if (item.widget == "searchForm" || item.widget == "Table") {
          item.handle = handleFn
        }
        // 设置form按钮插槽的slotName
        if (item.widget == "searchForm" && item.buttonGroup) {
          watch(() => item.buttonGroup, () => {
            setSlotName(item.buttonGroup)
          }, {immediate: true})
          watch(() => item.formGroup, (formGroup) => {
            formGroup && setSlotName(formGroup)
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
    initPage({pageKey: pageConfigData.pageKey, components: pageConfigData.components}, store);

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
      commonDialogRef,
      handleSuccess
    }
  },
});
</script>

<style lang="less" scoped>
  
</style>
