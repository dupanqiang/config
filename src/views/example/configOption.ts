/*
 * @Author: zengkai
 * @Date: 2022-05-31 11:21:21
 * @LastEditTime: 2023-01-11 15:38:46
 * @LastEditors: zhao yongfei
 * @FilePath: /dfs-page-config/src/views/example/configOption.ts
 */

// import { reactive } from "vue";
const options = {
  formGroup: (store: any) => {
    return [
      {
        type: "Input",
        prop: "roleCn",
        value: "",
        label: "角色名称",
        maxlength: 20,
        rules: [{ required: true, message: "不能为空" }],
      },
      {
        type: "radioGroup",
        prop: "yn",
        value: 1,
        options: [
          { label: "启用", value: 1 },
          { label: "禁用", value: 0 },
        ],
        label: "状态",
        rules: [{ required: true, message: "不能为空", trigger: "change" }],
      },
      {
        type: "Select",
        prop: "roleIdList",
        value: [],
        url: "/purchase/avl/getReportEnum",
        // method: "POST",
        // itemName: "roleCn",
        // itemValue: "id",
        multiple: true,
        label: "角色",
        rules: [{ required: true, message: "不能为空", trigger: "change" }],
      },
      {
        type: "Input",
        prop: "payee",
        value: "",
        label: "收款人",
        rules: (formData: any) => {
          // return [{ required: formData.supply == 2, message: "不能为空" }];
        },
      },
      {
        type: "Input",
        prop: "dueBank",
        value: "",
        label: "收款银行",
        rules: (formData: any) => {
          // return [{ required: formData.supply == 2, message: "不能为空" }];
        },
      },
      {
        type: "Input",
        prop: "dueBranchBank",
        value: "",
        label: "收款银行支行",
        rules: (formData: any) => {
          // return [{ required: formData.supply == 2, message: "不能为空" }];
        },
      },
      {
        type: "Input",
        prop: "payAccount",
        value: "",
        label: "收款账号",
        rules: (formData: any) => {
          // return [{ required: formData.supply == 2, message: "不能为空" }];
        },
      },
      {
        type: "Select",
        prop: "contractType",
        // url: "/purchase/paymentRequest/getContractTypeEnum",
        options: [
          {
            value: 0,
            label: "框架合同",
          },
          {
            value: 1,
            label: "非框架合同",
          },
        ],
        value: 0,
        label: "合同类型",
        rules: [{ required: true, message: "不能为空" }],
      },
      {
        type: "Input",
        prop: "contractCode",
        value: "",
        label: "合同编号",
        rules: [{ required: true, message: "不能为空" }],
        // isShow: (formData: any) => formData.contractType == 1,
      },
      {
        type: "Daterange",
        prop: "orderTime",
        label: "下单日期",
        value: "",
        startTime: "orderStartTime",
        endTime: "orderEndTime",
        startPlaceholder: "下单开始日期",
        endPlaceholder: "下单结束日期",
        width: "100%",
        disabledDate: () => {},
      },
      {
        type: "upload",
        fileUrl: store.state.uploadFileUrl,
        prop: "attachmentUrl",
        value: [],
        label: "附件",
        textAlign: "left",
        imgLength: 1,
        format: [
          "image/jpg",
          "image/jpeg",
          "image/png",
          "application/zip",
          "application/pdf",
        ],
        width: "100%",
      },
      {
        type: "Textarea",
        prop: "remark",
        value: "",
        label: "角色描述",
        rows: 2,
        maxlength: 100,
        // isShow: (formData: any) => formData.yn == 0,
      },
    ];
  },
  formGroup2: () => {
    return [
      // {
      //   type: "Tab",
      //   width: "100%",
      //   prop: "statz",
      //   value: 2,
      //   itemName: "label",
      //   itemValue: "value",
      //   itemData: "num",
      //   url: "/purchase/deliveryOrder/statusEnum",
      //   notReset: true,
      //   effects: [
      //     {
      //       event: "clearTableData",
      //       targets: ["downTable"],
      //     },
      //   ],
      // },
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
    ];
  },
  // 查询操作按钮
  buttonGroup: () => {
    return [
      { text: "查询", type: "button", event: "query", target: "searchForm" },
      {
        text: "重置",
        type: "button",
        buttonType: "default",
        event: "reset",
        target: "searchForm",
      },
      {
        text: "导出",
        event: "export",
        target: "table",
        url: "/goods-service/photo_task/completePhotoInfoExport",
      },
    ];
  },
  buttonGroup2: () => {
    return [
      {
        text: "取消",
        type: "button",
        buttonType: "default",
        event: "query",
        target: "searchForm",
      },
      {
        text: "提交",
        type: "button",
        event: "reset",
        target: "searchForm",
      },
    ];
  },
  buttonGroup3: () => {
    return [
      {
        text: "取消",
        type: "button",
        buttonType: "default",
        event: "query",
        target: "dialogForm",
        size: "default",
      },
      {
        text: "提交",
        type: "button",
        event: "reset",
        target: "dialogForm",
        size: "default",
        style: "margin-left: 10px",
      },
    ];
  },
  // table表头
  columns: () => {
    return [
      {
        headerName: "采购单号",
        field: "id",
        width: 80,
        cellRendererFramework: "CellId",
        cellRendererParams: {
          // callBackFn: (row: any) => {
          //   router.push({
          //     name: "progressTracking",
          //     params: { progressTrackingId: row.id },
          //   });
          // },
        },
      },
      {
        headerName: "聚水潭采购单号",
        field: "poId",
        width: 120,
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
            return `<span style="color: red;">
             超期
            </span>`;
          } else {
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
      // {
      //   headerName: "版号",
      //   field: "bomNo",
      //   cellRendererFramework: "CellBomNo",
      //   cellRendererParams: {
      //     showBomInfo: showBomInfo,
      //     printBomInfo: printBomInfo,
      //     wachInfo: wachInfo,
      //   },
      //   minWidth: 90,
      //   width: 120,
      // },
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
        headerName: "原因提交人",
        field: "notSubmittingReasonUpdateName",
        width: 100,
      },
      {
        headerName: "确认人",
        field: "notSubmittingStatusConfirmName",
        width: 100,
      },
      {
        headerName: "确认时间",
        field: "notSubmittingStatusConfirmTime",
        width: 140,
      },
      {
        headerName: "生产跟单",
        field: "productionDocumentaryName",
        minWidth: 120,
        width: 120,
      },
      {
        headerName: "应付总金额",
        field: "goodsTotalAmount",
        minWidth: 100,
        width: 100,
      },
      {
        headerName: "承诺总数量",
        field: "allCommitmentQuantity",
        minWidth: 100,
        width: 100,
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
        headerName: "已入库总数量",
        field: "storedTotalQuantity",
        minWidth: 120,
        width: 120,
      },
      {
        headerName: "已质检总数量",
        field: "inspectedTotalQuantity",
        minWidth: 130,
        width: 130,
      },
      {
        headerName: "质检合格总数量",
        field: "qualifiedTotalNumber",
        minWidth: 130,
        width: 130,
      },
      {
        headerName: "质检不合格总数量",
        field: "unqualifiedInspectionTotalNumber",
        minWidth: 130,
        width: 130,
      },
      {
        headerName: "核对时间",
        field: "checkTime",
        minWidth: 180,
        width: 180,
      },
      {
        headerName: "关联采购单号",
        field: "parentPurchaseId",
        minWidth: 180,
        width: 180,
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
    ]
  },
  popupGroup: [
    {
      type: "confirmPopup",
      key: "complete",
      target: "table",
      showDialogBefore: () => {},
      data: {
        title: "确认",
        width: "400px",
        infoText: "完成后不可再更改数量，是否确认完成？",
        url: "",
        params: ([row]: any) => {
          console.log(row);

          // return {
          //   purchaseOrderId: row.purchaseOrderId,
          //   supplierColor: row.supplierColor,
          // };
        },
        buttonGroup: [
          { text: "取消", event: "cancel" },
          { text: "确认", event: "submit" },
        ],
      },
    },
  ],
};

// type: 类型
// span: 列宽
// offset:  列偏移
// relation: 用于查找数据  数据关系
// label: 标题
// value: 回显值
// children: 子数据
// multipleValues: 需要展示子数据对应的key

export const configOption = (store: any, showInfo: any, data: any) => {
  return [
    {
      type: "Card",
      label: "拍照任务信息",
      value: "",
      style: "margin-bottom: 10px;",
      children: [
        {
          style: "margin-bottom: 20px;",
          span: 6,
          label: "任务名称",
          type: "LabelText",
          key: "",
          // relation: "data.taskName",
          value: data.taskName,
        },
        {
          style: "margin-bottom: 20px;",
          span: 6,
          label: "任务状态",
          type: "LabelText",
          key: "taskStatusDesc",
          value: data.taskCenterId,
          // relation: "data.taskCenterId",
        },
        {
          span: 6,
          style: "margin-bottom: 20px;",
          label: "拍摄模式",
          type: "LabelText",
          key: "photoModelDesc",
          value: data.photoModelDesc,
          // relation: "data.photoModelDesc",
        },
        {
          style: "margin-bottom: 20px;",
          span: 6,
          label: "搭配师",
          type: "LabelText",
          key: "matchmaker",
          value: "",
          relation: "data.matchmaker",
        },
        {
          style: "margin-bottom: 20px;",
          span: 6,
          label: "模特",
          type: "tagArr",
          key: "modelDetails",
          value: data.modelDetails,
          // relation: "data.modelDetails",
          multipleValues: [
            {
              valuekey: [
                {
                  type: "LabelText",
                  key: "name",
                },
                {
                  type: "LabelText",
                  key: "age",
                },
              ],
            },
          ],
        },
        {
          span: 6,
          style: "margin-bottom: 20px;",
          label: "标签",
          type: "tagArr",
          key: "",
          value: "",
          relation: "data.designDraft",
        },
        {
          style: "margin-bottom: 20px;",
          span: 12,
          label: "任务时间",
          type: "LabelText",
          key: "",
          value: "",
          relation: ["data.planStartAt", "data.planFinishAt"],
        },
      ],
    },
    {
      type: "Card",
      label: "提交",
      value: "",
      style: "margin-bottom: 20px; margin-top: 0",
      children: [
        {
          type: "Form",
          span: 20,
          value: "",
          labelWidth: "100px",
          size: "small",
          inline: true,
          relation: "data.submit",
          formGroup: options.formGroup(store),
        },
        {
          type: "ButtonGroup",
          span: 24,
          size: "small",
          style: "margin-top: 10px; text-align: center",
          buttonGroup: options.buttonGroup2(),
        },
      ],
    },
    {
      type: "Card",
      label: "查询",
      value: "",
      // span: 12,
      style: "margin-bottom: 20px; margin-top: 0;",
      children: [
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
          formGroup: options.formGroup2(),
        },
        {
          type: "ButtonGroup",
          span: 24,
          size: "small",
          buttonGroup: options.buttonGroup(),
        },
        {
          type: "AgGridTable",
          span: 24,
          style: "height: 300px",
          key: "downTable",
          triggerQuery: true,
          dependencies: "searchForm",
          url: "/purchase/slt/selectPurchaseOrderPage",
          // method: "GET",
          searchBefore: (selfComp: any, row: any) => {
            console.log(selfComp, row);
          },
          // params: {
          //   orderId: "",
          //   purchaseStatusList: "",
          // },
          searchAfter: (res: any) => {
            console.log(res);
          },
          columns: options.columns(),
          data: {
            result: [],
            totalNum: 0,
          },
          configFlag: {
            checkboxSelection: true,
          },
        },
      ],
    },
    // {
    //   type: "DetileFooter",
    //   children: [
    //     {
    //       label: "确认",
    //       type: "primary",
    //       isShow: "true",
    //       target: "DialogInfo",
    //       // disabled: "false",
    //       handle: () => {
    //         showInfo();
    //       },
    //     },
    //     {
    //       label: "取消",
    //       type: "",
    //       // key: "matchmaker",
    //       value: "",
    //       relation: "",
    //       handle: () => {
    //         // showInfo();
    //       },
    //     },
    //     {
    //       label: "驳回任务",
    //       type: "primary",
    //       // key: "matchmaker",
    //       value: "",
    //       relation: "",
    //       handle: () => {
    //         // showInfo();
    //       },
    //     },
    //     {
    //       label: "任务完成",
    //       type: "success",
    //       // key: "matchmaker",
    //       value: "",
    //       relation: "",
    //       handle: () => {
    //         // showInfo();
    //       },
    //     },
    //   ],
    // },
    {
      type: "Dialog",
      label: "测试弹窗",
      width: "50%",
      value: "",
      style: "",
      key: "DialogInfo",
      children: [
        {
          type: "Form",
          key: "dialogForm",
          span: 24,
          value: "",
          labelWidth: "100px",
          formItemWidth: "100%",
          size: "default",
          inline: false,
          showCloseButton: false,

          formGroup: options.formGroup(store),
        },
        {
          span: 24,
          labelWidth: "100px",
          style: "margin-bottom: 20px;",
          label: "标签",
          type: "tagArr",
          key: "",
          value: data.designDraft,
          // relation: "data.designDraft",
        },
        {
          style: "margin-bottom: 20px;",
          span: 24,
          labelWidth: "100px",
          label: "任务名称",
          type: "LabelText",
          key: "",
          // relation: "data.taskName",
          value: data.taskName,
        },
        {
          style: "margin-bottom: 20px;",
          span: 24,
          labelWidth: "100px",
          label: "任务状态",
          type: "LabelText",
          key: "taskStatusDesc",
          value: data.taskCenterId,
          // relation: "data.taskCenterId",
        },
        {
          span: 24,
          labelWidth: "100px",
          style: "margin-bottom: 20px;",
          label: "拍摄模式",
          type: "LabelText",
          key: "photoModelDesc",
          value: data.photoModelDesc,
          // relation: "data.photoModelDesc",
        },
        {
          style: "margin-bottom: 20px;",
          span: 24,
          labelWidth: "100px",
          label: "搭配师",
          type: "LabelText",
          key: "matchmaker",
          value: data.matchmaker,
          // relation: "data.matchmaker",
        },
        {
          style: "margin-bottom: 20px;",
          span: 24,
          labelWidth: "100px",
          label: "模特",
          type: "tagArr",
          key: "modelDetails",
          value: data.modelDetails,
          // relation: "data.modelDetails",
          multipleValues: [
            {
              valuekey: [
                {
                  type: "LabelText",
                  key: "name",
                },
                {
                  type: "LabelText",
                  key: "age",
                },
              ],
            },
          ],
        },
        {
          type: "ButtonGroup",
          span: 24,
          size: "default",
          style: "margin-top: 20px; text-align: right",
          buttonGroup: options.buttonGroup3(),
        },
      ],
    },
  ];
};
