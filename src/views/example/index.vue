<!--
 * @Author: your name
 * @Date: 2021-11-25 14:35:27
 * @LastEditTime: 2023-01-13 23:46:00
 * @LastEditors: zhao yongfei
 * @Description: 采购单的配置
 * @FilePath: /dfs-page-config/src/views/example/index.vue
-->
<template>
  <Page :pageConfigData="pageConfigData">
    <template v-slot:aaaaa>
      aaaaa
    </template>
    <template v-slot:aaaaa1>
      aaaaa1
    </template>
    <template v-slot:bbbbb>
      <span style="color: red; font-size: 14px;">手动创建采购单</span>
    </template>
    <template v-slot:bbbbb1>
      <span style="color: red; font-size: 14px;">手动创建采购单1</span>
    </template>
  </Page>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { statusOpt } from "./statusOpt";
import { useStore } from "vuex";
import CellId from "./components/CellId.vue";
import { downLoadData } from "@/utils/index";

const VITE_NODE_ENV = import.meta.env.VITE_NODE_ENV

export default defineComponent({
  name: "example2",
  components: {
    CellId
  },
  setup() {
    const baseUrl = import.meta.env.VITE_APP_API;
    const store = useStore();
    const state = reactive({
      data: {},
      lableList: [
        {name: 'aaa'},
        {name: 'bbb'}
      ]
    });
    const pageConfigData = reactive({
      pageKey: "example",
      components: [
        {
          type: "SplitScreen",
          topComponents: [
            {
              type: "Form",
              key: "searchForm",
              labelWidth: "100px",
              formItemWidth: "200px",
              size: "small",
              inline: true,
              showCloseButton: true,
              elementGroup: statusOpt.topOption.formGroup(state),
              children: [
                {
                  type: "ButtonGroup",
                  size: "small",
                  style: "vertical-align: top; display: inline-block;",
                  elementGroup: statusOpt.topOption.buttonGroup(),
                },
              ]
            },
            {
              type: "ButtonGroup",
              size: "small",
              elementGroup: statusOpt.topOption.buttonGroup2(print),
            },
            {
              type: "AgTable",
              key: "table",
              initQuery: true,
              dependencies: "searchForm",
              target: 'table1',
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
              columns: statusOpt.topOption.columns(showBomInfo),
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
                isRowClick: true,
                total: true,
              },
            }
          ],
          downComponents: [
            {
              type: "Form",
              key: "searchForm1",
              size: "small",
              showCloseButton: true,
              elementGroup: statusOpt.bottomOption.formGroup(state),
              children: [
                {
                  type: "ButtonGroup",
                  size: "small",
                  style: "vertical-align: top; display: inline-block;",
                  elementGroup: statusOpt.bottomOption.buttonGroup(),
                },
              ]
            },
            {
              type: "ButtonGroup",
              size: "small",
              elementGroup: statusOpt.bottomOption.buttonGroup2(print),
            },
            {
              type: "AgTable",
              key: "table1",
              dependencies: "searchForm1",
              url: "/inspection/taskOrder/detail",
              method: "POST",
              searchBefore: (selfComp: any, row: any) => {
                // console.log(selfComp)
                // console.log(row)
                selfComp.params = {
                  // inspectionTaskOrderId: row.data.id
                  inspectionTaskOrderId: 128
                }
              },
              searchAfter: (res: any) => {
                // console.log(res);
              },
              columns: statusOpt.bottomOption.columns(),
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
            }
          ]
        }
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
