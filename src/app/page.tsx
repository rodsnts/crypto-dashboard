import { Suspense } from "react"
import { Currency, SearchParamsTypes } from "@/app/types"
import { getCryptoList } from "@/app/utils/data"

import CryptoTable from "@/app/components/CryptoTable/CryptoTable"
import Spinner from "@/app/components/Spinner/Spinner"

export default async function Home({
  searchParams
}: {
  searchParams: SearchParamsTypes["searchParams"]
}) {
  const currency = (await searchParams)?.currency as Currency

  const cryptoData = await getCryptoList(currency)

  return (
    <div className="max-h-full h-full flex flex-col items-center justify-center py-2">
      <Suspense fallback={<Spinner fullscreen />}>
        <CryptoTable cryptoData={cryptoData} currency={currency || "usd"} />
      </Suspense>
    </div>
  )
}
