"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Select, Option } from "../Select/Select"

import Link from "next/link"
import SearchBar from "../SearchBar/SearchBar"

export default function Navbar() {
  const [currencyParam, setCurrencyParam] = useState<string | undefined>()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
      <nav className="border-b border-ctp-lavender">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link className="font-bold text-lg" href="/">
                CryptoDashboard
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <SearchBar />
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
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <div className="mb-4">
                <SearchBar />
              </div>
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
        )}
      </nav>
    </Suspense>
  )
}
