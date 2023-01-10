<!--
 * @Author: your name
 * @Date: 2021-09-06 23:01:01
 * @LastEditTime: 2023-01-09 20:35:37
 * @LastEditors: zhao yongfei
 * @Description: In User Settings Edit
 * @FilePath: /dfs-page-config/src/components/CommonDialogNew.vue
-->
<template>
  <el-dialog
    v-model="dialog"
    :title="componentOption.label"
    :width="componentOption.width || 30"
    :before-close="handleClose"
    :top="componentOption.top || '15vh'"
    :modal="componentOption.modal || true"
    :show-close="componentOption.showClose || true"
    :close-on-press-escape="componentOption.escape || true"
    :close-on-click-modal="componentOption.clickModal || true"
    :center="componentOption.center || false"
  >
    <slot :componentOption="componentOption"></slot>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue";
import service from "@/utils/service";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
export default defineComponent({
  props: {
    componentOption: {
      type: Object,
    },
    pageKey: {
      // 页面唯一key
      type: String,
      required: true,
    },
    configOption: {
      type: Array,
    },
    data: {
      type: Object,
      default: {},
    },
  },
  setup(props: any, context) {
    let formRef = ref();
    const store = useStore();
    const state = reactive({
      data: <any>{},
      formGroup: [],
      buttonGroup: <any>[],
      formData: <any>{},
      dialog: true,
    });
    function showDialog() {
      state.dialog = true;
    }
    // 关闭弹窗
    function closeDialog() {
      return false;
      formRef.value.formRef.resetFields();
      state.dialog = false;
    }
    // 提交
    function submit() {
      formRef.value.formRef.validate((valid: boolean) => {
        if (valid) {
          if (props.popupData.data.submitBefore) {
            const checkResult = props.popupData.data.submitBefore();
            if (checkResult === false) return;
          }
          store.commit("setLoading", true);
          const formData = state.data.params(
            props.selectedRows,
            state.formData
          );
          let paramsKey = state.data.method == "GET" ? "params" : "data";
          service({
            url: store.state.baseUrl + state.data.url,
            [paramsKey]: formData || {},
            method: state.data.method || "POST",
          })
            .then((res: any) => {
              ElMessage.success("操作成功");
              closeDialog();
              context.emit("onSuccess", res);
            })
            .catch((err: any) => {
              console.log(err);
            })
            .finally(() => {
              store.commit("setLoading", false);
            });
        }
      });
    }
    return {
      ...toRefs(state),
      formRef,
      store,
      showDialog,
      submit,
      closeDialog,
    };
  },
});
</script>
