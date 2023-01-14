/*
 * @Author: zhaoyongfei
 * @Date: 2021-10-13 12:22:27
 * @LastEditTime: 2023-01-14 11:02:16
 * @LastEditors: zhao yongfei
 * @Description: In User Settings Edit
 * @FilePath: /dfs-page-config/src/views/example/statusOpt.ts
 */
import { computed } from "vue";
let statusOpt = {
  topOption: {
    formGroup: (state:any) => {
      return [
        {
          type: "Input",
          prop: "id",
          value: "",
          placeholder: "采购单号",
        },
        {
          type: "Select",
          prop: "purchaseStatusList",
          value: [],
          url: "/purchase/slt/getOrderStatusEnum",
          options: [],
          multiple: true,
          changeQry: true,
          placeholder: "采购单状态",
        },
        {
          type: "Select",
          prop: "purchaseTypes",
          value: [],
          url: "/purchase/common/getPurchaseTypeEnum",
          options: [],
          multiple: true,
          changeQry: true,
          placeholder: "采购类型",
        },
        {
          type: "Select",
          prop: "orderTypes",
          value: [],
          url: "/purchase/common/getOrderTypeEnum",
          options: [],
          multiple: true,
          changeQry: true,
          placeholder: "订单类型",
        },
        {
          type: "Select",
          prop: "purchaseWarehouseStatus",
          value: [],
          url: "/purchase/slt/getReceiptStatusEnum",
          options: [],
          multiple: true,
          changeQry: true,
          placeholder: "发货状态",
        },
        {
          type: "Input",
          prop: "sku",
          value: "",
          placeholder: "sku编码",
        },
        {
          type: "Daterange",
          prop: "checkTime",
          value: "",
          startTime: "checkTimeStart",
          endTime: "checkTimeEnd",
          startPlaceholder: "核对日期开始",
          endPlaceholder: "核对日期结束",
          width: "240px",
          disabledDate: () => {},
        },
        {
          type: "Select",
          prop: "orderPriorityNewLabel",
          value: "",
          url: "/purchase/fabricAdvice/getOrderPriorityNewEnum",
          options: [],
          changeQry: true,
          placeholder: "采购单类型",
          clearable: true,
        },
        {
          type: "Select",
          prop: "deferStatus",
          value: "",
          options: [
            { label: "否", value: 0 },
            { label: "是", value: 1 },
          ],
          changeQry: true,
          placeholder: "是否超期",
        },
        {
          type: "Daterange",
          prop: "targetDeliveryCycle",
          value: "",
          startTime: "targetDeliveryCycleStart",
          endTime: "targetDeliveryCycleEnd",
          startPlaceholder: "目标交期开始",
          endPlaceholder: "目标交期结束",
          width: "240px",
          disabledDate: () => {},
        },
        {
          type: "Select",
          prop: "notSubmitReasonList",
          value: [],
          options: computed(() => state.lableList),
          itemName: 'name',
          itemValue: 'name',
          multiple: true,
          placeholder: "未准交原因",
        },
        {
          slot: "aaaaa",
          width: "120px",
          style: {color: "red", "border-radius": "4px", "box-shadow": "0 0 0 1px #DCDFE6 inset", "padding-left": "8px"},
          isShow: (formatDate) => {
            return formatDate.deferStatus == 1
          }
        }
      ];
    },
    buttonGroup: () => {
      return [
        { text: "查询", type: "button", event: "query", target: "table" },
        { text: "重置", type: "button", event: "reset", target: "searchForm", queryTarget: "table" },
      ];
    },
    buttonGroup2: (print: Function) => {
      return [
        {
          text: "导出",
          buttonType: "success",
          event: "export",
          target: "table",
          url: "/purchase/slt/exportSltOrderExcel",
        },
        { text: "下载", type: "button", event: "download", url: "/purchase/paymentRequest/export", isShow: true},
        { text: "打印采购单", type: "button", event: "custom", target: "table", handleClick: print },
        { text: "上传", type: "button", event: "upload", buttonType: "warning", url: '/inspection/importQualityInspectionMisjudgment' },
        {
          slot: "bbbbb",
          text: "手动创建采购单",
          style: {color: "red", "border-radius": "4px", "box-shadow": "0 0 0 1px #DCDFE6 inset", "padding-left": "8px"},
          relation: ["searchForm", "table"],
          isShow: (components) => {
            return !components.searchForm.formData.deferStatus
          }
        },
        { text: "批量修改未准交原因", target: "table", type: "primary", handleClick: () => {}, relation: ["searchForm", "table"],
          isShow: (components) => {
            return components.searchForm.formData.deferStatus == 1
          }
        }
      ];
    },
    columns: (
      showBomInfo: Function
    ) => {
      let columns = [
        {
          headerName: "采购单号",
          field: "id",
          width: 80,
          cellRendererFramework: "CellId",
          cellRendererParams: {
            callBackFn: (row: any) => {
              console.log(row)
              // router.push({
              //   name: "progressTracking",
              //   params: { progressTrackingId: row.id },
              // });
            },
          },
        },
        {
          headerName: "聚水潭采购单号",
          field: "poId",
          width: 120,
          cellStyle: { textAlign: "left" },
        },
        {
          headerName: "采购单优先级",
          field: "orderPriorityNewDesc",
          width: 90,
          // cellRenderer: ({ data }: any) => {
          //   if (data.orderPriorityNewDesc.substring(1) != 6)
          //     return data.orderPriorityNewDesc;
          // },
        },
        {
          headerName: "采购单状态",
          field: "purchaseStatusDesc",
          minWidth: 120,
          width: 120,
        },
        {
          headerName: "采购类型",
          field: "purchaseTypeDesc",
          minWidth: 120,
          width: 120,
        },
        {
          headerName: "订单类型",
          field: "orderTypeDesc",
          minWidth: 120,
          width: 120,
        },
        {
          headerName: "目标交期1｜数量",
          field: "targetCycle1",
          minWidth: 140,
          width: 140,
          cellRenderer: ({ data }: any) => {
            return data.targetCycle1
          }
        },
        {
          headerName: "目标交期2｜数量",
          field: "targetCycle2",
          minWidth: 140,
          width: 140,
          cellRenderer: ({ data }: any) => {
            return data.targetCycle2
          }
        },
        {
          headerName: "目标交期3｜数量",
          field: "targetCycle3",
          minWidth: 140,
          width: 140,
          cellRenderer: ({ data }: any) => {
            return data.targetCycle3
          }
        },
        {
          headerName: "是否超期",
          field: "deferStatusDesc",
          width: 80,
          cellRenderer: ({ data }: any) => {
            if (data.deferStatus == 1) {
              return `<span style="color: red;">超期</span>`;
            } else if (data.deferStatus == 0){
              return "未超期";
            }
          },
        },
        {
          headerName: "供应商款号",
          field: "styleNo",
          minWidth: 160,
          width: 160,
        },
        {
          headerName: "版号",
          field: "bomNo",
          // cellRendererFramework: "CellBomNo",
          // cellRendererParams: {
          //   showBomInfo: showBomInfo,
          // },
          // minWidth: 90,
          // width: 120,
        },
        {
          headerName: "版本创建时间",
          field: "bomCreated",
          width: 140,
        },
        {
          headerName: "下单数量",
          field: "quantity",
          minWidth: 100,
          width: 100,
          showTotal: true,
        },
        {
          headerName: "供应商名称",
          field: "supplierName",
          minWidth: 210,
          width: 210,
        },
        {
          headerName: "未准交原因",
          field: "notSubmitReasonList",
          width: 160,
          // autoHeight: true,
          wrapText: true,
          cellRenderer: ({ data }: any) => {
            const arr: any = []
            if(data.notSubmitReasonList && data.notSubmitReasonList.length) {
              data.notSubmitReasonList.forEach((item: any) => {
                arr.push(`<span class="el-tag el-tag--light el-tag--small" style="margin-right:2px">${item}</span>`)
              });
            }
            return arr.join('')
          }
        },
        {
          headerName: "未准交原因状态",
          field: "notSubmittingStatusDesc",
          width: 120,
        },
        {
          headerName: "待交付总数量",
          field: "allToBeDeliveredQuantity",
          minWidth: 110,
          width: 110,
          showTotal: true,
        },
        {
          headerName: "已发货总数量",
          field: "totalQuantityShipped",
          minWidth: 120,
          width: 120,
          showTotal: true,
        },
        {
          headerName: "备注",
          field: "remark",
          cellRendererFramework: "CellItemEdit",
          cellRendererParams: {
            dataKey: "remark",
            type: "textarea",
            url: "/purchase/slt/batchUpdateRemark",
            params: (row: any) => {
              return {
                orderIds: [row.id],
              };
            },
            callBack: () => {},
          },
          wrapText: true,
          // autoHeight: true,
          minWidth: 280,
          width: 280,
        },
        {
          field: "action",
          headerName: "操作",
          width: 120,
          minWidth: 120,
          pinned: "right",
          // autoHeight: true,
          elementGroup: [
            {
              text: "供应商设置",
              type: "text",
              event: "custom",
              handleClick: ({ row, gridOption }: any) => {
                console.log(row, gridOption)
              },
              // isShow: (data: any) => !data,
            },
            {
              text: "OEM供应商报价",
              type: "text",
              event: "custom",
              handleClick: ({ row }: any) => {
                console.log(row)
              },
              isShow: (data: any) => !data,
            },
          ],
        },
      ];
      return columns;
    }
  },
  bottomOption: {
    formGroup: (state:any) => {
      return [
        {
          type: "Input",
          prop: "id",
          value: "",
          placeholder: "采购单号",
        },
        {
          type: "Select",
          prop: "purchaseStatusList",
          value: [],
          url: "/purchase/slt/getOrderStatusEnum",
          options: [],
          multiple: true,
          changeQry: true,
          placeholder: "采购单状态",
        },
        {
          type: "Select",
          prop: "purchaseTypes",
          value: [],
          url: "/purchase/common/getPurchaseTypeEnum",
          options: [],
          multiple: true,
          changeQry: true,
          placeholder: "采购类型",
        },
        {
          type: "Select",
          prop: "orderTypes",
          value: [],
          url: "/purchase/common/getOrderTypeEnum",
          options: [],
          multiple: true,
          changeQry: true,
          placeholder: "订单类型",
        },
        {
          type: "Select",
          prop: "purchaseWarehouseStatus",
          value: [],
          url: "/purchase/slt/getReceiptStatusEnum",
          options: [],
          multiple: true,
          changeQry: true,
          placeholder: "发货状态",
        },
        {
          type: "Input",
          prop: "sku",
          value: "",
          placeholder: "sku编码",
        },
        {
          type: "Daterange",
          prop: "checkTime",
          value: "",
          startTime: "checkTimeStart",
          endTime: "checkTimeEnd",
          startPlaceholder: "核对日期开始",
          endPlaceholder: "核对日期结束",
          width: "240px",
          disabledDate: () => {},
        },
        {
          type: "Select",
          prop: "orderPriorityNewLabel",
          value: "",
          url: "/purchase/fabricAdvice/getOrderPriorityNewEnum",
          options: [],
          changeQry: true,
          placeholder: "采购单类型",
          clearable: true,
        },
        {
          type: "Select",
          prop: "deferStatus",
          value: "",
          options: [
            { label: "否", value: 0 },
            { label: "是", value: 1 },
          ],
          changeQry: true,
          placeholder: "是否超期",
        },
        {
          type: "Daterange",
          prop: "targetDeliveryCycle",
          value: "",
          startTime: "targetDeliveryCycleStart",
          endTime: "targetDeliveryCycleEnd",
          startPlaceholder: "目标交期开始",
          endPlaceholder: "目标交期结束",
          width: "240px",
          disabledDate: () => {},
        },
        {
          type: "Select",
          prop: "notSubmitReasonList",
          value: [],
          options: computed(() => state.lableList),
          itemName: 'name',
          itemValue: 'name',
          multiple: true,
          placeholder: "未准交原因",
        },
        {
          slot: "aaaaa1",
          width: "120px",
          style: {color: "red", "border-radius": "4px", "box-shadow": "0 0 0 1px #DCDFE6 inset", "padding-left": "8px"},
          isShow: (formatDate) => {
            return formatDate.deferStatus == 1
          }
        }
      ];
    },
    buttonGroup: () => {
      return [
        { text: "查询", type: "button", event: "query", target: "table1" },
        { text: "重置", type: "button", event: "reset", target: "searchForm1", queryTarget: "table1" },
      ];
    },
    buttonGroup2: (print: Function) => {
      return [
        {
          text: "导出",
          buttonType: "success",
          event: "export",
          target: "table",
          url: "/purchase/slt/exportSltOrderExcel",
        },
        { text: "下载", type: "button", event: "download", url: "/purchase/paymentRequest/export", isShow: true},
        { text: "打印采购单", type: "button", target: "table", handleClick: print },
        { text: "上传", type: "button", event: "upload", buttonType: "warning", url: '/inspection/importQualityInspectionMisjudgment' },
        {
          slot: "bbbbb1",
          text: "手动创建采购单",
          style: {color: "red", "border-radius": "4px", "box-shadow": "0 0 0 1px #DCDFE6 inset", "padding-left": "8px"},
          relation: ["searchForm1", "table1"],
          isShow: (components) => {
            return !components.searchForm1.formData.deferStatus
          }
        },
        { text: "批量修改未准交原因", type: "primary", handleClick: (components) => {
          console.log(components)
        },
          relation: ["searchForm1", "table1"],
          isShow: (components) => {
            return components.searchForm1.formData.deferStatus == 1
          }
        }
      ];
    },
    columns: () => {
      let columns = [
        {
          field: "skuCode",
          headerName: "sku编码",
          minWidth: 180,
          width: 180
        },
        {
          field: "normalCheckDesc",
          headerName: "sku抽检类型",
          minWidth: 120,
          width: 120
        },
        {
          field: "firstOrderDesc",
          headerName: "首单",
          minWidth: 120,
          width: 120
        },
        {
          field: "normalCheckNum",
          headerName: "正常抽检样本量",
          minWidth: 120,
          width: 120
        },
        {
          field: "addCheckNum",
          headerName: "加抽样本量",
          minWidth: 120,
          width: 120
        },
        {
          field: "normalRe",
          headerName: "正常质检RE",
          minWidth: 120,
          width: 120
        },
        {
          field: "addRe",
          headerName: "加抽RE",
          minWidth: 120,
          width: 120
        },
        {
          field: "supplierStylesCode",
          headerName: "款号",
          minWidth: 170,
          width: 170,
        },
        {
          field: "isSample",
          headerName: "是否有样衣",
          minWidth: 100,
          width: 100,
          cellRenderer: ({data}: any) => {
            return data.isSample == 1 ? '<span style="color: red">是</span>' : '否'
          }
        },
        {
          field: "boxNum",
          headerName: "装箱数量",
          minWidth: 100,
          width: 100
        },
        {
          field: "skuInspectionQty",
          headerName: "已质检数量",
          minWidth: 100,
          width: 100
        },
        {
          field: "skuQualifiedQty",
          headerName: "质检合格数量",
          minWidth: 100,
          width: 100
        },
        {
          field: "skuUnqualifiedQty",
          headerName: "质检不合格数量",
          minWidth: 120,
          width: 120
        },
        {
          field: "skuConfirmQty",
          headerName: "确认不合格数量",
          minWidth: 120,
          width: 120
        },
        {
          field: "action",
          headerName: "操作 ",
          width: 100,
          minWidth: 100,
          pinned: "right",
          elementGroup: [
            {
              text: "装箱红冲",
              type: "button",
              event: "popup",
              target: "hong-chong",
              handleClick: () => {
                console.log(111)
              },
              disabled: (row: any) => row.taskStatus == 5 || row.taskStatus == 6
            }
          ]
        }
      ]
      return columns;
    }
  }
};

export { statusOpt };
