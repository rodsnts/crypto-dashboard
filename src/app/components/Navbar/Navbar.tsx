"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import SearchBar from "../SearchBar/SearchBar"
import { Select, Option } from "../Select/Select"

function Navbar() {
  const [currencyParam, setCurrencyParam] = useState<string | undefined>()
  
  const router = useRouter()
  const searchParams = useSearchParams()

  /**
    @name useEffect
    @description Sets the currency parameter
  **/

  useEffect(() => {
    const currency = searchParams.get("currency")
    if (currency) {
      setCurrencyParam(currency)
    }
  }, [searchParams])

  /**
    @name handleCurrencyChange
    @param {React.ChangeEvent<HTMLSelectElement>} event
    @description Handles the currency change
  **/

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCurrency = event.target.value
    setCurrencyParam(newCurrency)

    router.push(`/?currency=${newCurrency}`)
  }

  return (
    <nav
      className="flex items-center justify-between flex-wrap bg-gray-50 p-3 border-b border-gray-100"
    >
      <ul className="flex space-x-4">
        <li>
          <a href="/" className="text-gray-700 hover:text-gray-900">Home</a>
        </li>
      </ul>

     <SearchBar />
      
     <Select
        value={currencyParam || "usd"}
        onChangeAction={handleCurrencyChange}
      >
        <Option value="usd">USD</Option>
        <Option value="eur">EUR</Option>
        <Option value="gbp">GBP</Option>
     </Select>
    </nav>
  )
}

export default Navbar
