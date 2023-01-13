<!--
 * @Author: zengkai
 * @Date: 2022-05-31 18:31:12
 * @LastEditTime: 2023-01-12 01:31:51
 * @LastEditors: zhao yongfei
 * @FilePath: /dfs-page-config/src/components/rowItem.vue
-->
<template>
  <el-row :style="'vertical-align: top; ' + parentStyle">
    <el-col
      v-for="(itemChild, index) in configOption"
      :style="itemChild.style || ''"
      :class="itemChild.class || ''"
      :span="itemChild.span || 24"
      :offset="itemChild.offset || 0"
      :key="index"
    >
      <component
        :is="itemChild.type"
        :pageKey="pageKey"
        :componentOption="itemChild"
      >
        <RowItem
          v-if="itemChild.children && itemChild.children.length"
          :pageKey="pageKey"
          :configOption="itemChild.children"
        />
      </component>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Card from "@/components/Card.vue";
import Form from "@/components/Form.vue";
import elementGroup from "@/components/elementGroup.vue";
import AgTable from "@/components/AgTable.vue";
// import ElTable from "@/components/ElTable.vue"
import CardText from "./rowComponents/cardText.vue";
import ImageOne from "./rowComponents/imageOne.vue";
import ImageList from "./rowComponents/imageList.vue";
import TagArr from "./rowComponents/tagArr.vue";
import Tag from "./rowComponents/detileTag.vue";
import LabelText from "./rowComponents/LabelText.vue";
import TextArr from "./rowComponents/textArr.vue";
// import Dialog from "./CommonDialogNew.vue";
import Dialog from "./CommonDialog.vue";
// 详情页底部按钮操作区
// import DetileFooter from "./rowComponents/detileFooter.vue";
// 详情页图片轮播
// import ImgCarousel from "./rowComponents/imgCarousel.vue";
// import PersonalInfo from "../personalInfo.vue";
export default defineComponent({
  name: "RowItem",
  components: {
    Card,
    Form,
    elementGroup,
    AgTable,
    CardText,
    // DataList,
    // BasicInfo,
    ImageOne,
    ImageList,
    TagArr,
    LabelText,
    // DetileTable,
    // RowItem,
    Tag,
    // DetileFooter,
    // DetileForm,
    // ImgCarousel,
    TextArr,
    Dialog,
    // PersonalInfo,
    // ElTable
  },
  props: {
    pageKey: {
      // 页面唯一key
      type: String,
      required: true,
    },
    configOption: {
      type: Array,
      default: [],
    },
    itemChild: {
      type: Object,
      default: {},
    }
  },
  setup(props: any) {
    return {
      parentStyle: props.configOption[0].parentStyle
    }
  }
});
</script>
