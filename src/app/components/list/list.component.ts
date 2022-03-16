import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core'
import { ColumnItem, ListItem } from './list.interface'

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
    @Input() listOfData: ListItem[] = []

    listOfColumns: ColumnItem[] = [
        {
            name: 'Код',
            sortOrder: null,
            sortFn: (a: ListItem, b: ListItem) => a.code.localeCompare(b.code),
            sortDirections: ['ascend', 'descend', null],
        },
        {
            name: 'Название',
            sortOrder: null,
            sortDirections: ['ascend', 'descend', null],
            sortFn: (a: ListItem, b: ListItem) => a.name.length - b.name.length,
        },
        {
            name: 'Курс',
            sortOrder: 'descend',
            sortFn: (a: ListItem, b: ListItem) => a.rate - b.rate,
            sortDirections: ['ascend', 'descend', null],
        },
    ]

    constructor() {}

    ngOnInit(): void {}
}
