<!--
 * @Author: your name
 * @Date: 2021-07-06 21:52:31
 * @LastEditTime: 2023-07-12 21:59:29
 * @LastEditors: zhao yongfei
 * @Description: In User Settings Edit
 * @FilePath: /dfs-page-config/src/components/Upload.vue
-->
<template>
  <el-upload
    style="display: inline-flex"
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
    <span
      v-if="type === 'text'"
      class="dfs-text-btn"
      :style="style"
      :disabled="uploading"
    >{{ text }}
    </span>
    <el-button v-else :size="size" :type="buttonType" :disabled="uploading">
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
    type: {
      type: String,
      default: "button",
    },
    style: {
      type: Object,
      default: {},
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
    function uploadError(err) {
      const errString = err.toString()
      const reg =  /"msg"\s*:\s*"(.+?)"/;
      const match = errString.match(reg)
      if (match) {
        ElMessage.error(match[1]);
      }
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
