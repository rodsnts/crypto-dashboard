import { CoinDetails } from "@/app/types"

interface AboutCoinProps {
  coinDetails: CoinDetails
}

function AboutCoin({ coinDetails }: AboutCoinProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">
        About {coinDetails?.name}
      </h2>
      <p className="text-sm sm:text-base text-gray-700 overflow-auto max-h-full">
        {coinDetails?.description?.en.length > 500
          ? coinDetails?.description?.en.substring(0, 500) + "..."
          : coinDetails?.description?.en}
      </p>
    </div>
  )
}

export default AboutCoin
