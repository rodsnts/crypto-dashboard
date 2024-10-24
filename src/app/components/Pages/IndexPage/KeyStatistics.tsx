import { CoinDetails } from "@/app/types"
import { convertNumber } from "@/app/utils/utils"

interface KeyStatisticsProps {
  coinDetails: CoinDetails
}

function KeyStatistics({ coinDetails }: KeyStatisticsProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Key Statistics</h2>
      <dl className="grid grid-cols-2 gap-4">
        <div>
          <dt className="text-sm font-medium text-gray-500">Market Cap</dt>
          <dd className="text-base sm:text-lg font-semibold">
            $ {convertNumber(coinDetails?.market_data?.market_cap.usd)}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Volume</dt>
          <dd className="text-base sm:text-lg font-semibold">
            $ {convertNumber(coinDetails?.market_data?.total_volume.usd)}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">24H High</dt>
          <dd className="text-base sm:text-lg font-semibold">
            $ {coinDetails?.market_data?.high_24h.usd}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">24H Low</dt>
          <dd className="text-base sm:text-lg font-semibold">
            $ {coinDetails?.market_data?.low_24h.usd}
          </dd>
        </div>
      </dl>
    </div>
  )
}

export default KeyStatistics
