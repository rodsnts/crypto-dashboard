"use client"

import dynamic from "next/dynamic"
import { PriceData } from "@/app/types"

const PriceChart = dynamic(
  () => import("@/app/components/PriceChart/PriceChart"),
  {
    ssr: false,
    loading: () => (
      <div className="w-[200px] h-[40px] bg-ctp-base animate-pulse flex items-center justify-center">
        <p className="text-ctp-lavender">Loading chart...</p>
      </div>
    )
  }
)

interface PriceChartSectionProps {
  priceData: PriceData
  hasProfit: boolean
}

function PriceChartSection({ priceData, hasProfit }: PriceChartSectionProps) {
  return (
    <div className="bg-ctp-crust border-ctp-lavender border-2 rounded-lg p-4 sm:p-6">
      <div className="mb-4">
        <h2 className="text-xl sm:text-2xl text-ctp-text font-bold">
          Price Chart
        </h2>
        <p className="text-ctp-subtext0">Bitcoin price over time (1W) </p>
      </div>
      <div className="relative h-[300px] sm:h-[400px]">
        <PriceChart priceData={priceData} hasProfit={hasProfit} />
      </div>
    </div>
  )
}

export default PriceChartSection
