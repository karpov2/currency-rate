import { Component, ChangeDetectionStrategy, Input } from '@angular/core'
import { Currencies } from '../../services/currencies.interface'
import { CurrenciesService } from '../../services/currencies.service'
import { take } from 'rxjs/operators'
import { Subject } from 'rxjs'

@Component({
    selector: 'app-convert',
    templateUrl: './convert.component.html',
    styleUrls: ['./convert.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConvertComponent {
    selectedValue: string = ''
    targetSelectedValue: string = ''
    amount: number = 1
    resultAmount: Subject<number> = new Subject<number>()
    @Input() set currencies(value: Currencies[]) {
        if (!value.length) {
            return
        }
        this._currencies = value
        this.selectedValue =
            value.find((currency) => currency.code === 'USD')?.code ||
            value[0].code
        this.setTargetCurrencies()
    }
    get currencies() {
        return this._currencies
    }
    private _currencies: Currencies[] = []
    targetCurrencies: Currencies[] = []

    constructor(private currenciesService: CurrenciesService) {}

    trackByFn(index: number, name: Currencies): string {
        return name.code
    }

    onAmountChange(amount: number) {
        if (amount) {
            this.amount = amount
            this.getPair()
        }
    }

    onCodeChange(code: string) {
        this.selectedValue = code
        this.setTargetCurrencies()
        this.getPair()
    }

    onTargetCodeChange(code: string) {
        this.targetSelectedValue = code
        this.getPair()
    }

    setTargetCurrencies() {
        this.targetCurrencies = this.currencies.filter(
            (currency) => currency.code !== this.selectedValue
        )
    }

    getPair() {
        if (this.selectedValue && this.targetSelectedValue) {
            this.currenciesService
                .getPair(
                    this.selectedValue,
                    this.targetSelectedValue,
                    this.amount
                )
                .pipe(take(1))
                .subscribe((amount) => {
                    this.resultAmount.next(amount)
                    console.log('result convert', amount)
                })
        }
    }
}
