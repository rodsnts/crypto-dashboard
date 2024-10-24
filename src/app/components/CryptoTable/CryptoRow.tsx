"use client"

import { CryptoData, Currency } from "@/app/types"
import { convertNumber } from "@/app/utils/utils"
import { FiExternalLink } from "react-icons/fi"

import LineGraph from "@/app/components/LineGraph/LineGraph"
import Link from "next/link"

interface CryptoRowProps {
  crypto: string
  index: number
  currency: Currency
  cryptoData: CryptoData
  historyData: { prices: number[][]; error?: string | undefined }
}

enum CurrencySymbols {
  USD = "$",
  EUR = "€",
  GBP = "£"
}

function CryptoRow({
  crypto,
  index,
  currency,
  cryptoData,
  historyData
}: CryptoRowProps) {
  return (
    <tr key={crypto} className="hover:bg-gray-50 text-center mouse-pointer">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{index + 1}</div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <Link href={`/coins/${crypto.toLowerCase()}`}>
          <div className="text-sm inline-block font-medium text-gray-900 hover:text-blue-500 cursor-pointer transition-colors duration-200 ease-in-out">
            {crypto?.toUpperCase()}
            <FiExternalLink className="inline-block ml-2" />
          </div>
        </Link>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">
          {
            CurrencySymbols[
              currency?.toUpperCase() as keyof typeof CurrencySymbols
            ]
          }
          {cryptoData[crypto][currency]}
        </div>
      </td>

      <td className="relative w-1 px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          <LineGraph data={historyData} />
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-center">
        <div className="text-sm text-gray-900">
          {convertNumber(cryptoData[crypto][`${currency}_market_cap`])}
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
            {cryptoData[crypto][`${currency}_24h_change`] >= 0 ? "▲" : "▼"}
          </div>
          {cryptoData[crypto][`${currency}_24h_change`]?.toFixed(3)}%
        </div>
      </td>
    </tr>
  )
}

export default CryptoRow
