import { PriceData } from "@/app/types"
import PriceChart from "../../PriceChart/PriceChart"

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
