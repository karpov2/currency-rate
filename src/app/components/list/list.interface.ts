import {
    NzTableFilterFn,
    NzTableFilterList,
    NzTableSortFn,
    NzTableSortOrder,
} from 'ng-zorro-antd/table'

export interface ListItem {
    code: string
    name: string
    rate: number
}

export interface ColumnItem {
    name: string
    sortOrder: NzTableSortOrder | null
    sortFn: NzTableSortFn<ListItem> | null
    listOfFilter?: NzTableFilterList
    filterFn?: NzTableFilterFn<ListItem> | null
    filterMultiple?: boolean
    sortDirections: NzTableSortOrder[]
}
