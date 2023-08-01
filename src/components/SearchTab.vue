<!--
 * @author: zhao yongfei
 * @Date: 2022-05-06 15:49:07
 * @description: 
 * @LastEditTime: 2023-08-01 19:20:55
 * @LastEditors: zhao yongfei
 * @FilePath: /dfs-page-config/src/components/SearchTab.vue
-->
<template>
  <ul v-if="option.type == 'TabStep'" class="header-btns step-btn">
    <li v-for="(item, index) in statusList" :key="item[option.itemValue]"
      :class="['li' + index, currentValue == item[option.itemValue] ? 'active' : '']"
      :style="{'z-index': statusList.length - index}"
      @click="changeTab(item[option.itemValue])">
      {{ item[option.itemName] }}
      <span v-if="option.itemData" class="number">{{ item[option.itemData] || 0 }}</span>
    </li>
  </ul>
  <div v-else :class="['header-btns', option.itemData ? 'badge' : '']">
    <template v-if="option.itemData">
      <el-badge v-for="item in statusList" :key="item[option.itemValue]" :value="item[option.itemData] || 0" :max="99999">
        <el-button
          :type="currentValue == item[option.itemValue] ? 'primary' : 'info'"
          @click="changeTab(item[option.itemValue])"
          :size="size"
        >
          {{ item[option.itemName] }}
        </el-button>
      </el-badge>
    </template>
    <template v-else>
      <el-button
        v-for="item in statusList" :key="item[option.itemValue]"
        :type="currentValue == item[option.itemValue] ? 'primary' : 'info'"
        @click="changeTab(item[option.itemValue])"
        :size="size"
      >
        {{ item[option.itemName] }}
      </el-button>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import service from "@/utils/service";
import { getTargetComp } from "@/common/js/pageConfigUtils"
export default defineComponent({
  props: {
    option: Object,
    formComp: Object,
    pageKey: String
  },
  setup(props: any) {
    const store = useStore();
    const pageKey = props.pageKey;
    const option = props.option;
    const formComp = props.formComp;
    const state = reactive({
      currentValue: props.option.value || null,
      statusList: [],
      size: option.size || "small"
    })
    if (option.url) {
      getOptionData()
    } else {
      state.statusList = option.options
    }
    function getOptionData() {
      let paramsKey = option.method == "POST" ? "data" : "params"
      service({
        url: store.state._BASE_URL + option.url,
        [paramsKey]: option.params || {},
        method: option.method || "GET"
      })
      .then((res: any) => {
        state.statusList = res[option.resDataKey] || res.items || res;
      })
      // props.formComp.updateTabData = getOptionData
    }
    // 状态切换
    function changeTab(status: number) {
      if (state.currentValue === status) return;
      state.currentValue = status;
      formComp.formData[option.prop] = status
      if (option.effects) {
        option.effects.forEach((item: any) => {
          item.targets.forEach((target: string) => {
            const tableComp = getTargetComp(store, pageKey, target)
            if (item.event === "updateColumns") {
              store.dispatch("dbsPageConfig/updateColumns", {pageKey: pageKey, tableComp: tableComp, status: status})
            } else if (item.event === "clearTableData") {
              tableComp.data.result = []
            }
          })
        });
      }
      store.dispatch("_QUERY_LIST", {
        pageKey: pageKey,
        target: formComp.target
      });
    }
    return {
      ...toRefs(state),
      changeTab
    };
  },
});
</script>
<style lang="less" scoped>
.header-btns {
  .el-badge {
    margin-right: 15px;
  }
  .el-button.el-button--info {
    background-color: white;
    color: #666;
  }
  .el-button.el-button--success {
    background-color: #52cc90;
    color: white;
  }
  // .el-button:hover {
  //   color: green;
  // }
}
.header-btns.badge {
  padding-top: 5px;
}
.header-btns.step-btn {
  display: flex;
  li {
    display: inline-block;
    height: 24px;
    line-height: 24px;
    background-color: #e4e7ed;
    font-size: 12px;
    padding: 0 12px 0 22px;
    margin-right: 2px;
    position: relative;
    cursor: pointer;
    min-width: max-content;
    &::before {
      content: "";
      width: 17px;
      height: 18px;
      background-color: #fff;
      position: absolute;
      top: 3px;
      left: -9px;
      transform: rotate(45deg);
    }
    &::after {
      content: "";
      width: 17px;
      height: 18px;
      background-color: #e4e7ed;
      position: absolute;
      top: 3px;
      right: -9px;
      transform: rotate(45deg);
    }
    &:first-child {
      padding-left: 12px;
      &::before {
        display: none;
      }
    }
  }
  li.active {
    background-color: #409eff;
    color: #fff;
    &::after {
      background-color: #409eff;
    }
  }
}
</style>
