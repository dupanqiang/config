<!--
 * @Author: your name
 * @Date: 2021-09-06 23:01:01
 * @LastEditTime: 2023-01-17 16:15:26
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
  setup(props: any) {
    const store = useStore();
    const state = reactive({
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
    function closeDialog() {
      state.dialog = false;
    }
    return {
      ...toRefs(state),
      store,
      showDialog,
      closeDialog,
    };
  },
});
</script>
<!-- <style lang="less" scoped>
  
</style> -->
