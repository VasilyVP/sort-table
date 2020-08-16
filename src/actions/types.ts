import { tableDataT } from '../common/types'

export enum actionTypes {
    setTableData = 'Store table to the state'
}

export type actionsT = {
    type: actionTypes,
    tableData: tableDataT
}