import { redirect } from "next/navigation"
import { getCoinDetails, getCoinHistory } from "@/app/utils/data"
import { CoinDetails, PriceData } from "@/app/types"

import AboutCoin from "@/app/components/Pages/CryptoDetailsPage/AboutCoin"
import KeyStatistics from "@/app/components/Pages/CryptoDetailsPage/KeyStatistics"
import PriceChartSection from "@/app/components/Pages/CryptoDetailsPage/PriceChartSection"
import CoinHeader from "@/app/components/Pages/CryptoDetailsPage/CoinHeader"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params

  const priceData: PriceData = await getCoinHistory(id.toLowerCase(), "usd")
  const coinDetails: CoinDetails = await getCoinDetails(id.toLowerCase())

  if (!coinDetails || coinDetails.error) {
    redirect("/404")
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <CoinHeader coinDetails={coinDetails} />
      <PriceChartSection
        priceData={priceData}
        hasProfit={coinDetails?.market_data?.price_change_percentage_24h >= 0}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <KeyStatistics coinDetails={coinDetails} />
        <AboutCoin coinDetails={coinDetails} />
      </div>
    </div>
  )
}
