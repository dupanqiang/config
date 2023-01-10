<!--
 * @Author: your name
 * @Date: 2021-09-06 18:27:03
 * @LastEditTime: 2022-08-08 15:41:19
 * @LastEditors: zhao yongfei
 * @Description: In User Settings Edit
 * @FilePath: /dfs-page-vue/src/components/SplitScreenTempl.vue
-->

<template>
  <div class="parent" ref="parentRef">
    <div class="pannel-container top-pannel" ref="listRef">
      <slot name="list"></slot>
    </div>
    <div class="drag-trigger" ref="dragRef">
      <div class="trigger-bar">
        <em></em><em></em><em></em><em></em><em></em><em></em><em></em><em></em>
      </div>
    </div>
    <div class="pannel-container bottom-pannel" ref="detailRef">
      <slot name="details"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import CellItemEdit from "@/components/CellItemEdit.vue"
export default defineComponent({
  components: {CellItemEdit},
  setup() {
    const parentRef = ref();
    const listRef = ref();
    const detailRef = ref();
    const dragRef = ref();
    const state = reactive({
      
    });
    onMounted(() => {
      // 拖动相关
      setTimeout(() => {
        let percentage = 0;
        const parentHeight = parentRef.value.clientHeight;
        const header = (document.querySelector(".el-header") as any);
        const headerHeight = header ? header.clientHeight : 0;
        const eleHeaderBtnBox = (document.querySelector(".header-btns") as any);
        const topHeight = (headerHeight + 5 + 3) + (eleHeaderBtnBox ? eleHeaderBtnBox.clientHeight : 0); // 加上main的padding-top: 5px, 加上拖动元素高度的一半: 3px
      
        const dragEle = dragRef.value;
        dragEle.addEventListener("mousedown", startFn, { passive: false })
        function startFn(e: any) {
          const ev = e || event;
          // 拖拽
          document.addEventListener("mousemove", moveFn, false)
          function moveFn(e: any) {
            const ev = e || event;
            const disY = ev.clientY - topHeight;
            percentage = disY / parentHeight * 100;
            if (percentage < 0) {
              percentage = 0
            } else if (percentage > 99) {
              percentage = 99;
            }
            // 拖拽元素位置
            dragEle.style.top = percentage + '%';
          }
          document.addEventListener("mouseup", endFn, false)
          function endFn() {
            // 设置上下高度
            listRef.value.style.bottom = (100 - percentage) + '%';
            detailRef.value.style.top = percentage + '%';
            // 移除事件
            document.removeEventListener("mousemove", moveFn, false)
            document.removeEventListener("mouseup", endFn, false)
            // 去掉透明层
            dragEle.releaseCapture && dragEle.releaseCapture()
          }
          //阻止浏览器默认行为
          ev.preventDefault()
          dragEle.setCapture && dragEle.setCapture()
        }
      }, 1000)
    })
    return {
      parentRef,
      listRef,
      detailRef,
      dragRef,
      ...toRefs(state)
    };
  },
});
</script>

<style lang="less" scoped>
  .parent {
    height: 100%;
    position: relative;
    // background: #fff;
  }
  .pannel-container {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0;
    width: 100%;
  }
  .top-pannel {
    top: 0;
    bottom: 30%;
    padding-bottom: 4px;
  }
  .bottom-pannel {
    top: 70%;
    bottom: 0;
    padding-top: 10px;
  }
  .drag-trigger {
    position: absolute;
    top: 70%;
    left: 0;
    width: 100%;
    z-index: 100;
    height: 4px;
    background: #f8f8f9;
    border-left: none;
    border-right: none;
    cursor: row-resize;
    border: 1px solid #dcdee2;
    .trigger-bar {
      position: absolute;
      overflow: hidden;
      left: 50%;
      top: 0;
      width: 32px;
      transform: translate(-50%);
      em {
        height: 4px;
        width: 1px;
        background: rgba(23,35,61,.25);
        float: left;
        margin-right: 3px;
      }
    }
  }
</style>
