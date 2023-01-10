<!--
 * @author: zhao yongfei
 * @Date: 2022-05-06 15:49:07
 * @description: 
 * @LastEditTime: 2022-08-13 15:27:32
 * @LastEditors: zhao yongfei
 * @FilePath: /dfs-page-vue/src/components/SearchTab.vue
-->
<template>
  <div class="header-btns">
    <ul v-if="option.type == 'TabStep'" class="dfs-step-btn header-btns">
      <li v-for="(item, index) in statusList" :key="item[option.itemValue]"
        :class="['li' + index, curIndex == index ? 'active' : '']"
        :style="{'z-index': statusList.length - index}"
        @click="changeTab(index, item[option.itemValue])">
        {{ item[option.itemName] }}
        <span v-if="option.itemData" class="number">{{ item[option.itemData] || 0 }}</span>
      </li>
    </ul>
    <div v-else v-for="(item, index) in statusList" :key="item[option.itemValue]">
      <el-badge v-if="option.itemData" :value="item[option.itemData] || 0" :max="99999" class="item">
        <el-button
          :type="curIndex === index ? 'primary' : 'info'"
          @click="changeTab(index, item[option.itemValue])"
          :size="size"
        >
          {{ item[option.itemName] }}
        </el-button>
      </el-badge>
      <el-button v-else
        :type="curIndex === index ? 'primary' : 'info'"
        @click="changeTab(index, item[option.itemValue])"
        :size="size"
      >
        {{ item[option.itemName] }}
      </el-button>
    </div>
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
      curIndex: 0,
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
        url: store.state.baseUrl + option.url,
        [paramsKey]: option.params || {},
        method: option.method || "GET"
      })
      .then((res: any) => {
        state.statusList = res[option.resDataKey] || res.items || res;
      })
      // props.formComp.updateTabData = getOptionData
    }
    // 状态切换
    function changeTab(index: number, status: number) {
      if (state.curIndex === index) return;
      state.curIndex = index;
      formComp.searchData[option.prop] = status
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
      store.dispatch("dbsPageConfig/queryList", {
        formComp: formComp,
        pageKey: pageKey
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
  padding-top: 5px;
  // 步骤按钮
  .dfs-step-btn {
    display: flex;
    // padding-top: 0;
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
  div {
    box-sizing: border-box;
    font-size: 14px;
    display: inline-block;
    margin-right: 15px;
    background: rgb(255 255 255 / 0%);
  }
  > div {
    .el-button.el-button--info {
      background-color: white;
      color: #666;
    }
    .el-button.el-button--success {
      background-color: #52cc90;
      color: white;
    }
  }
  div:hover {
    color: green;
  }
}
</style>
