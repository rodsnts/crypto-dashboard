import PriceChart from "@/app/components/PriceChart/PriceChart"
import { getCoinDetails, getCoinHistory } from "@/app/utils/data"
import { convertNumber } from "@/app/utils/utils"

// Mock data for the price chart

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params

  const priceData = await getCoinHistory(id.toLowerCase(), "usd")
  const coinDetails = await getCoinDetails(id.toLowerCase())

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold">
            {coinDetails?.name} ({coinDetails?.symbol?.toUpperCase()})
          </h1>
          <p className="text-xl sm:text-2xl font-semibold text-green-600">
            $ {coinDetails?.market_data?.current_price.usd}
          </p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
        <div className="mb-4">
          <h2 className="text-xl sm:text-2xl font-bold">Price Chart</h2>
          <p className="text-gray-600">Bitcoin price over time</p>
        </div>
        <div className="relative h-[300px] sm:h-[400px]">
          <PriceChart priceData={priceData} hasProfit />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
              <dt className="text-sm font-medium text-gray-500">
                Volume (24h)
              </dt>
              <dd className="text-base sm:text-lg font-semibold">$15.23B</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">
                Circulating Supply
              </dt>
              <dd className="text-base sm:text-lg font-semibold">19.37M BTC</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">
                All-Time High
              </dt>
              <dd className="text-base sm:text-lg font-semibold">$68,789.63</dd>
            </div>
          </dl>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">About Bitcoin</h2>
          <p className="text-sm sm:text-base text-gray-700">
            Bitcoin is the first decentralized cryptocurrency. Nodes in the
            peer-to-peer bitcoin network verify transactions through
            cryptography and record them in a public distributed ledger called a
            blockchain. Bitcoin was invented in 2008 by an unknown person or
            group using the name Satoshi Nakamoto.
          </p>
        </div>
      </div>
    </div>
  )
}
