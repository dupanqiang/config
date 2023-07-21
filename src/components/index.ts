/*
 * @author: zhao yongfei
 * @Date: 2023-01-13 17:42:04
 * @description: 
 * @LastEditTime: 2023-07-21 13:46:08
 * @LastEditors: zhao yongfei
 * @FilePath: /dfs-page-config/src/components/index.ts
 */
import SplitScreen from "@/components/SplitScreen.vue";
import Form from "@/components/form/Form.vue";
import ButtonGroup from "@/components/ButtonGroup.vue";
import AgTable from "@/components/agTable/AgTable.vue";
import CommonDialog from "./CommonDialog.vue";
// import CellOperation from "@/components/CellOperation.vue"
// import CellItemEdit from "@/components/CellItemEdit.vue"
import Descriptions from "@/components/Descriptions.vue"

export default (app: any) => {
    const components = [
        SplitScreen,
        Form,
        ButtonGroup,
        AgTable,
        CommonDialog,
        // CellOperation,
        // CellItemEdit,
        Descriptions
    ]
    components.map(component => {
        app.component(component.name, component)
    })
}
