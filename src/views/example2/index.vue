<!--
 * @Author: your name
 * @Date: 2021-11-25 14:35:27
 * @LastEditTime: 2023-01-16 17:04:00
 * @LastEditors: zhao yongfei
 * @Description: 采购单的配置
 * @FilePath: /dfs-page-config/src/views/example2/index.vue
-->
<template>
  <Page :pageConfigData="pageConfigData">
    <template v-slot:aaaaa>
      aaaaa
    </template>
    <template v-slot:bbbbb>
      <span style="color: red; font-size: 14px;">手动创建采购单</span>
    </template>
    <template v-slot:slot3>
      <el-input size="small"></el-input>
    </template>
  </Page>
  <!-- <ComponentItem :configOption="pageConfigData.components" :pageKey="pageConfigData.pageKey"></ComponentItem> -->
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { statusOpt } from "./statusOpt";
import { useStore } from "vuex";
import CellId from "./components/CellId.vue";
import { downLoadData } from "@/utils/index";

const VITE_NODE_ENV = import.meta.env.VITE_NODE_ENV

export default defineComponent({
  name: "example2",
  components: {
    CellId,
  },
  setup() {
    const baseUrl = import.meta.env.VITE_APP_API;
    const store = useStore();
    const state = reactive({
      data: {}
    });
    const pageConfigData = reactive({
      pageKey: "example2",
      components: [
        {
          type: "Form",
          key: "searchForm",
          span: 24,
          value: "",
          labelWidth: "100px",
          formItemWidth: "200px",
          size: "small",
          inline: true,
          showCloseButton: true,
          elementGroup: statusOpt.formGroup(state),
          children: [
            {
              type: "ButtonGroup",
              span: 24,
              size: "small",
              style: "vertical-align: top; display: inline-block;",
              elementGroup: statusOpt.buttonGroup(),
            },
          ]
        },
        {
          type: "ButtonGroup",
          span: 24,
          size: "small",
          elementGroup: statusOpt.buttonGroup2(print)
        },
        {
          slot: "slot3"
        },
        {
          type: "AgTable",
          key: "table",
          initQuery: true,
          dependencies: "searchForm",
          url: "/purchase/slt/selectPurchaseOrderPage",
          // method: "GET",
          searchBefore: (selfComp: any, row: any) => {
            // console.log(selfComp, row);
          },
          // params: {
          //   orderId: "",
          //   purchaseStatusList: "",
          // },
          searchAfter: (res: any) => {
            // console.log(res);
          },
          columns: statusOpt.columns(showBomInfo),
          data: {
            result: [],
            totalNum: 0,
          },
          exportBySelectionData: (selData: any) => {
            if (!selData) return false
            const list = selData.map((item: any) => {
              return item.id
            })
            if (!list.length) return false
            return list
          },
          configFlag: {
            checkboxSelection: true,
            // isRowClick: true,
            // total: true,
          },
        },
      ]
    });
    function showBomInfo(row: any) {
      state.data = row;
    }
    function print(option: any, selArr: any[]) {
      console.log(option)
    }
    function getData() {
      // _TABLE_QUERY(store, 'purchaseList', 'table')
    }
    return {
      ...toRefs(state),
      pageConfigData,
      getData
    };
  },
});
</script>

<style lang="less" scoped></style>
