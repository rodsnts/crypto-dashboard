import { API_KEY, API_URL } from "@/app/utils/globals"
import { Currency } from "@/app/types"

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "X-CG_PRO_API_KEY": API_KEY
  }
}

const detailParams =
  "include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&precision=2"

/**
 @name getCryptoList
 @param {Currency} currency
 @description Fetches the data of 5 cryptocurrencies
**/

export async function getCryptoList(currency: Currency = "usd") {
  const coins: string[] = [
    "bitcoin",
    "ethereum",
    "dogecoin",
    "cardano",
    "solana"
  ]

  try {
    const data = await fetch(
      `${API_URL}simple/price?ids=${coins}&vs_currencies=${currency}&${detailParams}`,
      options
    )

    const cryptoCurrencies = await data.json()

    return cryptoCurrencies
  } catch (error) {
    console.error(error)
  }
}

/**
 @name getCoinDetails
 @param {string} coin
 @param {Currency} currency
 @description Fetches the data of a specific cryptocurrency
**/

export async function getCoinDetails(coin: string) {
  try {
    const data = await fetch(
      `${API_URL}coins/${coin}?localization=false&community_data=false&developer_data=false&sparkline=false'`,
      options
    )

    const cryptoCurrency = await data.json()

    console.log(cryptoCurrency)

    return cryptoCurrency
  } catch (error) {
    console.error(error)
  }
}

/**
  @name getCoinHistory
  @param {string} coin
  @param {Currency} currency
  @param {number} days
  @description Fetches the historical data of a specific cryptocurrency
**/

export async function getCoinHistory(
  coin: string,
  currency: Currency = "usd",
  days: number = 7
) {
  try {
    const data = await fetch(
      `${API_URL}/coins/${coin}/market_chart?vs_currency=${currency}&days=${days}`,
      options
    )

    const cryptoCurrency = await data.json()
    return cryptoCurrency
  } catch (error) {
    console.error(error)
  }
}
