<!--
 * @author: zhao yongfei
 * @Date: 2022-02-23 18:53:25
 * @description: 
 * @LastEditTime: 2023-01-11 20:36:34
 * @LastEditors: zhao yongfei
 * @FilePath: /dfs-page-config/src/views/example2/components/PrintHtml.vue
-->
<template>
  <div :id="id" class="print-box">
    <div v-for="data in printData" :key="data.id" style="padding: 30px; page-break-after: always">
      <ul class="info">
        <li>
          <p>
            <label>供应商名称：</label><span>{{ data.supplierName }}</span>
          </p>
          <p>
            <label>采购单号：</label><span>{{ data.id }}</span>
          </p>
        </li>
        <li>
          <p>
            <label>下单日期：</label><span>{{ data.createTime }}</span>
          </p>
          <p>
            <label>下单备注：</label><span>{{ data.remark }}</span>
          </p>
        </li>
      </ul>
      <table class="table" cellspacing="0" cellpadding="0" aria-describedby="">
        <tr>
          <th :id="item.field" v-for="item in columns" :key="item.field">{{item.headerName}}</th>
        </tr>
        <tr v-for="(item, index) in data.skuVos" :key="item.unit + item.styleNo">
          <td v-for="column in columns" :key="column.field" :class="{'no-border': index == 16 || index > 0 && (index - 16) % 19 == 0}">
            <div v-if="index == 16" style="height: 40px"></div>
            <div v-else-if="(index - 16) % 19 == 0" style="height: 36px"></div>
            <div 
              v-if="index == 16 || (index - 16) % 19 == 0"
              class="mask" :style="{height: index == 16 ? '40px' : '36px'}"
            ></div>
            <div>
              <img v-if="column.field == 'image'" class="good-image" :src="item[column.field]" alt=""/>
              <span v-else>{{item[column.field]}}</span>
            </div>
          </td>
        </tr>
      </table>
      <div class="total-box">
        <div class="total">
          <div>颜色合计</div>
          <ul>
            <li v-for="item in data.colorVos" :key="item.color">
              <span>{{ item.color }}</span>
              <span>{{ item.num }}</span>
            </li>
          </ul>
        </div>
        <div class="total purchase-total">
          <span>采购单合计</span>
          <span>{{ data.totalOrderQuantity }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs, defineComponent, inject } from "vue";
import Print from "@/utils/print"

export default defineComponent({
  props: {
    selArr: Array
  },
  setup(props) {
    const state = reactive({
      id: 'print-id' + Date.now(),
      printData: {
        skuVos: []
      },
      columns: [
        {
          headerName: "图片",
          field: "image",
          minWidth: 180
        },
        {
          headerName: "供应商款号",
          field: "styleNo",
          minWidth: 280
        },
        {
          headerName: "颜色",
          field: "color"
        },
        {
          headerName: "尺码",
          field: "unit"
        },
        {
          headerName: "生产量",
          field: "orderQuantity"
        },
        {
          headerName: "交付日期",
          field: "hopeFirstArrivalDate"
        }
      ]
    })
    function print() {
      const ids = props.selArr.map((item) => {
        return item.id
      })
    }
     
    return {
      ...toRefs(state),
      print
    };
  }
});
</script>

<style lang="less" scoped>
.print-box {
  display: none;
  position: relative;
  // top: 0;
  // left: 0;
  background: #fff;
  width: 100%;
  .info {
    margin-bottom: 15px;
    li {
      margin: 10px;
      display: flex;
      justify-content: space-between;
      width: 100%;
      p {
        width: 50%;
        display: flex;
        align-items: center;
      }
      label {
        width: 100px;
        font-weight: bold;
        margin-right: 20px;
      }
    }
  }
  .table {
    width: 100%;
    text-align: left;
    border-top: 1px solid #ccc;
    border-bottom: 0;
    th, td {
      padding: 2px;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
    }
    th:first-child, td:first-child {
      border-left: 1px solid #ccc;
    }
    .no-border {
      position: relative;
      // border-right: none;
      // border-left: none !important;
      .mask {
        width: calc(100% + 2px);
        position: absolute;
        top: 0;
        left: -1px;
        background: #fff;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
      }
    }
  }
  .total {
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    width: 500px;
    margin-top: 10px;
    text-align: center;
    >div {
      padding: 0 30px;
    }
    ul {
      flex: 1;
      li {
        border-bottom: 1px solid #ccc;
        span {
          display: inline-block;
          width: 50%;
          border-left: 1px solid #ccc;
        }
      }
      li:last-child {
        border-bottom: none;
      }
    }
  }
  .total.purchase-total span {
    width: 50%;
    border-right: 1px solid #ccc;
  }
  .good-image {
    // width: 55px;
    height: 55px;
    border: 0;
  }
}
</style>

