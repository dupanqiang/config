<!--
 * @Author: zengkai
 * @Date: 2022-05-31 12:21:17
 * @LastEditTime: 2023-01-09 20:34:12
 * @LastEditors: zhao yongfei
 * @FilePath: /dfs-page-config/src/components/Page.vue
-->
<template>
  <RowItem :pageKey="pageKey" :configOption="configOption"></RowItem>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import {useStore} from "vuex"
// import { initPage } from "@/common/js/pageConfigUtils";
import RowItem from "@/components/rowItem.vue";
export default defineComponent({
  name: "Page",
  props: {
    pageKey: {
      // 页面唯一key
      type: String,
      required: true,
    },
    configOption: {
      type: Array,
      defaule: [],
      required: true,
    },
    data: {
      type: Object,
      default: {},
    },
  },
  components: {
    RowItem,
  },
  setup({ configOption, data }) {
    // const store = useStore()
    // const state = reactive({});
    if (data) {
      recursionData(configOption, data);
    }

    // 递归遍历数据
    function recursionData(dataChildren: any, data: any) {
      dataChildren.forEach((item: any) => {
        if (item.children) {
          recursionData(item.children, data);
        } else {
          if (item.relation) {
            if (Array.isArray(item.relation)) {
              item.value = "";
              item.relation.forEach((relationItem: any) => {
                const arr = relationItem.split(".");
                item.value += "  " + getDataValue(arr, data);
              });
            } else {
              const arr = item.relation?.split(".");
              item.value = getDataValue(arr, data);
            }
          }
        }
      });
    }
    // 根据拆分数据结构获取对应数据值

    // data需要传进来

    function getDataValue(arr: any, data: any) {
      if (arr.length === 1) {
        return data;
      }
      if (arr.length === 2) {
        return data[arr[1]];
      } else if (arr.length === 3) {
        return data[arr[1]][arr[2]];
      } else if (arr.length === 4) {
        return data[arr[1]][arr[2]][arr[3]];
      } else if (arr.length === 5) {
        return data[arr[1]][arr[2]][arr[3]][arr[4]];
      }
    }
    // 初始化页面
    // initPage(pageConfig, store);
    return {
      // ...toRefs(state)
    };
  },
});
</script>

<style lang="less" scoped>
.rowStyle {
  display: flex;
}
.detileCard {
  margin-top: 20px;
}
</style>
