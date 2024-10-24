import { CoinDetails } from "@/app/types"

interface CoinHeaderProps {
  coinDetails: CoinDetails
}

function CoinHeader({ coinDetails }: CoinHeaderProps) {
  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-bold">
        {coinDetails?.name} ({coinDetails?.symbol?.toUpperCase()})
      </h1>
      <div className="flex items-center space-x-2 mt-2">
        <p
          className={`text-3xl font-semibold ${
            coinDetails?.market_data?.price_change_percentage_24h >= 0
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          ${coinDetails?.market_data?.current_price.usd}
        </p>
        <p
          className={`text-sm font-semibold px-2 py-1 rounded-full ${
            coinDetails?.market_data?.price_change_percentage_24h >= 0
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {coinDetails?.market_data?.price_change_percentage_24h}%
        </p>
      </div>
    </div>
  )
}

export default CoinHeader
