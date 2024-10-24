"use client"

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts"

interface PriceChartProps {
  priceData:
    | {
        prices: number[][]
        error?: string
      }
    | undefined
  hasProfit?: boolean
}

function PriceChart({ priceData, hasProfit }: PriceChartProps) {
  const formattedData = priceData?.prices?.map((priceData) => ({
    date: priceData[0], // timestamp
    price: priceData[1] // coin price
  }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        data={formattedData}
      >
        <defs>
          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={hasProfit ? "#40a02b" : "#d20f39"}
              stopOpacity={0.5}
            />
            <stop offset="95%" stopColor="#fff" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 0" opacity={0.2} />
        <XAxis
          dataKey="date"
          axisLine={false}
          tick={{ fontSize: 12 }}
          minTickGap={80}
          tickFormatter={(value) => new Date(value).toLocaleDateString()}
        />
        <YAxis
          tickFormatter={(value) => `$${value.toLocaleString()}`}
          axisLine={false}
          tick={{ fontSize: 12 }}
          domain={["auto", "auto"]}
        />
        <Tooltip
          formatter={(value) => [`$${value.toLocaleString()}`, "Price"]}
          labelFormatter={(label) => new Date(label).toLocaleDateString()}
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              const price = payload[0].value
              const dateObj = new Date(label)
              const formattedDate = dateObj.toLocaleDateString("en-GB", {
                month: "numeric",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric"
              })

              return (
                <div className="bg-white p-4 shadow-md rounded-md">
                  <p className="text-sm">{formattedDate}</p>
                  <p className="text-sm">Price: ${price?.toLocaleString()}</p>
                </div>
              )
            }

            return null
          }}
        />
        <Area
          connectNulls
          type="linear"
          animationDuration={3000}
          dataKey="price"
          strokeWidth={2}
          stroke={hasProfit ? "#40a02b" : "#d20f39"}
          fill="url(#colorPrice)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default PriceChart
