/*
 * @Author: zengkai
 * @Date: 2022-05-31 11:21:21
 * @LastEditTime: 2023-01-09 15:49:34
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
          return [{ required: formData.supply == 2, message: "不能为空" }];
        },
      },
      {
        type: "Input",
        prop: "dueBank",
        value: "",
        label: "收款银行",
        rules: (formData: any) => {
          return [{ required: formData.supply == 2, message: "不能为空" }];
        },
      },
      {
        type: "Input",
        prop: "dueBranchBank",
        value: "",
        label: "收款银行支行",
        rules: (formData: any) => {
          return [{ required: formData.supply == 2, message: "不能为空" }];
        },
      },
      {
        type: "Input",
        prop: "payAccount",
        value: "",
        label: "收款账号",
        rules: (formData: any) => {
          return [{ required: formData.supply == 2, message: "不能为空" }];
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
        isShow: (formData: any) => formData.contractType == 1,
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
      {
        type: "Tab",
        width: "100%",
        prop: "statz",
        value: 2,
        itemName: "label",
        itemValue: "value",
        itemData: "num",
        url: "/purchase/deliveryOrder/statusEnum",
        notReset: true,
        effects: [
          {
            event: "clearTableData",
            targets: ["downTable"],
          },
        ],
      },
      {
        type: "Input",
        placeholder: "请输入CSID",
        prop: "crawlerColorSizeId",
        value: null,
      },
      {
        type: "Input",
        placeholder: "请输入供应商款号",
        prop: "supplierStylesCode",
        value: null,
      },
      {
        type: "Select",
        placeholder: "买手",
        prop: "buyerId",
        options: [],
        itemName: "userName",
        itemValue: "userId",
        url: "/goods-service/dmm_user/users/1",
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
        prop: "orderTime",
        value: "",
        startTime: "orderStartTime",
        endTime: "orderEndTime",
        startPlaceholder: "下单开始日期",
        endPlaceholder: "下单结束日期",
        width: "240px",
        disabledDate: () => {},
      },
      {
        type: "Select",
        prop: "orderPriority",
        value: "",
        url: "/purchase/common/getOrderPriorityEnum",
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
        placeholder: "是否延期",
        isShow: (formData: any) => formData.orderPriority == 1,
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
        headerName: "商品款号",
        field: "supplierStylesCode",
        minWidth: 140,
      },
      {
        headerName: "csId",
        field: "csIds",
        minWidth: 140,
      },
      {
        headerName: "商品四级分类",
        minWidth: 140,
        cellRenderer: ({ data }: any) => {
          return `
            <span>${data.category1Name}>${data.category2Name}>${data.category3Name}>${data.category4Name}</span>
          `;
        },
      },
      {
        headerName: "买手",
        field: "buyerName",
        minWidth: 140,
      },
      {
        headerName: "货源",
        field: "supplyDesc",
        minWidth: 140,
      },

      {
        headerName: "上架颜色",
        minWidth: 140,
        cellRenderer: ({ data }: any) => {
          let onlienColorStr = "";
          data.onlineColors &&
            data.onlineColors.forEach((item: any) => {
              onlienColorStr += ` <span>${item.colorName}</span> 、`;
            });
          return onlienColorStr;
        },
      },
      {
        headerName: "拍摄颜色",
        minWidth: 140,
        cellRenderer: ({ data }: any) => {
          let shootColorsStr = "";
          data.shootColors &&
            data.shootColors.forEach((item: any) => {
              shootColorsStr += ` <span>${item.colorName}</span> 、`;
            });
          return shootColorsStr;
        },
      },
      {
        headerName: "拍摄件数",
        field: "piecesCount",
        minWidth: 140,
      },
      {
        headerName: "拍摄尺码",
        minWidth: 140,
        cellRenderer: ({ data }: any) => {
          let csAndSizesStr = "";
          data.csAndSizes &&
            data.csAndSizes.forEach((item: any) => {
              csAndSizesStr += ` <span>${item}</span> 、`;
            });
          return csAndSizesStr;
        },
      },
      {
        headerName: "腰型",
        field: "waistType",
        minWidth: 140,
      },
      {
        headerName: "活动场景",
        field: "activityDesc",
        minWidth: 140,
      },
      {
        headerName: "商品卖点",
        field: "productSellingPointTypeDesc",
        minWidth: 140,
      },
      {
        headerName: "活动强度",
        field: "activityIntensityDesc",
        minWidth: 140,
      },
      {
        headerName: "运营主推颜色",
        minWidth: 140,
        cellRenderer: ({ data }: any) => {
          let operationColorsStr = "";
          data.operationColors &&
            data.operationColors.forEach((item: any) => {
              operationColorsStr += ` <span>${item.colorName}</span> 、`;
            });
          return operationColorsStr;
        },
      },
      {
        headerName: "拍摄修图优先级",
        field: "priorityDesc",
        minWidth: 140,
      },
      {
        headerName: "是否需要调样",
        field: "sampleDesc",
        minWidth: 140,
      },
      {
        headerName: "注意事项",
        field: "fbiWarning",
        minWidth: 140,
      },
      {
        headerName: "备注",
        field: "remark",
        minWidth: 140,
      },
      {
        field: "action",
        headerName: "操作",
        pinned: "right",
        autoHeight: true,
        minWidth: 120,
        width: 120,
        buttonGroup: [
          {
            text: "编辑",
            event: "custom",
            handle: ({ row }: any) => {
              console.log(11111111, row);
            },
          },
        ],
      },
    ];
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
          type: "text",
          key: "",
          // relation: "data.taskName",
          value: data.taskName,
        },
        {
          style: "margin-bottom: 20px;",
          span: 6,
          label: "任务状态",
          type: "text",
          key: "taskStatusDesc",
          value: data.taskCenterId,
          // relation: "data.taskCenterId",
        },
        {
          span: 6,
          style: "margin-bottom: 20px;",
          label: "拍摄模式",
          type: "text",
          key: "photoModelDesc",
          value: data.photoModelDesc,
          // relation: "data.photoModelDesc",
        },
        {
          style: "margin-bottom: 20px;",
          span: 6,
          label: "搭配师",
          type: "text",
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
                  type: "text",
                  key: "name",
                },
                {
                  type: "text",
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
          type: "text",
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
          type: "form",
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
          url: "/purchase/slt/details",
          method: "GET",
          searchBefore: (selfComp: any, row: any) => {
            console.log(selfComp, row);
          },
          params: {
            orderId: "",
            purchaseStatusList: "",
          },
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
    {
      type: "DetileFooter",
      children: [
        {
          label: "确认",
          type: "primary",
          isShow: "true",
          target: "DialogInfo",
          // disabled: "false",
          handle: () => {
            showInfo();
          },
        },
        {
          label: "取消",
          type: "",
          // key: "matchmaker",
          value: "",
          relation: "",
          handle: () => {
            // showInfo();
          },
        },
        {
          label: "驳回任务",
          type: "primary",
          // key: "matchmaker",
          value: "",
          relation: "",
          handle: () => {
            // showInfo();
          },
        },
        {
          label: "任务完成",
          type: "success",
          // key: "matchmaker",
          value: "",
          relation: "",
          handle: () => {
            // showInfo();
          },
        },
      ],
    },
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
          type: "text",
          key: "",
          // relation: "data.taskName",
          value: data.taskName,
        },
        {
          style: "margin-bottom: 20px;",
          span: 24,
          labelWidth: "100px",
          label: "任务状态",
          type: "text",
          key: "taskStatusDesc",
          value: data.taskCenterId,
          // relation: "data.taskCenterId",
        },
        {
          span: 24,
          labelWidth: "100px",
          style: "margin-bottom: 20px;",
          label: "拍摄模式",
          type: "text",
          key: "photoModelDesc",
          value: data.photoModelDesc,
          // relation: "data.photoModelDesc",
        },
        {
          style: "margin-bottom: 20px;",
          span: 24,
          labelWidth: "100px",
          label: "搭配师",
          type: "text",
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
                  type: "text",
                  key: "name",
                },
                {
                  type: "text",
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
