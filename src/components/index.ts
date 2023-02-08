/*
 * @author: zhao yongfei
 * @Date: 2023-01-13 17:42:04
 * @description: 
 * @LastEditTime: 2023-02-07 16:17:42
 * @LastEditors: zhao yongfei
 * @FilePath: /dfs-page-config/src/components/index.ts
 */
import SplitScreen from "@/components/SplitScreen.vue";
import Form from "@/components/Form.vue";
import ButtonGroup from "@/components/ButtonGroup.vue";
import AgTable from "@/components/AgTable.vue";
import CommonDialog from "./CommonDialog.vue";
// import CellOperation from "@/components/CellOperation.vue"
import CellItemEdit from "@/components/CellItemEdit.vue"
import Descriptions from "@/components/Descriptions.vue"

export default (app: any) => {
    const components = [
        SplitScreen,
        Form,
        ButtonGroup,
        AgTable,
        CommonDialog,
        // CellOperation,
        CellItemEdit,
        Descriptions
    ]
    components.map(component => {
        app.component(component.name, component)
    })
}
