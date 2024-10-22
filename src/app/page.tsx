import { API_KEY, API_URL } from "@/app/utils/globals"

import { Currency, SearchParamsTypes } from "@/app/types"

/**
 @name getPrices
 @description Fetches the prices of Bitcoin and Ethereum
**/

async function getPrices(currency: Currency = "usd") {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-CG_PRO_API_KEY': API_KEY
    }
  }

  let data = await fetch(`${API_URL}${currency}`, options)
  let prices = await data.json()

  return prices
}

export enum CurrencySymbols {
  USD = "$",
  EUR = "€",
  GBP = "£"
}

export default async function Home({ searchParams }: { searchParams: SearchParamsTypes["searchParams"] }) {
  const currency = (await searchParams).currency as Currency
  const prices = await getPrices(currency)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {prices && Object.keys(prices).map((key) => {
        return (
          <div key={key} className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">{key}</h1>
            <h2 className="text-xl font-semibold">
              {`${CurrencySymbols[currency.toUpperCase() as keyof typeof CurrencySymbols]}`}
              {`${prices[key][currency]}`}
            </h2>
          </div>
        )
      })}
    </div>
  )
}
