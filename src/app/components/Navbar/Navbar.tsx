"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

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

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newCurrency = event.target.value
    setCurrencyParam(newCurrency)

    router.push(`?currency=${newCurrency}`)
  }

  return (
    <nav className="flex items-center justify-between flex-wrap p-3 border-b border-ctp-lavender">
      <ul className="flex space-x-4">
        <li>
          <Link className="font-bold" href="/">
            CryptoDashboard
          </Link>
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
