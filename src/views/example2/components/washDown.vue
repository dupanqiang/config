<!--
 * @author: zhao yongfei
 * @Date: 2022-02-14 22:13:46
 * @description: 
 * @LastEditTime: 2023-01-11 20:44:44
 * @LastEditors: zhao yongfei
 * @FilePath: /dfs-page-config/src/views/example2/components/washDown.vue
-->
<template>
  <el-dialog
    title="洗水唛下载"
    v-model="dialog"
    width="1200px"
    center
    :append-to-body="true"
  >
    <div style="text-align: right">
      <el-button
        style="width: 100px"
        size="small"
        type="primary"
        class="button"
        :disabled="!data.selectionSpuId"
        @click="downFile(data)"
        >下载全部</el-button
      >
      <!-- @click="htmlToPdf('hangTag', `${data.styleNo}-洗水唛`)" -->
    </div>

    <div class="card">
      <div id="hangTag">
        <div class="hangTagContent">
          <div class="cardContent" v-for="(item, index) in waterMarkList">
            <div style="text-align: center">
              <el-button
                :class="index === 0 && 'downPrintBtn'"
                style="width: 76px"
                size="small"
                v-show="hiddenBtn"
                type="primary"
                class="button"
                :disabled="!data.selectionSpuId"
                @click="
                  htmlToPdf(`hangTagItem${index}`, `${data.styleNo}-洗水唛`)
                "
                >下载</el-button
              >
            </div>
            <div class="hangTagItemIndex" :id="`hangTagItem${index}`">
              <img
                v-if="index === 0"
                class="headLineImg"
                style="width: 76px; display: block"
                src="../../../../assets/hantagTop.png"
                alt=""
              />
              <div class="hangTagItem">
                <img
                  v-if="index === 0"
                  style="height: 302px"
                  src="../../../../assets/hangTagLeft.png"
                  alt=""
                />
                <div class="hangTag">
                  <div class="hangTagTop"></div>
                  <div class="hangTagSize dataBody2">
                    {{ item.sizeMainDesc }}
                  </div>
                  <div v-if="item.sizeSecondaryDesc" class="sizeSecondaryDesc">
                    {{ item.sizeSecondaryDesc }}
                  </div>
                  <div class="hangTagInfoContent">
                    <div
                      class="hangTagInfoItem"
                      v-for="itemChild in item.fabricInfoForDnaVOs"
                    >
                      <div class="hangTagInfoItemChild">
                        <div
                          :class="`infoText fontBold ${
                            item.fabricInfoForDnaVOs.length === 2 &&
                            'hangTagInfoLength2'
                          } `"
                          v-show="itemChild.partPositionId"
                        >
                          {{ itemChild.partName }}
                        </div>
                        <div
                          :class="`infoText ${
                            item.fabricInfoForDnaVOs.length === 2 &&
                            'hangTagInfoLength2'
                          } ${
                            item.fabricInfoForDnaVOs.length === 2 &&
                            itemChild.partValueList.length === 3 &&
                            'partValue3'
                          }
                    ${
                      item.fabricInfoForDnaVOs.length === 3 &&
                      itemChild.partValueList.length === 2 &&
                      'fabric3partValue2'
                    }
                    ${
                      item.fabricInfoForDnaVOs.length === 2 &&
                      itemChild.partValueList.length === 2 &&
                      'fabric2partValue2'
                    }
                    ${
                      item.fabricInfoForDnaVOs.length === 1 &&
                      itemChild.partValueList.length === 2 &&
                      'fabric1partValue2'
                    }
                    ${
                      item.fabricInfoForDnaVOs.length === 1 &&
                      itemChild.partValueList.length === 3 &&
                      'fabric1partValue3'
                    }
                    `"
                          v-for="partValueItem in itemChild.partValueList"
                        >
                          {{ partValueItem }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="line"></div>
                  <div class="icons">
                    <div class="imgItem" v-for="itemChild in item.imgList">
                      <img
                        style="width: 18px; height: 18px"
                        :src="`${itemChild}?${Math.random()}`"
                        crossOrigin="anonymous"
                        alt=""
                      />
                    </div>
                  </div>

                  <div class="hangTagfooter">
                    <div class="footerInfo">
                      <div class="hangTagwashCare footerText">
                        {{ item.washCare.nameEn }}
                      </div>
                    </div>

                    <div class="footerInfo">
                      <div :class="`footerText infoText `">
                        {{ primaryCode }}
                      </div>
                      <div class="infoText footerText fontBold">
                        MADE IN CHINA
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, inject, watch } from "vue";
import { htmlToPdf } from "html2pdf-dbs";
export default defineComponent({
  props: {
    data: {
      type: Object,
    },
  },
  setup(props: any) {
    const primaryCode = JSON.parse(localStorage.getItem("userInfo") || "{}")
      .primaryCode;

    const state = reactive({
      dialog: false,
      waterMarkList: [],
      hiddenBtn: true,
    });
    watch(
      () => props.data.selectionSpuId,
      () => {
        washingWaterMark();
      }
    );
    const washingWaterMark = () => {
      
    };
    const downFile = (data: any) => {
      state.hiddenBtn = false;
      setTimeout(() => {
        htmlToPdf("hangTag", `${data.styleNo}-洗水唛`);
        state.hiddenBtn = true;
      }, 200);
    };
    return {
      ...toRefs(state),
      washingWaterMark,
      primaryCode,
      htmlToPdf,
      downFile,
    };
  },
});
</script>
<style lang="less">
.card {
  margin-top: 10px;
}
.big-goods-dialog {
  margin: 1vh auto 0 !important;
}
// .card-header {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// }
#hangTag {
  font-weight: bolder;
  color: #000;
}
.cardContent {
  // width: 700px;
  // position: relative;
  margin-right: 10px;
  font-family: ui-rounded;
  // display: flex;
  // flex-wrap: wrap;
}
.hangTag {
  width: 76px;
  height: 302px;
  border: 1px solid #000;
  font-size: 12px;
  position: relative;
}

.hangTagTop {
  height: 23px;
  border-bottom: 1px dashed #000;
}
.hangTagTitle {
  text-align: center;
  line-height: 20px;
  padding: 2px 10px 0px;
  // font-family: "FontNexa";
}
.hangTagSize {
  font-size: 20px;
  line-height: 24px;
  font-weight: bold;
  text-align: center;
}
.sizeSecondaryDesc {
  text-align: center;
  transform: scale(0.7);
  margin-top: -5px;
  transform: scale(0.7);
  width: 140%;
  margin-left: -20%;
  line-height: 14px;
  font-weight: bolder;
}
.hangTagInfoContent {
  position: absolute;
  left: 0;
  right: 0;
  top: 50px;
  height: 110px;
  text-align: center;
  display: flex;
  flex-direction: column;
  /* co1umn 从上到下*/
  align-items: center;
}
// .hangTagInfo {
//   text-align: center;
//   line-height: 12px;
//   flex: 1;
// }
.hangTagInfoItem {
  // padding-top: 2px;
  flex: 1;
  display: flex;
  align-items: center;
}
.hangTagInfoItemChild {
  flex-direction: column;
  /* co1umn 从上到下*/
  align-items: center;
}

.infoText {
  // zoom: 0.62;
  margin-top: -5px;
  transform: scale(0.7);
  width: 140%;
  margin-left: -20%;
  line-height: 14px;
  font-weight: bolder;
}
.line {
  position: absolute;
  left: 0;
  right: 0;
  top: 162px;
  height: 1px;
  width: 20px;
  text-align: center;
  margin: 2px auto;
  background: #000;
}
.icons {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 42px;
  text-align: center;
  font-size: 12px;
  width: 60px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 30px);
  grid-template-rows: repeat(5, 18px);
  text-align: center;
}

.hangTagfooter {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0px;
  text-align: center;
  width: 138%;
  margin-left: -19%;
  font-size: 12px;
}
.footerInfo {
  margin-top: -8px;
}
.footerText {
  transform: scale(0.5);
}
.hangTagContent {
  display: flex;
  flex-wrap: wrap;
}
.footerImg {
  position: absolute;
  right: 1px;
  bottom: 0;
  width: 16px;
}
.fontBold {
  font-weight: font-weight;
}
.codevisibility {
  visibility: hidden;
  margin-top: -5px;
  height: 12px;
}
.hangTagInfoLength2 {
  margin-top: 0px;
}
.partValue3 {
  margin-top: -2px;
}
.fabric3partValue2 {
  margin-top: -4px;
}
.fabric2partValue2 {
  margin-top: -4px;
}
.hangTagInfoItemLength2 {
  margin-top: 12px;
}
.hangTagInfoItemLength3 {
  margin-top: 2px;
  height: 36px;
}
.fabric1partValue2 {
  height: 40px;
  padding-top: 16px;
}
.fabric1partValue3 {
  height: 40px;
  padding-top: 16px;
}
.dataBody2 {
  margin-top: 4px;
}
.hangTagwashCare {
  text-transform: capitalize;
}
.hangTagItemIndex {
  width: 240px;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bolde1r;
  color: #000;
  position: relative;
}
.hangTagItem {
  display: flex;
  align-items: center;
}
.headLineImg {
  position: absolute;
  top: -17px;
  right: 13px;
}
.downPrintBtn {
  margin-right: 50px;
}
</style>
