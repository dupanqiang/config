<!--
 * @Author: Do not edit
 * @Date: 2022-11-21 15:17:57
 * @LastEditTime: 2023-01-11 20:36:47
 * @LastEditors: zhao yongfei
 * @Description: 生产过程标签的优化
 * @FilePath: /dfs-page-config/src/views/example2/components/productionProcessLabel.vue
-->
<template>
  <el-dialog
    :title="title"
    v-model="dialogState"
    width="450px"
    :before-close="closeDialog"
    center
  >
    <el-form ref="formRef" :model="dataItem" :rules="rules" label-width="0">
      <el-form-item prop="lable">
        <el-checkbox-group v-model="dataItem.lable">
          <el-checkbox
            v-for="item in list"
            :key="item.name"
            :label="item.name"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog" size="small">取 消</el-button>
        <el-button type="primary" @click="submit" size="small">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import { defineComponent, inject, reactive, toRefs, ref } from "vue";
export default defineComponent({
  props: {
    ids: {
      type: Array,
      default: [],
    },
    title: String,
    list: {
      type: Array,
      default: [],
    },
    type: {
      type: Number, // type为1 是 面料建议-缺货原因  2是: 采购建议-未下单原因
    },
  },
  emits: ["onCallback"],
  setup(props, context) {
    const store = useStore();
    const formRef = ref();
    const state = reactive({
      dataItem: {
        lable: [],
      },
      rules: {},
      dialogState: false,
    });
    function showDialog() {
      state.dialogState = true;
      state.dataItem.lable = [];
    }
    // 关闭弹窗
    function closeDialog() {
      formRef.value.resetFields();
      state.dialogState = false;
    }
    // 提交
    function submit() {
      const params: any = {};
      let URL = <any>null;
    
        params.purchaseOrderIdList = props.ids;
        params.notSubmitReasonList = state.dataItem.lable
      URL(params)
        .then(() => {
          ElMessage.success("操作成功");
          context.emit("onCallback");
          closeDialog();
        })
        .finally(() => {
          store.commit("setLoading", false);
        });
    }
    return {
      formRef,
      ...toRefs(state),
      showDialog,
      closeDialog,
      submit,
    };
  },
});
</script>
<style lang="less" scoped>
</style>