<!--
 * @Author: your name
 * @Date: 2021-08-24 11:46:08
 * @LastEditTime: 2023-01-14 10:30:15
 * @LastEditors: zhao yongfei
 * @Description: In User Settings Edit
 * @FilePath: /dfs-page-config/src/components/ButtonGroup.vue
-->
<template>
  <div class="button-group" :style="componentOption.style">
    <template v-for="item in buttonGroup" :key="item.text">
      <template v-if="!item.slot">
        <!-- 文件上传 -->
        <Upload
          v-if="item.event === 'upload'"
          :url="item.url"
          :text="item.text"
          @on-success="queryData"
          :buttonType="item.buttonType"
          :size="size"
        ></Upload>
        <el-button
          v-else-if="item.event"
          :type="item.buttonType || 'primary'"
          :size="size"
          @click="handleClick(item)"
        >{{ item.text }}
        </el-button>
        <el-button
          v-else
          :type="item.buttonType || 'primary'"
          :size="size"
          @click="handleClick(item)"
          :disabled="item.disabled && item.disabled()"
        >{{ item.text }}
        </el-button>
      </template>
      <template v-else>
        <slot :name="item.slot + '_'"></slot>
      </template>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, computed, toRefs } from "vue";
import { useStore } from "vuex";
// import { useRoute } from "vue-router";
import { downLoadData } from "@/utils/index";
import Upload from "@/components/Upload.vue";
import { getTargetComp, getRelationComp } from "@/common/js/pageConfigUtils";

export default defineComponent({
  name: "ButtonGroup",
  components: { Upload },
  props: {
    pageKey: {
      type: String,
      default: "",
    },
    componentOption: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const store = useStore();
    const state = reactive({
      buttonGroup: computed(() => {
        return props.componentOption.elementGroup.filter((item: any) => {
          if (typeof item.isShow === "function") {
            if (item.relation) {
              const components = getRelationComp(store, props.pageKey, item.relation)
              return item.isShow(components)
            }
          }
          return item.isShow === undefined || item.isShow
        });
      }),
      size: props.componentOption.size || "default",
    });
    function handleClick(item) {
      switch (item.event) {
        case 'query': queryData(item.target)
          break;
        case 'reset': reset(item)
          break;
        case 'export': exportData(item)
          break;
        case 'download': download(item)
          break;
        default: customClick(item)
      }
    }
    function customClick(item) {
      let components = []
      if (item.relation) {
        components = getRelationComp(store, props.pageKey, item.relation)
      }
      item.handleClick(components)
    }
    // 查询
    function queryData(target: string) {
      store.dispatch("queryList", {
        pageKey: props.pageKey,
        target: target
      });
    }
    // 重置
    function reset(item: any) {
      const formComp: any = getTargetComp(store, props.pageKey, item.target);
      formComp.elementGroup.forEach((item: any) => {
        if (item.type !== 'Tab' && item.type !== 'TabStep') {
          formComp.formData[item.prop] = item.value;
        }
      });
      if (item.queryTarget) {
        queryData(item.queryTarget)
      }
    }
    // 下载模板
    function download(item: any) {
      if (item.url.indexOf("https://") > -1) {
        window.open(item.url, "_blank");
      } else {
        downLoadData({
          url: store.state.baseUrl + item.url,
          fileName: item.fileName || "",
          method: item.method,
          store: store,
        });
      }
    };
    // 导出
    function exportData(item: any) {
      const tableComp: any = getTargetComp(store, props.pageKey, item.target);
      if (tableComp.data.totalNum == 0) return ElMessage.warning("无可导出数据");
      let exportParams = {}
      if (tableComp.exportBySelectionData) {
        // 根据选择数据导出
        exportParams = tableComp.exportBySelectionData(tableComp.selectedRows)
        // if (!exportParams) return ElMessage.warning("请选择要导出的数据");
        if (!exportParams) {
          let formData: any = tableComp.formData || {};
          exportParams = { ...formData, ...tableComp.pageInfo }
        }
      } else {
        // 根据查询参数导出
        let formData: any = tableComp.formData || {};
        exportParams = { ...formData, ...tableComp.pageInfo }
      }
      const params = {
        url: store.state.baseUrl + item.url,
        fileName: item.fileName,
        params: exportParams,
        store: store
      }
      downLoadData(params);
    }
    return {
      ...toRefs(state),
      handleClick,
      download,
      queryData
      // exportData
    };
  },
});
</script>

<style lang="less" scoped>
  .button-group {
    display: flex;
    margin-bottom: 5px;
    &:deep(.el-button) {
      margin-right: 5px;
      margin-left: 0;
    }
  }
</style>
<style>
/* .upload {
  text-align: left !important;
} */
</style>
