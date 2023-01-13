/*
 * @author: zhao yongfei
 * @Date: 2023-01-13 17:42:04
 * @description: 
 * @LastEditTime: 2023-01-13 19:08:20
 * @LastEditors: zhao yongfei
 * @FilePath: /dfs-page-config/src/components/index.ts
 */
import SplitScreen from "@/components/SplitScreen.vue";
import Form from "@/components/Form.vue";
import ButtonGroup from "@/components/ButtonGroup.vue";
import AgTable from "@/components/AgTable.vue";
import CommonDialog from "./CommonDialog.vue";
import CellOperationBtn from "@/components/CellOperationBtn.vue"
import CellItemEdit from "@/components/CellItemEdit.vue"

export default (app: any) => {
    app.component('SplitScreen', SplitScreen)
    app.component('Form', Form)
    app.component('ButtonGroup', ButtonGroup)
    app.component('AgTable', AgTable)
    app.component('CommonDialog', CommonDialog)
    app.component('CellOperationBtn', CellOperationBtn)
    app.component('CellItemEdit', CellItemEdit)
}
