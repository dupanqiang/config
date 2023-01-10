<!--
 * @Author: your name
 * @Date: 2021-08-24 11:46:08
 * @LastEditTime: 2022-08-08 16:11:48
 * @LastEditors: zhao yongfei
 * @Description: In User Settings Edit
 * @FilePath: /dfs-page-vue/src/components/SearchForm.vue
-->
<template>
  <el-form
    class="search-form-box"
    :size="size"
    inline
    :label-width="labelWidth"
    :style="formComp.style"
  >
    <el-form-item
      :style="{display: item.type === 'Tab' || item.type === 'TabStep' ? 'block' : ''}"
      :class="[item.className, !open && index > 0 ? 'hide-item' : '']"
      v-for="(item, index) in formGroup"
      :label="item.label"
      :key="item.prop"
      v-show="
        item.isShow === undefined ||
        item.isShow === true ||
        (item.isShow.prop && searchData[item.isShow.prop] == item.isShow.value) ||
        typeof item.isShow == 'function' && item.isShow(searchData)
      "
    >
      <!-- 输入框 -->
      <el-input
        v-if="item.type === 'Input'"
        clearable
        :disabled="item.disable"
        :type="item.inputType || 'text'"
        :maxlength="item.maxlength"
        v-model.trim="searchData[item.prop]"
        :placeholder="item.placeholder"
        :prefix-Icon="item.prefixIcon || ''"
        :style="{ width: item.width || '180px' }"
        @keyup="item.keyup && item.keyup(searchData[item.prop])"
        @clear="item.clear && item.clear(searchData[item.prop])"
      ></el-input>
      <!-- 文本域 -->
      <el-input
        v-if="item.type === 'Textarea'"
        :clearable="item.clearable === false ? false : true"
        type="textarea"
        v-model="searchData[item.prop]"
        :placeholder="item.placeholder"
        :style="{ width: item.width || '180px' }"
        :rows="item.rows || 1"
        :show-word-limit="item.showWordLimit"
        :maxlength="item.maxlength"
      ></el-input>
      <!-- 下拉框 -->
      <el-select
        v-if="item.type === 'Select' && item.changeFn"
        :clearable="item.clearable === false ? false : true"
        :filterable="item.filterable"
        :placeholder="item.placeholder"
        :multiple="item.multiple === true ? true : false"
        collapse-tags
        v-model="searchData[item.prop]"
        :style="{ width: item.width || '180px' }"
        @change="item.changeFn && changeFn(item)"
      >
        <el-option
          v-for="op in item.options"
          :label="op[item.itemName || 'label']"
          :value="op[item.itemValue || 'value']"
          :key="op.value"
        ></el-option>
      </el-select>

      <el-select
        v-if="item.type === 'Select' && !item.changeFn"
        :clearable="item.clearable === false ? false : true"
        :filterable="item.filterable"
        :placeholder="item.placeholder"
        :multiple="item.multiple === true ? true : false"
        collapse-tags
        v-model="searchData[item.prop]"
        :style="{ width: item.width || '180px' }"
        @change="item.changeQry && queryData()"
      >
        <el-option
          v-for="op in item.options"
          :label="op[item.itemName || 'label']"
          :value="op[item.itemValue || 'value']"
          :key="op.value"
        ></el-option>
      </el-select>
      <!-- 级联选择器 -->
      <el-cascader
        v-if="item.type === 'Cascader'"
        :clearable="item.clearable === false ? false : true"
        v-model="searchData[item.prop]"
        :options="item.options"
        :props="item.props"
        :style="{ width: item.width || '180px' }"
        @change="item.change(searchData[item.prop])"
        :placeholder="item.placeholder"
      >
      </el-cascader>
      <!-- 日期 -->
      <el-date-picker
        v-if="item.type === 'Date'"
        type="date"
        :placeholder="item.placeholder || '选择日期'"
        v-model="searchData[item.prop]"
        :style="{ width: item.width || '180px' }"
        :clearable="item.clearable === false ? false : true"
      ></el-date-picker>
      <!-- 日期范围 -->
      <el-date-picker
        v-if="item.type === 'Daterange'"
        type="daterange"
        :start-placeholder="item.startPlaceholder || '开始日期'"
        :end-placeholder="item.endPlaceholder || '结束日期'"
        range-separator=" - "
        v-model="searchData[item.prop]"
        :disabled-date="item.disabledDate"
        :shortcuts="item.shortcuts"
        :style="{ width: item.width + ' !important' || '180px' }"
      ></el-date-picker>
      <!-- 时间 -->
      <el-time-select
        v-if="item.type === 'Time'"
        :placeholder="item.placeholder || '选择时间'"
        v-model="searchData[item.prop]"
        type=""
      ></el-time-select>
      <!-- 日期时间 -->
      <el-date-picker
        v-if="item.type === 'DateTime'"
        :placeholder="item.placeholder || '选择日期'"
        type="datetime"
        v-model="searchData[item.prop]"
        :disabled="item.disable"
        :disabled-date="item.disabledDate"
      ></el-date-picker>
      <!-- 日期时间范围 DateTimerange -->
      <el-date-picker
        v-if="item.type === 'DateTimerange'"
        type="datetimerange"
        :start-placeholder="item.startPlaceholder || '开始日期'"
        :end-placeholder="item.endPlaceholder || '结束日期'"
        range-separator=" - "
        v-model="searchData[item.prop]"
        :disabled-date="item.disabledDate"
        :shortcuts="item.shortcuts"
      />
      <SearchTab
        v-if="item.type === 'Tab' || item.type === 'TabStep'"
        :option="item"
        :formComp="formComp"
        :pageKey="pageKey"
      />
      <numberRange
        v-if="item.type === 'Sliderrange'"
        :min="item.min"
        :max="item.max"
        v-model="searchData[item.prop]"
        :data="searchData[item.prop]"
        @numberRanger="numberRanger($event, searchData[item.prop])"
      ></numberRange>
    </el-form-item>
    <div class="btn-box" v-if="buttonGroup.length">
      <el-form-item
        v-for="item in buttonGroup"
        :key="item.label"
        v-show="
          item.isShow === undefined ||
          item.isShow === true ||
          (item.isShow.prop && searchData[item.isShow.prop] == item.isShow.value) ||
          typeof item.isShow == 'function' && item.isShow(searchData)
        "
      >
        <template v-if="!item.slot">
          <el-button
            v-if="item.event === 'query'"
            type="primary"
            @click="queryData()"
            >{{ item.text }}</el-button
          >
          <el-button
            v-else-if="item.event === 'reset'"
            type="primary"
            @click="reset()"
            >{{ item.text }}</el-button
          >
          <el-button
            v-else-if="item.event === 'download'"
            type="primary"
            @click="download(item.url)"
            >{{ item.text }}</el-button
          >
          <el-button
            v-else-if="item.event === 'export'"
            type="primary"
            @click="exportData(item)"
            >{{ item.text }}</el-button
          >
          <!-- 文件上传 -->
          <fileUpload
            v-else-if="item.event === 'upload'"
            :url="item.url"
            :text="item.text"
            @on-success="queryData"
          >
          </fileUpload>
          <el-button
            v-else
            :type="item.buttonType || 'primary'"
            @click="item.handle({ option: item, pageKey: pageKey })"
            >{{ item.text }}</el-button
          >
        </template>
        <template v-else>
          <slot :name="item.slot + '_'"></slot>
        </template>
      </el-form-item>
      <span
        @click="isOpen"
        class="form-move-search"
        v-if="formGroup.length > 4"
      >
        <em :class="open ? 'el-icon-top' : 'el-icon-bottom'"></em>
        {{ open ? "收起筛选" : "展开筛选" }}
      </span>
    </div>
  </el-form>
