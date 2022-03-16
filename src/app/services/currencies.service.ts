import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { map, take } from 'rxjs/operators'
import { Codes, Currencies, Latest, Pair, Rates } from './currencies.interface'

@Injectable({
    providedIn: 'root',
})
export class CurrenciesService {
    private currencies$: Subject<Currencies[]> = new Subject<Currencies[]>()
    private api_key = '26fc8deb4fd9b942bae285aa'
    private url = `https://v6.exchangerate-api.com/v6/${this.api_key}`

    constructor(private http: HttpClient) {
        this.getApiListCurrencies()
            .pipe(take(1))
            .subscribe((value) => {
                this.currencies$.next(value)
            })
    }

    getCurrencies(): Observable<Currencies[]> {
        return this.currencies$.asObservable()
    }

    private getApiListCurrencies(): Observable<Currencies[]> {
        return this.http.get<Codes>(`${this.url}/codes`).pipe(
            map((value) => {
                return value.supported_codes.map(([code, name]) => ({
                    code,
                    name,
                }))
            })
        )
    }

    getLatest(base: string): Observable<Rates> {
        return this.http
            .get<Latest>(`${this.url}/latest/${base}`)
            .pipe(map((value) => value.conversion_rates))
    }

    getPair(
        base: string,
        target: string,
        amount: number = 1
    ): Observable<number> {
        let url = `${this.url}/pair/${base}/${target}/${amount}`
        return this.http
            .get<Pair>(url)
            .pipe(map((data) => data.conversion_result))
    }
}
