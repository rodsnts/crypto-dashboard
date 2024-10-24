import { Currency } from "@/app/types"
import { convertNumber } from "@/app/utils/utils"

import LineGraph from "../LineGraph/LineGraph"
import { getCoinHistory } from "@/app/utils/data"

enum CurrencySymbols {
  USD = "$",
  EUR = "€",
  GBP = "£"
}

interface CryptoData {
  [key: string]: {
    [key in Currency]: number
  } & {
    [key: string]: number
  }
}

interface CryptoTableProps {
  currency: string | undefined
  cryptoData: CryptoData | undefined
}

const columns = [
  "No",
  "Name",
  "Price",
  "Price Graph (24h)",
  "Market cap",
  "24h Change"
]

async function CryptoTable({ currency, cryptoData }: CryptoTableProps) {
  return (
    <div className="container mx-auto p-4">
      {cryptoData ? (
        <div className="overflow-x-auto">
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
              {Object.keys(cryptoData).map(async (crypto) => {
                const mockData = await getCoinHistory(
                  crypto,
                  (currency as Currency) || "usd",
                  1
                )

                return (
                  <tr key={crypto} className="hover:bg-gray-50 text-center">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {Object.keys(cryptoData).indexOf(crypto) + 1}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {crypto?.toUpperCase()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {`${
                          CurrencySymbols[
                            currency?.toUpperCase() as keyof typeof CurrencySymbols
                          ]
                        }`}{" "}
                        {cryptoData[crypto][currency as Currency]}
                      </div>
                    </td>

                    <td className="relative w-1 px-6 py-4 whitespace-nowrap">
                      <LineGraph width="100%" height="100%" data={mockData} />
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-gray-900 ">
                        {convertNumber(
                          cryptoData[crypto][`${currency}_market_cap`]
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div
                        className={`text-sm flex justify-center items-center ${
                          cryptoData[crypto][`${currency}_24h_change`] >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        <div className="mr-2">
                          {cryptoData[crypto][`${currency}_24h_change`] >= 0
                            ? "▲"
                            : "▼"}
                        </div>
                        {cryptoData[crypto][`${currency}_24h_change`]?.toFixed(
                          3
                        )}
                        %
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default CryptoTable
