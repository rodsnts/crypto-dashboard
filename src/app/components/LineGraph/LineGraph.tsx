"use client"

import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid
} from "recharts"

interface Props {
  data:
    | {
        prices: number[][]
        error?: string
      }
    | undefined
  width: string | number
  height: string | number
}

function LineGraph({ data, width, height }: Props) {
  if (data?.error) {
    return (
      <p className="text-textBase dark:text-textBaseDark text-center">
        An error occurred while fetching chart data.
      </p>
    )
  }

  const formattedData = data?.prices?.map((priceData) => ({
    DATE: priceData[0], // timestamp
    price: priceData[1] // coin price
  }))

  console.log(formattedData)

  return (
    <ResponsiveContainer width={width} height={height}>
      <LineChart
        margin={{ left: 120 }}
        width={300}
        height={25}
        data={formattedData}
      >
        <CartesianGrid stroke="transparent" vertical={false} />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#df8e1d"
          strokeWidth={1}
          dot={false}
        />

        <XAxis
          tickLine={false}
          stroke="#cdd6f4"
          dataKey="DATE"
          hide={true}
          axisLine={false}
          tickFormatter={(DATE) => {
            const dateObj = new Date(DATE)
            return dateObj.toLocaleDateString("en-GB", { weekday: "short" })
          }}
        />

        <YAxis
          hide={true}
          width={40}
          tickLine={false}
          axisLine={false}
          stroke="#cdd6f4"
          domain={["auto", "auto"]}
          tickFormatter={(price) => `$${price.toFixed(0)}`}
        />

        <Tooltip
          wrapperStyle={{ zIndex: 1000 }}
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              const dateObj = new Date(label)
              const formattedDate = dateObj.toLocaleDateString("en-GB")
              const price = payload[0]?.value

              return (
                <div className="rounded-xl bg-white p-4 text-textBase shadow-lg dark:bg-foregroundDark dark:text-textBaseDark">
                  <p>{`Date: ${formattedDate}`}</p>
                  <p>{`Price: $${Number(price)?.toFixed(2)}`}</p>
                </div>
              )
            }
            return null
          }}
          cursor={{ stroke: "#7287fd", strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default LineGraph
