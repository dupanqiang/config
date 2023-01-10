<!--
 * @Author: zengkai
 * @Date: 2022-08-01 21:39:51
 * @LastEditTime: 2022-08-22 11:53:39
 * @Description: 
 * @LastEditors: zengkai
 * @FilePath: /dfs-page-vue/src/components/rowComponents/detileFooter.vue
-->
<template>
  <div class="bottomTab">
    <el-button
      style="padding: 10px"
      v-for="(itemChild, index) in componentOption.children"
      :type="itemChild.type"
      @click="itemChild.handle()"
      v-show="itemChild.isShow || true"
      :disabled="itemChild.disabled"
    >
      {{ itemChild.label }}
    </el-button>
    <!-- <el-button
      :disabled="this.$route.query.type === 'check'"
      type="danger"
      class="allBtn"
      @click="giveUpTask()"
      >放弃此版本翻译</el-button
    > -->
    <!-- <el-button
        :disabled="this.$route.query.type === 'check'"
        type="primary"
        class="allBtn"
        @click="showModal()"
        >确认翻译内容</el-button
      >
      <el-button class="allBtn" @click="$router.go(-1)"> 返 回</el-button> -->
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent } from "vue";
export default defineComponent({
  name: "DetileFooter",
  components: {},
  props: {
    componentOption: {
      type: Object,
    },
  },
  setup() {
    const state = reactive({});
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="less" scoped></style>
