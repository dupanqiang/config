<!--
 * @Author: your name
 * @Date: 2021-07-06 21:52:31
 * @LastEditTime: 2023-01-11 18:23:01
 * @LastEditors: zhao yongfei
 * @Description: In User Settings Edit
 * @FilePath: /dfs-page-config/src/components/Upload.vue
-->
<template>
  <el-upload
    style="display: inline-block"
    class="upload-demo"
    :action="uploadUrl"
    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
    :with-credentials="true"
    multiple
    :show-file-list="false"
    :before-upload="beforeUpload"
    :on-success="uploadSuccess"
    :on-error="uploadError"
    :disabled="uploading"
    :headers="headers"
    :data="params"
  >
    <el-button :size="size" :type="buttonType" :disabled="uploading">
      {{text}}
    </el-button>
  </el-upload>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from "vue";
import { useStore } from "vuex"
import { ElMessage } from "element-plus";
export default defineComponent({
  props: {
    url: String,
    text: {
      type: String,
      default: "导入",
    },
    buttonType: {
      type: String,
      default: "success",
    },
    params: {
      type: Object,
      default: {},
    },
    size: String
  },
  emits: ["onSuccess"],
  setup(props, context) {
    const store = useStore()
    const state = reactive({
      uploadUrl: computed(
        () => store.state._BASE_URL + props.url
      ),
    });
    const uploading = ref(false);
    const headers = {
      "system-source": "WEB",
      currency: "USD",
      lang: navigator.language,
      "app-id": "0",
    };
    // 上传
    function beforeUpload() {
      uploading.value = true;
    }
    // 上传成功
    function uploadSuccess(res: any) {
      if (res.code == 0) {
        ElMessage.success(res.msg || "上传成功");
      } else {
        ElMessage.error(res.msg);
      }
      uploading.value = false;
      context.emit("onSuccess", res);
    }
    // 失败
    function uploadError() {
      console.log(1111);
    }
    return {
      ...toRefs(state),
      headers,
      uploading,
      beforeUpload,
      uploadSuccess,
      uploadError,
    };
  },
});
</script>
