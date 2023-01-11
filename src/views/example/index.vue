<template>
  <Page :configOption="configOption" pageKey="example" :data="dataInfo" />
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent } from "vue";
import { useStore } from "vuex";
import { configOption } from "./configOption";
import Page from "@/components/Page.vue";
export default defineComponent({
  name: "example",
  components: {
    Page,
  },
  props: {},
  setup() {
    const store = useStore();
    const state = reactive({
      dataInfo: {
        taskId: 100744,
        taskCenterId: 34074,
        taskName: "测试删除csId",
        taskType: 1,
        taskTypeDesc: "拍照任务",
        taskStatus: 1,
        taskStatusDesc: "已创建",
        photoModel: 1,
        photoModelDesc: "静物",
        taskOwnerUserName: "程小维",
        planStartAt: null,
        planFinishAt: null,
        taskStartTime: null,
        matchmaker: "",
        modelIds: [],
        modelDetails: [
          {
            name: "张三",
            age: 26,
          },
          {
            name: "李四",
            age: 26,
          },
          {
            name: "王二",
            age: 26,
          },
        ],
        rekursionData: [
          {
            name: "测试2",
            arrTets: [
              {
                like: "看电影",
                name: "星际穿越",
              },
              {
                like: "唱歌",
                name: "夜曲",
              },
            ],
          },
        ],
        parentTaskId: 0,
        remark: "",
        sort: 0,
        designDraft: [
          "面料特征:双向弹",
          "面料特征:透气",
          "活动强度:低强度运动",
          "活动场景:骑行",
          "元素:无钢圈杯",
          "元素:纽扣",
          "元素:双排扣",
          "元素:抽绳",
        ],
        createdUserName: "程小维",
        listItem: [
          {
            id: 104812,
            selectionSpuId: 166640,
            crawlerColorSizeId: 100701,
            originalSkuId: 100701,
            supplierStylesCode: "test0112001",
            completePhotoStatus: 2,
          },
        ],
        csIdNum: "0/1",
        photoNum: "0/0",
        frozen: 2,
        receiveTime: null,
        photoFinishTime: null,
        taskFinishTime: null,
        completePhotoStatus: 2,
        completePhotoStatusDesc: "是",
        selectionSpuIds: [166640],
        crawlerColorSizeIds: [100701],
        supplierStylesCodes: ["test0112001"],

        // 提交
        submit: {
          roleCn: "买手",
          yn: 1,
          roleIdList: [1, 2],
          payee: "收款人1",
          dueBank: "收款银行1",
          dueBranchBank: "收款银行支行1",
          payAccount: "收款账号1",
          contractType: 1,
          contractCode: "合同编号1234567",
          Daterange: ["2021-09-01", "2022-09-01"],
          upload: ["2021-09-01", "2022-09-01"],
          remark: "角色描述1",
        },
      },
      configOption: {},
    });
    state.configOption = configOption(store, showInfo, state.dataInfo);
    function showInfo() {
      // store.getters;
      // const configData = store.getters["pageConfig/getPageConfigData"]("page1");
      console.log(111111111, JSON.stringify(state.dataInfo));

      // alert("测试按钮点击");
    }
    return {
      ...toRefs(state),
      showInfo,
    };
  },
});
</script>

<style lang="less" scoped>
.rowStyle {
  display: flex;
}
.dataInfoHeader {
  font-size: 12px;
  padding: 10px;
  .datainfoItem {
    margin-bottom: 20px;
  }
}
.downFileBtn {
  text-align: right;
  margin-bottom: 10px;
}
.colorItem {
  display: inline-block;
  margin-right: 5px;
}
</style>