export type Currency = "usd" | "eur" | "gbp"

export type MarketData = {
  current_price: { usd: number }
  price_change_percentage_24h: number
  market_cap: { usd: number }
  total_volume: { usd: number }
  high_24h: { usd: number }
  low_24h: { usd: number }
}

export type CoinDetails = {
  name: string
  symbol: string
  error: string
  description: { en: string }
  market_data: MarketData
  status: { error_code?: string; error_message?: string }
}

export type PriceData = {
  prices: [number, number][]
}

export interface SearchParamsTypes {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export interface CryptoData {
  [key: string]: {
    [key in Currency]: number
  } & {
    [key: string]: number
  }
}
