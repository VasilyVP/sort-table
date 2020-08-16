type tableCellT = string | number;

export type tableRowT = tableCellT[];

export type tableDataT = tableRowT[];

export interface preparedTableRowT {
    [key: string]: tableCellT
};

export type preparedTableDataT = preparedTableRowT[];

export type rootStateT = {
    tableData: {
        head: string[],
        body: preparedTableDataT,
        //sortedBody: preparedTableDataT
    },
}