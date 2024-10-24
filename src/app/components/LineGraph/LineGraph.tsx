"use client"

import { useEffect, useState } from "react"
import { XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid } from "recharts"

interface Props {
  data:
    | {
        prices: number[][]
        error?: string
      }
    | undefined
}

function LineGraph({ data }: Props) {
  const [hasProfit, setHasProfit] = useState<boolean | null>(null)

  const formattedData = data?.prices?.map((priceData) => ({
    DATE: priceData[0], // timestamp
    price: priceData[1] // coin price
  }))

  useEffect(() => {
    if (formattedData) {
      const firstPrice = formattedData[0].price
      const lastPrice = formattedData[formattedData.length - 1].price

      setHasProfit(lastPrice > firstPrice)
    }
  }, [formattedData])

  return (
    <LineChart width={200} height={40} data={formattedData}>
      <CartesianGrid stroke="transparent" />
      <Line
        type="monotone"
        dataKey="price"
        stroke={hasProfit ? "#40a02b" : "#d20f39"}
        strokeWidth={1}
        dot={false}
      />

      <XAxis
        tickLine={false}
        stroke="#cdd6f4"
        dataKey="DATE"
        hide
        axisLine={false}
        tickFormatter={(DATE) => {
          const dateObj = new Date(DATE)
          return dateObj.toLocaleDateString("en-GB", { weekday: "short" })
        }}
      />
      <YAxis
        hide
        width={40}
        tickLine={false}
        axisLine={false}
        stroke="#cdd6f4"
        domain={["dataMin", "dataMax"]}
        tickFormatter={(price) => `$${price.toFixed(0)}`}
      />

      <Tooltip
        wrapperStyle={{ zIndex: 1000 }}
        cursor={{ stroke: "#7287fd", strokeWidth: 2 }}
        content={({ active, payload, label }) => {
          if (active && payload && payload.length) {
            const dateObj = new Date(label)
            const formattedDate = dateObj.toLocaleDateString("en-GB", {
              month: "numeric",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "numeric"
            })
            const price = payload[0]?.value

            return (
              <div className="rounded-xl bg-ctp-base p-4 mt-4 text-ctp-text shadow-lg dark:bg-foregroundDark dark:text-textBaseDark">
                <p>{`${formattedDate}`}</p>
                <p>{`$ ${Number(price)?.toFixed(2)}`}</p>
              </div>
            )
          }

          return null
        }}
      />
    </LineChart>
  )
}

export default LineGraph
