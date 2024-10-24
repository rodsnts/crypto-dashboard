"use client"

import { useState } from "react"
import Link from "next/link"

import { useCoinSearch } from "@/app/hooks/useCoinSearch"

function SearchBar() {
  const [query, setQuery] = useState<string>("")

  const { data: suggestions, error, isLoading } = useCoinSearch(query)

  return (
    <div className="max-w-md mx-auto relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search for a coin..."
      />

      {isLoading && <p className="mt-2 text-gray-500">Loading...</p>}
      {error && <p className="mt-2 text-red-500">{error}</p>}

      {suggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-2 border border-gray-300 rounded-md bg-white shadow-lg">
          {suggestions.map((coin) => (
            <Link
              key={coin.id}
              onClick={() => setQuery("")}
              href={`/coins/${coin?.name}`}
            >
              <li className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                {coin?.name} ({coin?.symbol.toUpperCase()})
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBar
