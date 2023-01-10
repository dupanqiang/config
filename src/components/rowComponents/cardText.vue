<!--
 * @Author: zengkai
 * @Date: 2022-06-12 21:15:22
 * @LastEditTime: 2022-08-17 11:49:14
 * @LastEditors: zengkai
 * @FilePath: /dfs-page-vue/src/components/rowComponents/cardText.vue
-->
<template>
  <div class="cardTextRow">
    <el-card
      v-for="(item, index) in componentOption.value"
      shadow="hover"
      style="width: 200px"
    >
      <div
        v-for="(itemChild, index) in componentOption.multipleValues"
        class="cardTextStyle"
        style="text-align: center"
      >
        <span v-for="(valueChildKey, index) in itemChild.valuekey">
          <span v-if="valueChildKey.type == 'text'">
            {{ item[valueChildKey.key] }}
          </span>
          <el-button
            size="small"
            :style="valueChildKey.style"
            type="primary"
            v-if="valueChildKey.type == 'btn'"
          >
            {{ valueChildKey.key }}
          </el-button>
        </span>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent } from "vue";
export default defineComponent({
  name: "CardText",
  components: {},

  props: {
    componentOption: {
      type: Array,
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

<style lang="less" scoped>
.cardTextRow {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.cardTextStyle {
  padding: 10px 0;
}
</style>
