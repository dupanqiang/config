<!--
 * @Author: your name
 * @Date: 2021-09-06 23:01:01
 * @LastEditTime: 2023-01-16 21:37:02
 * @LastEditors: zhao yongfei
 * @Description: In User Settings Edit
 * @FilePath: /dfs-page-config/src/components/CommonDialog.vue
-->
<template>
  <el-dialog
    :title="component.title"
    v-model="dialog"
    :width="component.width || '500px'"
    :before-close="() => closeDialog()"
    center
    @open="showDialog"
    :close-on-click-modal="false"
  >
    <ChildrenComponent :configOption="component.children" :pageKey="pageKey"></ChildrenComponent>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref, nextTick } from "vue";
import { getTargetComp } from "@/common/js/pageConfigUtils";
import { useStore } from "vuex";
export default defineComponent({
  props: {
    pageKey: {
      type: String,
      required: true
    }
  },
  // emits: ['onSuccess'],
  setup(props: any, context) {
    const store = useStore();
    const state = reactive({
      data: <any> {},
      elementGroup: [],
      option:<any> {},
      component: {},
      dialog: false,
    });
    function showDialog() {
      const component = getTargetComp(store, props.pageKey, state.option.target)
      state.component = component
      // state.formData = {};
      // state.data = props.popupData.data;
      // state.elementGroup = props.popupData.data.elementGroup;
      // state.elementGroup = state.data.elementGroup || [];
      // if (props.popupData.type == "popup") {
      //   state.elementGroup.forEach((item: any) => {
      //     // 编辑
      //     if (props.popupData.edit) {
      //       state.formData[item.prop] = typeof item.getProp == "function" ? item.getProp(props.selectedRows[0]) : ((props.selectedRows[0][item.prop] || props.selectedRows[0][item.prop] == 0) ? props.selectedRows[0][item.prop] : item.value);
      //     } else {
      //       state.formData[item.prop] = item.value;
      //     }
      //   })
      // } else {
      //   state.formData = {}
      // }
      // state.dialog = true;
      // nextTick(() => {
      //   formRef.value.getSelectData()
      // })
    }
    // 关闭弹窗
    function closeDialog() {
      state.dialog = false;
    }
    return {
      ...toRefs(state),
      store,
      showDialog,
      // submit,
      closeDialog,
    };
  },
});
</script>
<!-- <style lang="less" scoped>
  &:deep(.el-form-item) {
    margin-bottom: 15px;
    display: flex;
    .el-form-item__content {
      flex: 1;
    }
  }
  &:deep(.btn-box .el-form-item) {
    display: inline-block;
  }
  .text-info {
    text-align: center;
    margin-bottom: 10px;
  }
  &:deep(.el-radio) {
    margin: 4px;
    margin-right: 15px;
  }
</style> -->
