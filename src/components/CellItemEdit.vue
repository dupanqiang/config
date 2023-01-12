<!--
 * @Author: zhao yongfei
 * @Date: 2020-12-15 11:00:37
 * @LastEditTime: 2023-01-12 01:00:37
 * @LastEditors: zhao yongfei
 * @Description: table内字段编辑
 * @FilePath: /dfs-page-config/src/components/CellItemEdit.vue
-->
<template>
<div v-if="type" :style="{...(typeof params.style == 'function' ? (params.style(params.data) || {}) : params.style || {}), 'min-height': (params.minHeight || 30) + 'px'}" style="display: flex; align-items: center;">
  <template v-if="params.data && params.data.type == 'total' || params.hideEdit && params.hideEdit(params.data)">
    {{ params.data[params.dataKey] }}
  </template>
  <template v-else>
    <div v-if="showInput" @click.stop>
      <el-input
        v-if="type === 'text' || type === 'number'"
        ref="inputRef"
        :type="type"
        size="small"
        v-model.trim="modelData"
        @blur="editBlur()"
      ></el-input>
      <el-input
        v-if="type === 'textarea'"
        ref="inputRef"
        :type="type"
        size="small"
        v-model="modelData"
        @blur="editBlur()"
        @keydown.stop
      ></el-input>
      <!-- <el-input-number
        v-if="type === 'inputNumber'"
        ref="inputRef"
        :min="0"
        :max="100000000"
        size="small"
        v-model="modelData"
        @blur="editBlur()"
      >
      </el-input-number> -->
      <el-date-picker
        v-if="type === 'date'"
        ref="inputRef"
        v-model="modelData"
        type="date"
        placeholder="选择日期"
        size="small"
        @blur="editBlur()"
      >
      </el-date-picker>
      <el-select 
        v-if="type === 'select'"
        ref="inputRef"
        v-model="modelData"
        placeholder="请选择"
        size="small"
        filterable
        clearable
        @blur="selectBlur"
        @change="editBlur"
      >
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item[labelValue.label]"
          :value="item[labelValue.value]">
        </el-option>
      </el-select>
    </div>
    <span v-show="!showInput && (params.data && !params.data.hideEdit)">
      <slot v-if="params.isSlot"></slot>
      <span v-else style="white-space: break-spaces;">{{ modelData }}</span>
      <edit class="el-icon-edit" @click.stop="showEditInput()"/>
    </span>
  </template>
</div>
</template>
<script lang="ts">
import { reactive, toRefs, ref, defineComponent, onMounted, nextTick, getCurrentInstance } from "vue";
import { formatDate } from '@/utils';
import { ElInput, ElDatePicker, ElSelect, ElOption, ElMessage } from "element-plus";
// import { Edit } from '@element-plus/icons'
export default defineComponent({
  components: {
    ElInput,
    ElDatePicker,
    ElSelect,
    ElOption,
    // Edit
  },
  setup() {
    const { ctx }:any = getCurrentInstance();
    let params:any = {}
    let data:any = {};
    const inputRef = ref();
    let state = reactive({
      showInput: false,
      modelData:<any> "",
      params:<any> {
        data: {}
      },
      type: "",
      options:<any> [],
      labelValue: {
        label: "label",
        value: "value"
      },
    })
    onMounted(() => {
      params = ctx.params;
      data = params.data;
      if (data && Object.keys(data).length) {
        if (params.type === 'select') {
          const options = ctx.params.store ? (ctx.params.store.state[params.enumKey] || []) : ctx.params.option;
          state.options = options
          state.modelData = getOptionLabel(state.options, params.data[params.dataKey]);
        } else {
          if(params.format === 'date') {
             state.modelData = data[params.dataKey] ? formatDate(data[params.dataKey], "yyyy-MM-dd") : ''  
          } else {
            state.modelData = data[params.dataKey] ? data[params.dataKey] : (data[params.dataKey] === 0 ? 0 : '')
          } 
        }
      }
      state.params = params;
      state.type = params.type;
    });
    // 显示输入框
    function showEditInput() {
      state.showInput = true;
      nextTick(() => {
        inputRef.value.focus()
      })
    }
    function editBlur(){
      if (state.modelData === data[params.dataKey]) {
        state.showInput = false;
        if (params.type === 'select') {
          state.modelData = getOptionLabel(state.options, state.modelData)
        }
        return;
      };
      if (params.type === 'number' && !state.modelData) {
        state.modelData = 0
      } else if (params.type === 'date') {
        state.modelData = formatDate(state.modelData, "yyyy-MM-dd");
        if(params.format === 'date' && !state.modelData) {
           ElMessage.warning('时间不能为空')
           return;
        }
      }
      params.callBackFn && params.callBackFn(params.data, params.dataKey, state.modelData, params.rowIndex);
      params.editblur && params.editblur(params.data, params.dataKey, state.modelData, params.rowIndex);
      // 兼容下拉框bug
      if (params.type === 'select') {
        state.modelData = getOptionLabel(state.options, state.modelData)
      } else {
        state.showInput = false;
      }
    }
    // 获取下拉数据label值
    function getOptionLabel(options: any, data: any) {
      for (var i = 0; i< options.length; i++) {
        if (options[i][state.labelValue.value] === data) {
          return options[i][state.labelValue.label];
        }
      }
    }
    function selectBlur() {
      setTimeout(() => {
        state.showInput = false;
      }, 150);
    }
    return {
      inputRef,
      ...toRefs(state),
      showEditInput,
      editBlur,
      selectBlur
    };
  },
});
</script>
<!-- 
<style lang="less" scoped>
.ag-cell {
  .el-input {
    width: 100% !important;
    .el-input__inner {
      height: 24px;
      line-height: 24px;
      border: none;
    }
  }
  .el-textarea {
    padding: 4px 0;
    .el-textarea__inner {
      border: none;
    }
  }
  .el-icon-edit {
    margin-left: 4px;
    position: relative;
    top: 3px;
  }
  .el-select__popper {
    transform: translateY(-6px);
  }
}
</style> -->
