import { Currency, SearchParamsTypes } from "@/app/types"

import { getCryptoList } from "@/app/utils/data"

export enum CurrencySymbols {
  USD = "$",
  EUR = "€",
  GBP = "£"
}

export default async function Home({ searchParams }: { searchParams: SearchParamsTypes["searchParams"] }) {
  const currency = (await searchParams)?.currency as Currency
  const crypto = await getCryptoList(currency)

  console.log(crypto)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {crypto && Object.keys(crypto).map((key) => {
        return (
          <div key={key} className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">{key}</h1>
            <h2 className="text-xl font-semibold">
              {`${CurrencySymbols[currency.toUpperCase() as keyof typeof CurrencySymbols]}`}
              {`${crypto[key][currency]}`}
            </h2>
          </div>
        )
      })}
    </div>
  )
}
