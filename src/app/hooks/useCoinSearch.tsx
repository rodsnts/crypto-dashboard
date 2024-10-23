import { useState, useEffect } from "react"
import { API_KEY, API_URL } from "@/app/utils/globals"

interface Coin {
  id: string
  name: string
  symbol: string
}

interface UseCoinSearchResult {
  data: Coin[] | null
  error: string | null
  isLoading: boolean
}

/**
  @name useCoinSearch
  @param {string} query
  @description Search for a specific cryptocurrency
**/

export const useCoinSearch = (query: string): UseCoinSearchResult => {
  const [data, setData] = useState<Coin[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (query.length >= 3) {
      const fetchData = async () => {
        setIsLoading(true)
        setError(null)

        try {
          const options = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-CG_PRO_API_KEY": API_KEY
            }
          }

          const response = await fetch(
            `${API_URL}search?query=${query}`,
            options
          )
          const result = await response.json()

          if (result.coins) {
            result.coins = result.coins.slice(0, 5) // Limits the number of results to 5

            setData(result.coins)
          } else {
            setData(null)
          }
        } catch (err) {
          console.error("Error fetching data: ", err)
          setError("Failed to search for coin. Please try again.")
        }

        setIsLoading(false)
      }

      fetchData()
    } else {
      setData(null)
      setError(null)
    }
  }, [query])

  return { data, error, isLoading }
}
