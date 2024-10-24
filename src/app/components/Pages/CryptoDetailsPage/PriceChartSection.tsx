"use client"

import dynamic from "next/dynamic"
import { PriceData } from "@/app/types"

const PriceChart = dynamic(
  () => import("@/app/components/PriceChart/PriceChart"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] bg-gray-200 animate-pulse flex items-center justify-center">
        <p>Loading chart...</p>
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
    <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
      <div className="mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">Price Chart</h2>
        <p className="text-gray-600">Bitcoin price over time (1W) </p>
      </div>
      <div className="relative h-[300px] sm:h-[400px]">
        <PriceChart priceData={priceData} hasProfit={hasProfit} />
      </div>
    </div>
  )
}

export default PriceChartSection
