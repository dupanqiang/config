/*
 * @author: zhao yongfei
 * @Date: 2023-01-10 13:02:15
 * @description: 
 * @LastEditTime: 2023-02-02 15:39:34
 * @LastEditors: zhao yongfei
 * @FilePath: /dfs-page-config/src/vite-env.d.ts
 */
/// <reference types="vite/client" />
declare module "*.vue" {
  import { DefineComponent } from "vue"
  const component: DefineComponent<{}, {}, any>
  export default component
}