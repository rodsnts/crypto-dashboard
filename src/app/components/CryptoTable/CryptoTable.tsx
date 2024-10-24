import { CryptoData, Currency } from "@/app/types"
import { getCoinHistory } from "@/app/utils/data"

import CryptoRow from "./CryptoRow"

interface CryptoTableProps {
  currency: Currency | undefined
  cryptoData: CryptoData | undefined
}

const columns = [
  "No",
  "Name",
  "Price",
  "Price Graph (24h)",
  "Market Cap",
  "24h Change"
]

function CryptoTable({ currency, cryptoData }: CryptoTableProps) {
  if (!cryptoData || cryptoData?.status?.error_message) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-8">
        <h1 className="text-3xl font-bold text-center">
          Something went wrong while fetching the data...
        </h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className=" text-2xl font-semibold py-4 text-ctp-text">
        Trending Cryptocurrencies
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-ctp-crust border-2 border-ctp-lavender rounded-lg overflow-hidden">
          <thead className="bg-ctp-mantle">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-6 py-3 text-center text-xs font-medium text-ctp-text uppercase tracking-wider"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ctp-base text-ctp-text">
            {Object.keys(cryptoData).map(async (crypto, index) => {
              const historyData = await getCoinHistory(
                crypto,
                currency || "usd",
                1
              )

              return (
                <CryptoRow
                  key={crypto}
                  crypto={crypto}
                  index={index}
                  currency={currency as Currency}
                  cryptoData={cryptoData}
                  historyData={historyData}
                />
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CryptoTable
