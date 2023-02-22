<!--
 * @Author: your name
 * @Date: 2021-11-25 14:35:27
 * @LastEditTime: 2023-02-22 13:12:43
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
  <!-- <ComponentItem :configOption="pageConfigData.components" :pageKey="pageConfigData.pageKey"></ComponentItem> -->
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { statusOpt } from "./statusOpt";
import { useStore } from "vuex";
import CellId from "./components/CellId.vue";
import { downLoadData } from "@/utils/index";

const VITE_NODE_ENV = import.meta.env.VITE_NODE_ENV

export default defineComponent({
  name: "example",
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
              target: "table",
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
              url: "/purchase/all",
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
                resultKey: "items",
                totalKey: "totalNum",
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
              target: "table1",
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
                resultKey: "items",
                totalKey: "totalNum",
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
        },
        {
          type: "dialog",
          key: "dialog_test",
          target: "table",
          title: "提交审核",
          width: "500px",
          children: [
            {
              type: "Form",
              key: "searchForm2",
              value: "",
              labelWidth: "100px",
              formItemWidth: "100%",
              style: {'margin-bottom': "15px"},
              size: "small",
              url: "/logistics/tracking/updateTrackingNo",
              method: "POST",
              relation: ["table"],
              validate: true,
              submitBefore: (component) => {
                console.log(component)
                // return false
              },
              submitAfter: (res) => {
                console.log(res)
              },
              elementGroup: [
                {
                  type: "radioGroup",
                  prop: "abnormalTwoId",
                  value: "",
                  url: "/oms-manager/orderAbnormal/getOrderAbnormalGroupByLevel",
                  params: (row: any) => {
                    return { level: 2 };
                  },
                  method: "GET",
                  options: [],
                  itemName: "name",
                  itemValue: "abnormalTwoId",
                  itemStyle: {width: "32%", margin: 0},
                  noCache: true,
                  // rules: [
                  //   { required: true, message: "请选择颜色", trigger: "change" },
                  // ],
                },
                {
                  type: "Input",
                  prop: "originalTrackingNo",
                  value: "",
                  label: "老运单号",
                  width: '100%',
                  style: {'margin-bottom': "15px"},
                  rules: [
                    { required: true, message: '不能为空' }
                  ],
                  placeholder: "请输入",
                },
                {
                  type: "Input",
                  prop: "trackingNo",
                  value: "",
                  label: "新单号",
                  width: '100%',
                  style: {'margin-bottom': "15px"},
                  rules: [
                    { required: true, message: '不能为空' }
                  ],
                  placeholder: "请输入",
                },
                {
                  type: "Select",
                  prop: "orderTypes",
                  value: [],
                  label: "订单类型",
                  width: '100%',
                  url: "/purchase/common/getOrderTypeEnum",
                  options: [],
                  multiple: true,
                  changeQry: true,
                  placeholder: "订单类型",
                  rules: [
                    { required: true, message: '不能为空' }
                  ]
                }
              ]
            },
            {
              type: "ButtonGroup",
              style: {'justify-content': 'center'},
              size: "small",
              elementGroup: [
                { text: "取消", type: "button", buttonType: "default", event: "cancel", restTarget: "searchForm2" },
                { text: "提交", type: "button", event: "submit", target: "searchForm2", queryTarget: "table" },
              ]
            }
          ]
        },
        {
          type: "dialog",
          key: "dialog_test1",
          target: "table",
          title: "提示",
          dialogType: "warning",
          width: "400px",
          children: [
            {
              type: "Form",
              key: "trans_normal_form",
              labelWidth: "0",
              url: "/oms-manager/orderAbnormal/convertNormal",
              method: "POST",
              relation: ["table"],
              children: [
                {
                  type: "Descriptions",
                  column: 4,
                  size: "default",
                  children: [
                    {label: "", text: "确认转正常单？", span: 4, align: 'center'}
                  ]
                },
              ],
              submitBefore: (component) => {
                const ids = component.relation.table.selectedRows.map(item => item.id)
                component.formData.ids = ids
              },
              submitAfter: (res) => {
                console.log(res)
              },
            },
            {
              type: "ButtonGroup",
              style: {'justify-content': 'center'},
              size: "small",
              elementGroup: [
                { text: "取消", type: "button", buttonType: "default", event: "cancel" },
                { text: "提交", type: "button", event: "submit", target: "trans_normal_form", queryTarget: "table" },
              ]
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
