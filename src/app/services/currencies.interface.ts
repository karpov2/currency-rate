export interface ExchangerateResponse {
    result: string
    documentation: string
    terms_of_use: string
}

export interface Codes extends ExchangerateResponse {
    supported_codes: [string, string]
}

export interface Currencies {
    name: string
    code: string
}

export interface Rates {
    [key: string]: number
}

interface TimeUpdate {
    time_last_update_unix: number
    time_last_update_utc: string
    time_next_update_unix: number
    time_next_update_utc: string
}

export interface Latest extends ExchangerateResponse, TimeUpdate {
    base_code: string
    conversion_rates: Rates
}

export interface Pair extends ExchangerateResponse, TimeUpdate {
    base_code: string
    target_code: string
    conversion_rate: number
    conversion_result: number
}
