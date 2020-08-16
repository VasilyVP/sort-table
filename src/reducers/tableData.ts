import { initialState } from '../common/consts'
import { actionsT, actionTypes } from '../actions/types'

export default (state = initialState.tableData, action: actionsT) => {
    switch (action.type) {
        case actionTypes.setTableData:
            return action.tableData;
        default:
            return state;
    }
}