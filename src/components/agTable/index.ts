/*
 * @author: zhao yongfei
 * @Date: 2023-02-02 15:51:16
 * @description: 
 * @LastEditTime: 2023-06-21 11:55:55
 * @LastEditors: zhao yongfei
 * @FilePath: /dfs-page-config/src/components/agTable/index.ts
 */
import AgTable from './AgTable.vue';
AgTable.install = Vue => Vue.component(AgTable.name, AgTable);
export default AgTable;