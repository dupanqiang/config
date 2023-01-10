<!--
 * @Author: zengkai
 * @Date: 2022-06-27 14:17:34
 * @LastEditTime: 2022-08-22 19:57:56
 * @LastEditors: zengkai
 * @FilePath: /dfs-page-vue/src/components/rowComponents/textArr.vue
-->
<template>
  <div class="container">
    <span
      class="labelText"
      :style="`width:${componentOption.labelWidth}`"
      v-if="componentOption.label"
      >{{ componentOption.label }}：
    </span>
    <span v-if="!componentOption.multipleValues">
      <span style="margin-right: 5px" v-for="item in componentOption.value">{{
        item
      }}</span>
    </span>
    <span v-if="componentOption.multipleValues">
      <span
        style="margin-right: 5px"
        v-for="(item, index) in componentOption.value"
      >
        <span
          v-for="(itemChild, index) in componentOption.multipleValues"
          class="componentOptionTextStyle"
          style="text-align: center"
        >
          <span v-for="(valueChildKey, index) in itemChild.valuekey">
            <span v-if="valueChildKey.type == 'text'">
              {{ item[valueChildKey.key] }}
            </span>
          </span>
        </span>
      </span>
    </span>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent } from "vue";
export default defineComponent({
  name: "TextArr",
  props: {
    componentOption: {
      type: Object,
      default: {},
    },
  },
  components: {},
  setup() {
    const state = reactive({});
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="less" scoped></style>
