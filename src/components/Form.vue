<!--
 * @Author: your name
 * @Date: 2021-09-07 16:37:38
 * @LastEditTime: 2023-01-14 13:02:51
 * @LastEditors: zhao yongfei
 * @Description: In User Settings Edit
 * @FilePath: /dfs-page-config/src/components/Form.vue
-->
<template>
<el-config-provider :locale="locale">
  <el-form
    class="form-group"
    ref="formRef"
    :model="formData"
    :size="size"
    :inline="inline"
    :label-width="labelWidth"
  >
    <div v-if="allDisabled" class="mask"></div>
    <el-form-item
      v-for="(item, index) in elementGroup"
      :key="item.prop"
      :label="item.label"
      :prop="item.prop || ''"
      :rules="
        typeof item.rules == 'function' ? item.rules(formData) : item.rules
      "
      :class="[item.className, !open && index > 4 ? 'hide-item' : '']"
      :style="{
        width: item.width || formItemWidth,
        display: item.type === 'Tab' || item.type === 'TabStep' ? 'block' : '',
        ...item.style
      }"
    >
      <!-- tab切换 -->
      <SearchTab
        v-if="item.type === 'Tab' || item.type === 'TabStep'"
        :option="item"
        :formComp="componentOption"
        :pageKey="pageKey"
      />
      <!-- 输入框 -->
      <el-input
        clearable
        :disabled="item.disable"
        v-if="item.type === 'Input'"
        :show-password="item.inputType === 'password' ? true : false"
        :type="item.inputType || 'text'"
        v-model.trim="formData[item.prop]"
        :maxlength="item.maxlength"
        :min="item.min"
        :max="item.max"
        :placeholder="item.placeholder"
        :prefix-Icon="item.prefixIcon || ''"
        @keyup="item.keyup && item.keyup(formData[item.prop])"
        @clear="item.clear && item.clear(formData[item.prop])"
      ></el-input>
      <!-- 数字框 -->
      <el-input-number
        clearable
        :disabled="item.disable"
        v-if="item.type === 'InputNumber'"
        v-model="formData[item.prop]"
        controls-position="right"
        :min="item.min"
        :max="item.max"
        :placeholder="item.placeholder"
        :prefix-Icon="item.prefixIcon || ''"
        @keyup="item.keyup && item.keyup(formData[item.prop])"
        @clear="item.clear && item.clear(formData[item.prop])"
      ></el-input-number>
      <!-- 文本域 -->
      <el-input
        clearable
        type="textarea"
        v-if="item.type === 'Textarea'"
        v-model="formData[item.prop]"
        :placeholder="item.placeholder"
        :rows="item.rows || 1"
        :show-word-limit="item.showWordLimit"
        :maxlength="item.maxlength"
      ></el-input>
      <!-- 下拉框 -->
      <el-select
        v-if="item.type === 'Select'"
        :clearable="item.clearable === false ? false : true"
        :filterable="item.filterable"
        :placeholder="item.placeholder"
        :multiple="item.multiple === true ? true : false"
        v-model="formData[item.prop]"
        @change="item.change && item.change(formData[item.prop], item)"
        :disabled="item.disabled"
      >
        <el-option
          v-for="op in item.options"
          :label="op[item.itemName || 'label']"
          :value="op[item.itemValue || 'value']"
          :key="op.value"
          :disabled="op.disabled"
        ></el-option>
      </el-select>
      <!-- 级联选择器 -->
      <el-cascader
        clearable
        v-if="item.type === 'Cascader'"
        v-model="formData[item.prop]"
        :options="item.options"
        :props="item.props"
        @change="item.change && item.change(formData[item.prop])"
        :placeholder="item.placeholder"
      >
      </el-cascader>
      <!-- 单选 -->
      <el-radio-group
        v-if="item.type === 'radioGroup'"
        v-model="formData[item.prop]"
      >
        <el-radio
          v-for="opt in item.options"
          :key="opt.value"
          :label="opt.value"
          >{{ opt.label }}</el-radio
        >
      </el-radio-group>
      <!-- 单选按钮 -->
      <el-radio-group
        v-if="item.type === 'RadioButton'"
        v-model="formData[item.prop]"
        @change="item.change && item.change(formData[item.prop])"
      >
        <el-radio-button
          v-for="ra in item.radios"
          :label="ra.value"
          :key="ra.value"
          >{{ ra.label }}</el-radio-button
        >
      </el-radio-group>
      <!-- 复选框 -->
      <el-checkbox-group
        :class="item.className"
        v-if="item.type === 'Checkbox'"
        v-model="formData[item.prop]"
      >
        <el-checkbox
          v-for="ch in item.checkboxs"
          :label="ch.value"
          :key="ch.value"
          >{{ ch.label }}</el-checkbox
        >
      </el-checkbox-group>
      <!-- 日期 -->
      <el-date-picker
        v-if="item.type === 'Date'"
        type="date"
        :placeholder="item.placeholder || '选择日期'"
        v-model="formData[item.prop]"
        :clearable="item.clearable === false ? false : true"
        :disabled="item.disabled"
      ></el-date-picker>
      <!-- 日期范围 -->
      <el-date-picker
        v-if="item.type === 'Daterange'"
        type="daterange"
        :start-placeholder="item.startPlaceholder || '开始日期'"
        :end-placeholder="item.endPlaceholder || '结束日期'"
        range-separator=" - "
        v-model="formData[item.prop]"
        :disabled-date="item.disabledDate"
        :shortcuts="item.shortcuts"
      ></el-date-picker>
      <!-- 时间 -->
      <el-time-select
        v-if="item.type === 'Time'"
        :placeholder="item.placeholder || '选择时间'"
        v-model="formData[item.prop]"
        type=""
      ></el-time-select>
      <!-- 日期时间 -->
      <el-date-picker
        v-if="item.type === 'DateTime'"
        :placeholder="item.placeholder || '选择日期'"
        type="datetime"
        v-model="formData[item.prop]"
        :disabled="item.disable"
        :disabled-date="item.disabledDate"
      ></el-date-picker>
      <!-- 开关 -->
      <el-switch
        v-if="item.type === 'Switch'"
        v-model="formData[item.prop]"
      ></el-switch>
      <uploadComp
        :style="{ 'text-align': item.textAlign || 'center' }"
        v-if="item.type === 'upload'"
        :revisionImg="true"
        name="upload"
        :uploadObj="{ defaultfilelist: formData[item.prop] }"
        ref="uploadComp"
        :fileUrl="fileUrlUploadImg"
        :imgLength="100"
        :maxSize="5"
      />
      <slot v-if="item.slot" :name="item.slotName"></slot>
    </el-form-item>
    <slot></slot>
    <span
      @click="isOpen"
      class="form-move-search"
      v-if="elementGroup.length > 4 && showCloseButton"
    >
      <!-- <em :class="open ? 'el-icon-top' : 'el-icon-bottom'"></em> -->
      {{ open ? "收起" : "展开" }}
    </span>
  </el-form>
