"use client"

import { Currency } from "@/app/types"
import { convertNumber } from "@/app/utils/utils"

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

function CryptoTable({ currency, cryptoData }: CryptoTableProps) {
  return (
    <div className="container mx-auto p-4">
      {cryptoData ? (
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Market cap ({currency?.toUpperCase()})
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  24h Change
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Object.keys(cryptoData).map((crypto) => (
                <tr key={crypto} className="hover:bg-gray-50">
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
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm text-gray-900">
                      {convertNumber(
                        cryptoData[crypto][`${currency}_market_cap`]
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div
                      className={`text-sm flex items-center justify-end ${
                        cryptoData[crypto][`${currency}_24h_change`] >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {cryptoData[crypto][`${currency}_24h_change`] >= 0
                        ? "▲"
                        : "▼"}
                      {cryptoData[crypto][`${currency}_24h_change`]?.toFixed(3)}
                      %
                    </div>
                  </td>
                </tr>
              ))}
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
