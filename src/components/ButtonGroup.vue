<!--
 * @Author: your name
 * @Date: 2021-08-24 11:46:08
 * @LastEditTime: 2022-08-22 15:59:37
 * @LastEditors: zengkai
 * @Description: In User Settings Edit
 * @FilePath: /dfs-page-vue/src/components/ButtonGroup.vue
-->
<template>
  <el-form
    :class="['search-form-box']"
    :style="componentOption.style"
    :size="componentOption.size"
    inline
  >
    <el-form-item
      v-for="item in buttonGroup"
      :key="item.text"
      :style="item.style || ''"
    >
      <template v-if="!item.slot">
        <el-button
          v-if="item.event === 'query'"
          :type="item.buttonType || 'primary'"
          :size="item.size || 'small'"
          @click="queryData()"
          >{{ item.text }}</el-button
        >
        <el-button
          v-else-if="item.event === 'reset'"
          :type="item.buttonType || 'primary'"
          :size="item.size || 'small'"
          @click="reset()"
          >{{ item.text }}</el-button
        >
        <el-button
          v-else-if="item.event === 'download'"
          :type="item.buttonType || 'primary'"
          :size="item.size || 'small'"
          @click="download(item)"
          >{{ item.text }}</el-button
        >
        <el-button
          v-else-if="item.event === 'export'"
          :type="item.buttonType || 'primary'"
          :size="item.size || 'small'"
          @click="exportData(item)"
          >{{ item.text }}</el-button
        >
        <!-- 文件上传 -->
        <fileUpload
          v-else-if="item.event === 'upload'"
          :url="item.url"
          :text="item.text"
          @on-success="queryData"
          :buttonType="item.buttonType"
        >
        </fileUpload>
        <el-button
          v-else
          :type="item.buttonType || 'primary'"
          :size="item.size || 'small'"
          @click="item.handle({ option: item, pageKey: pageKey })"
          :disabled="item.disabled && item.disabled()"
          >{{ item.text }}</el-button
        >
      </template>
      <template v-else>
        <slot :name="item.slot + '_'"></slot>
      </template>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { defineComponent, reactive, computed, toRefs } from "vue";
import { useStore } from "vuex";
// import { useRoute } from "vue-router";
import { downLoadData } from "@/utils/index";
// import { ElMessage } from "element-plus"
import fileUpload from "@/components/fileUpload.vue";

export default defineComponent({
  name: "ButtonGroup",
  components: { fileUpload },
  props: {
    pageKey: {
      // 页面唯一key
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
    // const route = useRoute();
    // 获取页面配置信息
    // const pageKey = props.pageKey || route.name;
    // const pageConfigData = store.getters['dbsPageConfig/getPageConfigData'](pageKey);
    const formData = {};
    const state = reactive({
      buttonGroup: <any>[],
      size: "default",
      style: "",
      ...props.componentOption,
    });
    (state.buttonGroup = computed(() => {
      return props.componentOption.buttonGroup.filter((item: any) => {
        return (
          item.isShow === undefined ||
          (typeof item.isShow === "function" && item.isShow(formData))
        );
      });
    })),
      // 下载模板
      function download(item: any) {
        if (item.url.indexOf("https://") > -1) {
          window.open(item.url, "_blank");
        } else {
          downLoadData({
            url: item.url,
            fileName: item.fileName || "",
            method: item.method,
            store: store,
          });
        }
      };
    // 导出
    // function exportData(item: any) {
    //   for (let i = 0, components = pageConfigData.components; i < components.length; i++) {
    //     if (components[i].key === item.target) {
    //       const tableComp = components[i];
    //       if (tableComp.data.totalNum == 0) return ElMessage.warning("无可导出数据");
    //       let exportParams = {}
    //       if (tableComp.exportBySelectionData) {
    //         // 根据选择数据导出
    //         exportParams = tableComp.exportBySelectionData(tableComp.selectedRows)
    //         // if (!exportParams) return ElMessage.warning("请选择要导出的数据");
    //         if (!exportParams) {
    //           let formData: any = tableComp.formData || {};
    //           exportParams = { ...formData, ...tableComp.pageInfo }
    //         }
    //       } else {
    //         // 根据查询参数导出
    //         let formData: any = tableComp.formData || {};
    //         exportParams = { ...formData, ...tableComp.pageInfo }
    //       }
    //       const params = {
    //         url: item.url,
    //         fileName: (item.fileName || route.meta.title),
    //         params: exportParams,
    //         store: store
    //       }
    //       downLoadData(params);
    //       break;
    //     }
    //   }
    // }
    return {
      ...toRefs(state),
      // pageKey,
      // download,
      // exportData
    };
  },
});
</script>

<style lang="less" scoped></style>
<style>
/* .upload {
  text-align: left !important;
} */
</style>
