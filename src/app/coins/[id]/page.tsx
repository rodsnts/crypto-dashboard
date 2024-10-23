"use client"

import React, { useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"

// Mock data for the price chart
const priceData = [
  { date: "2023-01-01", price: 16500 },
  { date: "2023-02-01", price: 23000 },
  { date: "2023-03-01", price: 28500 },
  { date: "2023-04-01", price: 30000 },
  { date: "2023-05-01", price: 27000 },
  { date: "2023-06-01", price: 31000 },
  { date: "2023-07-01", price: 29500 },
  { date: "2023-08-01", price: 32000 },
  { date: "2023-09-01", price: 35000 },
  { date: "2023-10-01", price: 33000 }
]

export default function Page({ params }: { params: { slug: string } }) {
  const [timeRange, setTimeRange] = useState("1M")

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold">Bitcoin (BTC)</h1>
          <p className="text-xl sm:text-2xl font-semibold text-green-600">
            $30,123.45
          </p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
        <div className="mb-4">
          <h2 className="text-xl sm:text-2xl font-bold">Price Chart</h2>
          <p className="text-gray-600">Bitcoin price over time</p>
        </div>
        <div className="mb-4 overflow-x-auto">
          <div className="flex space-x-2">
            {["1D", "1W", "1M", "3M", "1Y", "ALL"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded text-sm sm:text-base ${
                  timeRange === range
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } transition duration-300 ease-in-out`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
        <div className="h-[300px] sm:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={(value) => [`$${value.toLocaleString()}`, "Price"]}
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Key Statistics</h2>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Market Cap</dt>
              <dd className="text-base sm:text-lg font-semibold">$582.79B</dd>
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
