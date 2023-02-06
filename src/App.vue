<!--
 * @author: zhao yongfei
 * @Date: 2023-01-09 11:53:20
 * @description: 
 * @LastEditTime: 2023-02-06 19:15:48
 * @LastEditors: zhao yongfei
 * @FilePath: /dfs-page-config/src/App.vue
-->
<template>
  <Example></Example>
  <!-- <Example2></Example2> -->
  
</template>
<script setup lang="ts">
  import { useStore } from "vuex";
  import { handleEnter } from "@/utils";
  import { queryData } from "@/common/js/pageConfigUtils"
  import Example from '@/views/example/index.vue';
  // import Example2 from '@/views/example2/index.vue';
  const store = useStore();
  handleEnter((ev: any) => {
    const pageKey = ev.target.dataset.pagekey
    const target = ev.target.dataset.target
    if (target) {
      queryData(store, pageKey, target)
    }
  })
</script>
<style>
html, body {
  height: 100%;
  margin: 0;
}
</style>
