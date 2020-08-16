//import { Dispatch } from 'redux'
import { actionTypes } from './types'
import { tableDataT, preparedTableRowT } from '../common/types'

const types = actionTypes;

export function setTableData(tableData: tableDataT) {
    const head = tableData[0];
    const body = tableData.slice(1);

    const initialObj = {} as preparedTableRowT;

    const preparedBody = body.map(row =>
        row.reduce((acc, el, i) => {
            if (typeof el === 'boolean') el = String(el).toUpperCase();
            return { ...acc, [head[i]]: el }
        }, initialObj)
    );

    return {
        type: types.setTableData,
        tableData: {
            head: head,
            body: preparedBody,
            //sortedBody: preparedBody.slice()
        }
    }
}

/*
export function sortTable({ order, sortBy }) {

}
*/