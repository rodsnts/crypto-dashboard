"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

function Navbar() {
  const [currencyParam, setCurrencyParam] = useState<string | undefined>()
  
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const currency = searchParams.get("currency")
    if (currency) {
      setCurrencyParam(currency)
    }
  }, [searchParams])

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCurrency = e.target.value
    setCurrencyParam(newCurrency)
    router.push(`/?currency=${newCurrency}`)
  }

  return (
    <nav
      className="flex items-center justify-between flex-wrap bg-gray-50 p-6 border-b border-gray-100"
    >
      <ul className="flex space-x-4">
        <li>
          <a href="/" className="text-gray-700 hover:text-gray-900">Home</a>
        </li>
      </ul>

      <input 
        type="text" 
        placeholder="Search" 
        aria-label="Search" 
        className="border border-gray-200 p-2 rounded-md"
      />
      
      <select
        className="border border-gray-200 p-2 rounded-md"
        name="currency"
        value={currencyParam || "usd"}
        onChange={handleCurrencyChange}
      >
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="gbp">GBP</option>
      </select>
    </nav>
  )
}

export default Navbar
