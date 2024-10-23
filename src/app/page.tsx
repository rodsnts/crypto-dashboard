import { Currency, SearchParamsTypes } from "@/app/types"

import { getCryptoList } from "@/app/utils/data"
import CryptoTable from "./components/CryptoTable/CryptoTable"
import { Suspense } from "react"

export default async function Home({
  searchParams
}: {
  searchParams: SearchParamsTypes["searchParams"]
}) {
  const currency = (await searchParams)?.currency as Currency

  const cryptoData = await getCryptoList(currency)

  if (!cryptoData) {
    return <h1>Loading...</h1>
  }

  if (cryptoData?.status?.error_code) {
    return <h1>{cryptoData.status.error_message}</h1>
  }

  console.log(crypto)

  return (
    <div className="max-h-full h-full flex flex-col items-center justify-center py-2">
      <Suspense fallback={<div>Loading...</div>} />
      <CryptoTable cryptoData={cryptoData} currency={currency || "usd"} />
    </div>
  )
}
