<!--
 * @Author: your name
 * @Date: 2021-09-06 23:01:01
 * @LastEditTime: 2023-08-01 21:15:19
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
    <template #header>
      <p>
        <el-icon v-if="component.dialogType==='warning'" style="position: relative; top: 2px;"><WarningFilled color="#e6a23c" /></el-icon>
        {{component.title}}
      </p>
    </template>
    <ChildrenComponent :configOption="component.children" :pageKey="pageKey"></ChildrenComponent>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { getTargetComp } from "@/common/js/pageConfigUtils";
import { useStore } from "vuex";
import {WarningFilled} from "@element-plus/icons-vue"
export default defineComponent({
  name: "CommonDialog",
  components: {WarningFilled},
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
