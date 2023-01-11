<!--
 * @Author: your name
 * @Date: 2022-02-23 18:28:00
 * @LastEditTime: 2023-01-11 20:44:48
 * @LastEditors: zhao yongfei
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /dfs-page-config/src/views/example2/components/logInfo.vue
-->
<template>
  <el-dialog
    :title="type == 'first' ? '预计首批到货日日志': '预计全部到货日日志'"
    v-model="dialog"
    width="800px"
    center
    @open="dialogOpen"
    :append-to-body="true"
  >
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, inject, reactive, toRefs, toRaw, watch } from "vue";
import { formatDate } from "@/utils/index";
export default defineComponent({
  props: {
    data: {
      type: Object
    },
    type: String
  },
  setup(props: any) {
    const state = reactive({
      dialog: false,
      configFlag: {
        //根据需求设置
        needPage: false, // 需要分页
        border: true,
      },
      totalNum: 0,
      pageInfo: {
        currentPage: 1,
        pageSize: 50,
      },
      columns: [
        {
          label: "操作时间",
          value: "createTime",
          width: "160px"
        },
        {
          label: "操作人",
          value: "createName",
          width: "120px"
        },
        {
          label: "变更内容",
          slot: "newTime",
        }
      ],
      dataList: []
    });
    function dialogOpen() {
      
    }
    // 关闭弹窗
    function closeDialog() {
      state.dialog = false;
    }
    return {
      ...toRefs(state),
      closeDialog,
      dialogOpen
    };
  },
});
</script>
<style lang="less">
  .change-record-dialog {
    margin-top: 8vh !important;
  }
</style>