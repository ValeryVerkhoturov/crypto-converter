export type Currency = "BTC" | "ETH" | "USDT"

export interface ConverterForm {
    from: Currency
    to: Currency
    amount: number
    result?: number
}
