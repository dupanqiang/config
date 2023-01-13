<!--
 * @Author: zhao yongfei
 * @Date: 2020-12-15 11:00:37
 * @LastEditTime: 2022-08-08 17:09:43
 * @LastEditors: zhao yongfei
 * @Description: table内字段编辑
 * @FilePath: /dfs-page-vue/src/components/CellOperationBtn.vue
-->
<template>
  <div @click.stop v-if="row.type !== 'total'">
    <div v-if="!params.cycleButton">
      <el-button
        v-for="item in elementGroup"
        :key="item.label"
        v-show="
          params.data.type !== 'total' &&
          (item.isShow === undefined ||
            item.isShow === true ||
            (typeof item.isShow == 'function' && item.isShow(row)) ||
            (item.isShow.prop &&
              searchData[item.isShow.prop] == item.isShow.value))
        "
        :type="item.buttonType || 'primary'"
        :disabled="
          typeof item.disabled === 'function'
            ? item.disabled(row)
            : item.disabled
        "
        size="small"
        @click="item.handle({ option: item, row: row })"
        >{{ item.text }}
      </el-button>
    </div>
    <div v-else>
      <div
        :class="params.className"
        v-for="(dataItem, dataIndex) in row[params.cycleButton]"
        :key="dataIndex"
      >
        <el-button
          v-for="item in elementGroup"
          :key="item.label"
          v-show="
            params.data.type !== 'total' &&
            (item.isShow === undefined ||
              item.isShow === true ||
              (typeof item.isShow == 'function' &&
                item.isShow(row, dataIndex)) ||
              (item.isShow.prop &&
                searchData[item.isShow.prop] == item.isShow.value))
          "
          :type="item.buttonType || 'primary'"
          :disabled="
            typeof item.disabled === 'function'
              ? item.disabled(row, dataIndex)
              : item.disabled
          "
          size="small"
          @click="item.handle({ option: item, row: row, dataIndex })"
          >{{ item.text }}
        </el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  reactive,
  toRefs,
  defineComponent,
  onMounted,
  getCurrentInstance,
} from "vue";
import { ElButton } from "element-plus";
export default defineComponent({
  components: {
    ElButton,
  },
  setup() {
    const { ctx }:any = getCurrentInstance();
    const state = reactive({
      row: {},
      params: {},
      elementGroup: [],
    });
    onMounted(() => {
      state.row = ctx.params.data;
      state.params = ctx.params;
      state.elementGroup = ctx.params.elementGroup;
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="less" scoped></style>