</template>
<script lang="ts">
import { defineComponent, reactive, computed, toRefs } from "vue";
import { useStore } from "vuex";
import SearchTab from "./SearchTab.vue"
import fileUpload from "@/components/fileUpload.vue";
import { downLoadData } from "@/utils/index";
import { ElMessage } from "element-plus";

export default defineComponent({
  components: {
    SearchTab,
    fileUpload,
  },
  props: {
    pageKey: {
      type: String,
      default: "",
    },
    formComp: {
      type: Object,
      default: {},
    },
  },
  setup(props) {
    const route: any = {}
    const store = useStore();
    // 获取页面配置信息
    const pageKey = props.pageKey || route.name;
    const formComp = props.formComp;
    const pageConfigData = store.getters["getPageConfigData"](
      pageKey
    );

    const state = reactive({
      formGroup: computed(() => formComp.formGroup),
      buttonGroup: computed(() => formComp.buttonGroup),
      searchData: formComp.searchData,
      // form默认属性
      labelWidth: formComp.labelWidth || "110px",
      size: formComp.size || "small",

      open: true,
    });

    function isOpen() {
      state.open = !state.open;
    }

    function changeFn(item: any) {
      item.changeFn(state.searchData[item.prop], item, state.searchData);
      if (item.changeQry) {
        store.dispatch("queryList", {
          formComp: formComp,
          pageKey: pageKey,
        });
      }
    }
    function queryData() {
      store.dispatch("queryList", {
        formComp: formComp,
        pageKey: pageKey,
      });
    }

    function reset() {
      formComp.formGroup.forEach((item: any) => {
        if (item.type !== 'Tab' && item.type !== 'TabStep') {
          formComp.searchData[item.prop] = item.value;
        }
      });
      store.dispatch("queryList", {
        formComp: formComp,
        pageKey: pageKey,
      });
    }

    // 下载模板
    function download(url: string) {
      window.open(url, "_blank");
    }
    // 导出
    function exportData(item: any) {
      for (
        let i = 0, components = pageConfigData.components;
        i < components.length;
        i++
      ) {
        if (components[i].key === item.target) {
          const tableComp = components[i];
          if (tableComp.data.totalNum == 0)
            return ElMessage.warning("无可导出数据");
          let exportParams = {};
          if (tableComp.exportBySelectionData) {
            // 根据选择数据导出
            exportParams = tableComp.exportBySelectionData(
              tableComp.selectedRows
            );
            // if (!exportParams) return Message.warning("请选择要导出的数据");
            if (!exportParams) {
              let formData: any = tableComp.formData || {};
              exportParams = { ...formData, ...tableComp.pageInfo }
            }
          } else {
            // 根据查询参数导出
            let formData: any = tableComp.formData || {};
            exportParams = { ...formData, ...tableComp.pageInfo };
          }
          const params = {
            url: store.state.baseUrl + item.url,
            fileName: item.fileName,
            params: exportParams,
            store: store
          };
          downLoadData(params);
          break;
        }
      }
    }
    return {
      ...toRefs(state),
      pageKey,
      isOpen,
      formComp,
      queryData,
      changeFn,
      reset,
      download,
      exportData,
    };
  },
});
</script>

<style scoped>
.btn-box {
  display: inline-block;
}
.hide-item {
  display: none;
}
.form-move-search {
  margin-left: 5px;
  font-size: 12px;
  display: inline-block;
  color: #409eff;
  padding-top: 4px;
  cursor: pointer;
}
</style>
