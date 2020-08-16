import React, { useState, useReducer } from 'react';
import { useSelector } from 'react-redux'
import { Column, Table, SortDirection, SortDirectionType } from 'react-virtualized';
// AutoSizer, TableCellRenderer, TableHeaderProps, 
import { rootStateT, preparedTableRowT } from '../common/types'
import 'react-virtualized/styles.css'
import _ from 'lodash'

export default function () {
    const head = useSelector((state: rootStateT) => state.tableData ? state.tableData.head : []);
    const body = useSelector((state: rootStateT) => state.tableData ? state.tableData.body : []);

    const [sortParams, setSortParams] = useState({
        sortBy: '',
        sortDirection: SortDirection.ASC as SortDirectionType
    });

    type actionT = {
        type: 'sort' | 'reset';
        order?: SortDirectionType;
        sortBy?: string;
    };

    const [sortedBody, setSortedBody] = useReducer((state: preparedTableRowT[], action: actionT) => {
        switch (action.type) {
            case 'reset':
                return [];
            case 'sort':
                const order = (action.order || '') === 'ASC' ? 'asc' : 'desc';

                return _.orderBy(body, [action.sortBy || ''], [order]);
            default:
                throw new Error('Unexpected action type');
        }

    }, []);

    if (sortedBody.length && sortedBody.length !== body.length) setSortedBody({ type: 'reset' })

    function _sort({ sortBy, sortDirection }: { sortBy: string, sortDirection: SortDirectionType }) {
        setSortParams({ sortBy, sortDirection });
        setSortedBody({
            type: 'sort',
            order: sortDirection,
            sortBy: sortBy,
        });
    }

    const tableHead = head.map(col => <Column label={col} dataKey={col} width={100} />)

    return (
        <>
            {head.length > 0 ?
                <Table
                    width={2000}
                    height={800}
                    headerHeight={40}
                    rowHeight={30}
                    rowCount={sortedBody.length || body.length}
                    rowGetter={({ index }) => sortedBody.length ? sortedBody[index] : body[index]}
                    sort={_sort}
                    sortBy={sortParams.sortBy}
                    sortDirection={sortParams.sortDirection} >
                    {tableHead}
                </Table>
                : null}
        </>
    )
}
