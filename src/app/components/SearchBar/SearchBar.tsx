"use client"

import { useState } from "react"
import { useCoinSearch } from "@/app/hooks/useCoinSearch"

import Link from "next/link"
import Spinner from "@/app/components/Spinner/Spinner"

function SearchBar() {
  const [query, setQuery] = useState<string>("")

  const { data: suggestions, error, isLoading } = useCoinSearch(query)

  return (
    <div className="max-w-md mx-auto relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 border border-ctp-lavender bg-ctp-base rounded-md focus:outline-none"
        placeholder="Search for a coin..."
      />

      {query && (
        <ul className="absolute z-10 w-full mt-2 border bg-ctp-crust text-ctp-text rounded-md border-ctp-lavender shadow-lg max-h-60 overflow-y-auto">
          {isLoading && <Spinner />}
          {error && <li className="p-2 text-red-500">{error}</li>}

          {suggestions && suggestions.length > 0
            ? suggestions.map((coin) => (
                <Link
                  key={coin.id}
                  onClick={() => setQuery("")}
                  href={`/coins/${coin?.name}`}
                >
                  <li className="p-2 hover:bg-ctp-mantle 0 cursor-pointer flex items-center">
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
