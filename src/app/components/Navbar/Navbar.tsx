"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

import SearchBar from "../SearchBar/SearchBar"
import { Select, Option } from "../Select/Select"

function Navbar() {
  const [currencyParam, setCurrencyParam] = useState<string | undefined>()
  const [isMenuOpen, setIsMenuOpen] = useState(false) // State to control mobile menu visibility

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const currency = searchParams.get("currency")
    if (currency) {
      setCurrencyParam(currency)
    }
  }, [searchParams])

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newCurrency = event.target.value
    setCurrencyParam(newCurrency)

    router.push(`?currency=${newCurrency}`)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <Suspense>
      <nav className="p-3 border-b border-ctp-lavender">
        <div className="flex items-center justify-between">
          {!isMenuOpen && (
            <div className="flex items-center">
              <Link className="font-bold text-lg" href="/">
                CryptoDashboard
              </Link>
            </div>
          )}

          {/* Hamburger Button for mobile */}
          <div className="block mr-2 lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                ></path>
              </svg>
            </button>
          </div>

          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full lg:flex lg:items-center lg:w-auto flex justify-center items-center`}
          >
            <div className="mt-4 lg:mt-0 lg:ml-4">
              <SearchBar />
            </div>

            <div className="mt-4 lg:mt-0 lg:ml-4">
              <Select
                value={currencyParam || "usd"}
                onChangeAction={handleCurrencyChange}
              >
                <Option value="usd">USD</Option>
                <Option value="eur">EUR</Option>
                <Option value="gbp">GBP</Option>
              </Select>
            </div>
          </div>
        </div>
      </nav>
    </Suspense>
  )
}

export default Navbar