</el-config-provider>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watch } from "vue";
import locale from "element-plus/lib/locale/lang/zh-cn";
import { useStore } from "vuex";
import store from "@/store"
import { getSelectOption } from "@/common/js/pageConfigUtils";
import SearchTab from "@/components/SearchTab.vue";
import uploadComp from "@/components/uploadComp.vue";
import { computed } from "@vue/reactivity";

export default defineComponent({
  components: { SearchTab, uploadComp },
  props: {
    componentOption: {
      type: Object,
      default: () => {},
    },
    pageKey: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const store = useStore()
    const formRef = ref();
    const state = reactive({
      open: true,
      fileUrlUploadImg:
        store.state._BASE_URL + "/media-management-service/v2/image/upload/",
      labelWidth: props.componentOption.labelWidth || "110px",
      formItemWidth: props.componentOption.formItemWidth || "180px",
      size: props.componentOption.size || "small",
      showCloseButton: props.componentOption.showCloseButton || false,
      elementGroup: <any>[],
      inline: props.componentOption.inline || true,
      allDisabled: false,
      formData: props.componentOption.formData
    });
    state.elementGroup = computed(() => {
      return props.componentOption.elementGroup.filter((item: any) => {
        return (
          item.isShow === undefined ||
          (typeof item.isShow === "function" && item.isShow(state.formData))
        );
      });
    });
    // 下拉数据接口获取
    function getSelectData() {
      state.elementGroup.forEach((item: any) => {
        // state.formData[item.prop] =
        //   typeof item.value == "object"
        //     ? JSON.parse(JSON.stringify(item.value))
        //     : item.value;
        if ((item.type === "Select" || item.type === "Cascader") && item.url) {
          getSelectOption(store.state, item);
        }
      });
    }
    function isOpen() {
      state.open = !state.open;
    }
    getSelectData();
    return {
      ...toRefs(state),
       locale,
      formRef,
      isOpen,
      getSelectData,
    };
  },
});
</script>

<style lang="less" scoped>
.form-group {
  .form-move-search {
    font-size: 12px;
    color: #409eff;
    cursor: pointer;
  }
  .hide-item {
    display: none;
  }
  .el-select {
    flex: 1;
  }
}
.form-group.el-form--inline .el-form-item {
  margin-bottom: 5px;
  margin-right: 5px;
}
// .el-form {
//   position: relative;
//   .btn-box {
//     display: block;
//     text-align: center;
//     margin-top: 20px;
//   }
//   .mask {
//     position: absolute;
//     top: 0;
//     left: 0;
//     height: 100%;
//     width: 100%;
//     z-index: 2;
//   }
// }
// .el-form-item {
//   align-items: center;
// }
// &:deep(.el-checkbox) {
//   font-weight: normal;
// }
// &:deep(.el-upload-list__item) {
//   transition: none;
// }
</style>
