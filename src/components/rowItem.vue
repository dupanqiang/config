<!--
 * @Author: zengkai
 * @Date: 2022-05-31 18:31:12
 * @LastEditTime: 2023-01-09 15:31:48
 * @LastEditors: zhao yongfei
 * @FilePath: /dfs-page-config/src/components/rowItem.vue
-->
<template>
  <el-row>
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
import { defineComponent } from "vue";
import Card from "@/components/Card.vue";
import Form from "@/components/Form.vue";
import ButtonGroup from "@/components/ButtonGroup.vue";
import AgGridTable from "@/components/AgGridTable.vue";
// import ElTable from "@/components/ElTable.vue"
import CardText from "./rowComponents/cardText.vue";
import ImageOne from "./rowComponents/imageOne.vue";
import ImageList from "./rowComponents/imageList.vue";
import TagArr from "./rowComponents/tagArr.vue";
import Tag from "./rowComponents/detileTag.vue";
import Text from "./rowComponents/detileText.vue";
import TextArr from "./rowComponents/textArr.vue";
import Dialog from "./CommonDialogNew.vue";
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
    ButtonGroup,
    AgGridTable,
    CardText,
    // DataList,
    // BasicInfo,
    ImageOne,
    ImageList,
    TagArr,
    Text,
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
  },
});
</script>
