<!--
 * @author: zhao yongfei
 * @Date: 2022-02-14 22:13:46
 * @description: 
 * @LastEditTime: 2023-01-11 20:44:52
 * @LastEditors: zhao yongfei
 * @FilePath: /dfs-page-config/src/views/example2/components/BomInfo-old.vue
-->
<template>
  <el-dialog
    title="BOM信息"
    v-model="dialog"
    :width="'1200px'"
    @open="dialogOpen"
    center
    :append-to-body="true"
  >
    <div>
      <div class="top-info">
        <span><span>款号：</span>{{baseInfo.supplierStylesCode}}</span>
        <span><span>版号：</span>{{data.bomNo}}</span>
        <span><span>款名：</span>{{baseInfo.name}}</span>
        <span><span>尺码：</span>{{baseInfo.size}}</span>
        <span><span>颜色：</span>{{baseInfo.color}}</span>
      </div>
      <el-tabs v-model="activeName" type="border-card" style="height: 75vh;">
        <el-tab-pane label="物料清单" name="物料清单">
          <p class="materials-title" style="margin-top: 0">面料清单</p>
        </el-tab-pane>
        <el-tab-pane label="工艺指示" name="工艺指示">
          <div style="max-height: 65vh; overflow-y: auto; border-top: 1px solid #ccc;">
            <!-- <el-card class="card"> -->
              <ul class="list">
                <li v-for="item in processGuideData" :key="item.processType">
                  <span>{{ item.processType }}</span>
                  <em></em>
                  <div v-html="item.way"></div>
                </li>
              </ul>
              <!-- <p style="font-weight: 600">设计参考图</p> -->
              <ul class="img-list">
                <li v-for="(src, index) in designReferenceDiagram" :key="index">
                   <el-image
                      :src="src"
                      :preview-src-list="designReferenceDiagram"
                      :hide-on-click-modal="true"
                    >
                    </el-image>
                </li>
              </ul>
            <!-- </el-card> -->
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import {
  defineComponent,
  inject,
  reactive,
  toRefs
} from "vue";
export default defineComponent({
  props: {
    data: {
      type: Object,
    }
  },
  setup(props: any) {
    const state = reactive({
      dialog: false,
      activeName: '物料清单',
      baseInfo: {},
      fabricColumns:<any> [],
      fabricListDataList: [],

      materialsColumns:<any> [],
      materialsListDataList: [],

      sizesGuideColumns:<any> [],
      sizesGuideDataList: [],

      processGuideData: [],
      designReferenceDiagram: []
    });
    function dialogOpen() {
      
    // 关闭弹窗
    function closeDialog() {
      state.dialog = false;
      state.sizesGuideDataList = []
    }
    // 获取物料清单信息
    function getMaterialsData(data: any) {
      // 面料
      const columns: any = getColumns().fabric
      data.fabricList[0].color.forEach((color: string) => {
        columns.push({
          label: color,
          value: color,
          width: "120px"
        });
      });
      state.fabricColumns = columns
      state.fabricListDataList = data.fabricList;

      // 辅料
      const materialsColumns: any = getColumns().fabric
      data.materialsList[0].color.forEach((color: string) => {
        materialsColumns.push({
          label: color,
          value: color,
          width: "120px"
        });
      });
      state.materialsColumns = materialsColumns
      state.materialsListDataList = data.materialsList;
    }
    // 获取尺寸指示信息
    function getSizesGuideData(data: any) {
      const columns: any = getColumns().sizesGuide
      data.sizes.forEach((size: string) => {
        columns.push(
          {
            label: size,
            value: size,
          }
        )
      })
      state.sizesGuideColumns = columns
      state.sizesGuideDataList = data.items;
    }
    // 获取工艺指示信息
    function getProcessGuideData(data: any) {
      state.processGuideData = data.processGuide
      state.designReferenceDiagram = data.designReferenceDiagram;
    }
    function getColumns() {
      return {
        fabric: [
          {
            label: "供应商",
            value: "supplierCompany",
            width: "170px"
          },
          {
            label: "全速物料编码",
            value: "materialCode",
            width: "100px"
          },
          {
            label: "物料成分",
            value: "mtComponent",
          },
          {
            label: "门幅",
            value: "mtWidth",
            width: "70px"
          },
          {
            label: "克重",
            value: "weight",
            width: "70px"
          },
          {
            label: "供应商货号",
            value: "doublefsMaterialCode",
          },
          {
            label: "单位",
            value: "unit",
            width: "70px"
          },
          {
            label: "备注",
            value: "remark",
            width: "200px"
          },
          // {
          //   label: "物料代码",
          //   value: "materialCode",
          //   width: "80px"
          // },
          {
            label: "使用部位",
            value: "usePart",
          },
        ],
        sizesGuide: [
          {
            label: "部位",
            value: "name",
            minWidth: "140px",
          },
          {
            label: "测量方法",
            value: "MeasurementMethods",
            minWidth: "140px",
          },
          {
            label: "误差范围±",
            value: "errRange",
            width: 80,
          },
          // {
          //   label: "挡差",
          //   value: "diffRange",
          //   width: 80,
          // },
          {
            label: "样板值",
            value: "tmpValue",
            width: 80,
          }
        ]
      }
    }
    return {
      ...toRefs(state),
      dialogOpen,
      closeDialog,
    };
  },
});
</script>
<style lang="less" scoped>
.top-info {
  margin-bottom: 5px;
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-around;
  >span {
    min-width: 350px;
    margin-bottom: 5px;
    span {
      display: inline-block;
      width: 60px;
      font-weight: bold;
      color: #17233d;
    }
  }
}
.materials-title {
  font-weight: 600;
  color: #17233d;
  margin: 10px 0 5px;
}
.list {
  border: 1px solid #ccc;
  border-top: none;
  border-bottom: none;
  li {
    display: flex;
    min-height: 60px;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding: 10px;
    position: relative;
    span {
      font-weight: bold;
      width: 140px;
      // text-align: center;
      margin-right: 20px;
    }
    i {
      width: 1px;
      border-right: 1px solid #ccc;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 160px;
    }
    div {
      flex: 1;
    }
  }
}
.img-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 10px;
  li {
    // margin: 10px;
    // flex: 1;
    height: 300px;
    width: 250px;
    position: relative;
    overflow: hidden;
    img {
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
<style lang="less">
.box-info-dialog {
  margin-top: 5vh;
  .el-tabs {
    padding-bottom: 10px;
  }
  .el-tabs__content {
    height: calc(100% - 40px);
    overflow-y: auto;
    padding-bottom: 0;
  }
}
</style>