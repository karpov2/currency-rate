import { Component, OnInit } from '@angular/core'
import { CurrenciesService } from './services/currencies.service'
import { ListItem } from './components/list/list.interface'
import { map, take } from 'rxjs/operators'
import { Currencies } from './services/currencies.interface'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    currencies: Currencies[] = []
    selectedValue: string = ''
    amount?: string
    listOfData: ListItem[] = []

    constructor(private currenciesService: CurrenciesService) {}

    ngOnInit(): void {
        this.currenciesService.getCurrencies().subscribe((value) => {
            this.currencies = value
            this.selectedValue =
                value.find((data) => data.code === 'USD')?.code || value[0].code
            this.getLatest()
        })
    }

    trackByFn(index: number, name: Currencies): string {
        return name.code
    }

    change(code: string) {
        this.selectedValue = code
        this.getLatest()
    }

    private getLatest(): void {
        this.currenciesService
            .getLatest(this.selectedValue)
            .pipe(
                take(1),
                map((value) => {
                    const acc: ListItem[] = []
                    for (let [code, rate] of Object.entries(value)) {
                        const name =
                            this.currencies.find(
                                (currency) => currency.code === code
                            )?.name || ''
                        acc.push({
                            code,
                            name,
                            rate,
                        })
                    }
                    return acc
                })
            )
            .subscribe((value) => {
                this.listOfData = value
            })
    }
}
