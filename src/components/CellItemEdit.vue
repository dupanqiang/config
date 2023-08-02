<!--
 * @Author: zhao yongfei
 * @Date: 2020-12-15 11:00:37
 * @LastEditTime: 2023-08-02 18:06:22
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
    <div v-if="showInput" @click.stop style="flex: 1;">
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
        :rows="1"
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
        size="small"
        @blur="editBlur()"
      >
      </el-date-picker>
      <el-select 
        v-if="type === 'select'"
        ref="inputRef"
        v-model="modelData"
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
    <span v-show="!showInput && (params.data && !params.data.hideEdit)" style="display: flex; width: 100%;">
      <slot v-if="params.isSlot"></slot>
      <span v-else class="edit-info">{{ modelData }}</span>
      <el-icon class="el-icon-edit" style="color: #67c23a; width: 16px; height: 16px; cursor: pointer;" @click.stop="showEditInput()"><EditPen /></el-icon>
    </span>
  </template>
</div>
</template>
<script lang="ts">
import { reactive, toRefs, ref, defineComponent, onBeforeMount, nextTick, getCurrentInstance } from "vue";
import { formatDate } from '@/utils';
import { ElInput, ElDatePicker, ElSelect, ElOption, ElMessage } from "element-plus";
import { EditPen } from '@element-plus/icons-vue'
export default defineComponent({
  name: "CellItemEdit",
  components: {
    ElInput,
    ElDatePicker,
    ElSelect,
    ElOption,
    EditPen
  },
  setup() {
    const inputRef = ref();
    let params: any = {};
    let data: any = {};
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
    onBeforeMount(() => {
      const { data:{params} }:any = getCurrentInstance();
      if (params.data && Object.keys(params.data).length) {
        if (params.type === 'select') {
          const options = params.store ? (params.store.state[params.enumKey] || []) : params.option;
          state.options = options
          state.modelData = getOptionLabel(state.options, params.data[params.dataKey]);
        } else {
          if(params.format === 'date') {
            state.modelData = params.data[params.dataKey] ? formatDate(params.data[params.dataKey], "yyyy-MM-dd") : ''  
          } else {
            state.modelData = params.data[params.dataKey] ? params.data[params.dataKey] : (params.data[params.dataKey] === 0 ? 0 : '')
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
      params = state.params
      data = state.params.data
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
          ElMessage.warning('不能为空')
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

<style lang="less">
.edit-info {
  // white-space: break-spaces;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
// .ag-cell {
//   .el-input {
//     width: 100% !important;
//     .el-input__inner {
//       height: 24px;
//       line-height: 24px;
//       border: none;
//     }
//   }
//   .el-textarea {
//     padding: 4px 0;
//     .el-textarea__inner {
//       border: none;
//     }
//   }
//   .el-icon-edit {
//     margin-left: 4px;
//     position: relative;
//     top: 3px;
//   }
//   .el-select__popper {
//     transform: translateY(-6px);
//   }
// }
</style>