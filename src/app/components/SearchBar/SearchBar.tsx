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
        className="p-2 border border-gray-300 rounded-md focus:outline-none"
        placeholder="Search for a coin..."
      />

      {query && (
        <ul className="absolute z-10 w-full mt-2 border border-gray-300 rounded-md bg-white shadow-lg max-h-60 overflow-y-auto">
          {isLoading && <li className="p-2 text-gray-500">Loading...</li>}
          {error && <li className="p-2 text-red-500">{error}</li>}

          {suggestions && suggestions.length > 0
            ? suggestions.map((coin) => (
                <Link
                  key={coin.id}
                  onClick={() => setQuery("")}
                  href={`/coins/${coin?.name}`}
                >
                  <li className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                    {coin?.name} ({coin?.symbol.toUpperCase()})
                  </li>
                </Link>
              ))
            : !isLoading &&
              query && <li className="p-2 text-gray-500">No results found</li>}
        </ul>
      )}
    </div>
  )
}

export default SearchBar
