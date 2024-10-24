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
  if (!cryptoData) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <h2 className=" text-2xl font-semibold text-gray-800 py-4">
          Trending Cryptocurrencies
        </h2>
        <table className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
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
