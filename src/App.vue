<!--
 * @author: zhao yongfei
 * @Date: 2023-01-09 11:53:20
 * @description: 
 * @LastEditTime: 2023-01-13 21:26:17
 * @LastEditors: zhao yongfei
 * @FilePath: /dfs-page-config/src/App.vue
-->
<template>
  <Example></Example>
  <!-- <Example2></Example2> -->
  
</template>
<script setup lang="ts">
  import { useStore } from "vuex";
  import Example from '@/views/example/index.vue';
  // import Example2 from '@/views/example2/index.vue';
  const store = useStore();
  store.state.baseUrl = "https://gateway-qa.doublefs.com";
  store.state.uploadFileUrl = store.state.baseUrl + `/open/api/base/file/upload`;
</script>
<style>
html, body {
  height: 100%;
  margin: 0;
}
</style>
