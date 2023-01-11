<!--
 * @Author: your name
 * @Date: 2021-09-06 23:01:01
 * @LastEditTime: 2023-01-11 14:27:50
 * @LastEditors: zhao yongfei
 * @Description: In User Settings Edit
 * @FilePath: /dfs-page-config/src/components/CommonDialog.vue
-->
<template>
  <el-dialog
    :title="data.title"
    v-model="dialog"
    :width="data.width || '500px'"
    :before-close="() => closeDialog()"
    center
    @open="showDialog"
    :close-on-click-modal="false"
  >
    <template v-if="data.infoText" class="text-info">
      <div v-if="typeof data.infoText == 'function'" v-html="data.infoText(selectedRows)"></div>
      <p v-else>{{ data.infoText }}</p>
    </template>
    <!-- <SubmitForm
      ref="formRef"
      :labelWidth="data.labelWidth"
      size="small"
      :formData="formData"
      :formGroup="formGroup"
      :inline="data.inline"
    >
    </SubmitForm> -->
    <template #footer>
      <span class="dialog-footer">
        <template v-for="item in buttonGroup" :key="item.event">
          <el-button v-if="item.event === 'cancel'" @click="closeDialog" size="small">{{ item.text }}</el-button>
          <el-button v-if="item.event === 'submit'" type="primary" @click="submit" size="small">{{ item.text }}</el-button>
        </template>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref, nextTick } from "vue";
import service from "@/utils/service";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
// import SubmitForm from "./SubmitForm.vue"
export default defineComponent({
  // components: { SubmitForm },
  props: {
    popupData: {
      type: Object,
      default: {
        data: {
          formGroup: [],
          buttonGroup: []
        }
      }
    },
    selectedRows: Array
  },
  emits: ['onSuccess'],
  setup(props: any, context) {
    let formRef = ref()
    const store = useStore();
    const state = reactive({
      data: <any> {},
      formGroup: [],
      buttonGroup:<any> [],
      formData:<any> {},
      dialog: false,
    });
    function showDialog() {
      state.formData = {};
      state.data = props.popupData.data;
      state.buttonGroup = props.popupData.data.buttonGroup;
      state.formGroup = state.data.formGroup || [];
      if (props.popupData.type == "popup") {
        state.formGroup.forEach((item: any) => {
          // 编辑
          if (props.popupData.edit) {
            state.formData[item.prop] = typeof item.getProp == "function" ? item.getProp(props.selectedRows[0]) : ((props.selectedRows[0][item.prop] || props.selectedRows[0][item.prop] == 0) ? props.selectedRows[0][item.prop] : item.value);
          } else {
            state.formData[item.prop] = item.value;
          }
        })
      } else {
        state.formData = {}
      }
      state.dialog = true;
      nextTick(() => {
        formRef.value.getSelectData()
      })
    }
    // 关闭弹窗
    function closeDialog() {
      formRef.value.formRef.resetFields();
      state.dialog = false;
    }
    // 提交
    function submit() {
      formRef.value.formRef.validate((valid: boolean) => {
        if (valid) {
          if (props.popupData.data.submitBefore) {
            const checkResult = props.popupData.data.submitBefore();
            if(checkResult === false) return;
          }
          store.commit("setLoading", true);
          const formData = state.data.params(props.selectedRows, state.formData)
          let paramsKey = state.data.method == "GET" ? "params" : "data"
          service({
            url: store.state.baseUrl + state.data.url,
            [paramsKey]: formData || {},
            method: state.data.method || "POST"
          })
          .then((res: any) => {
            ElMessage.success("操作成功");
            closeDialog()
            context.emit("onSuccess", res);
          }).catch((err: any)=>{
            console.log(err)
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
