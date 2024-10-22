import { API_KEY, API_URL } from "@/app/utils/globals"
import { Currency } from "@/app/types"

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'X-CG_PRO_API_KEY': API_KEY
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
  const coins: string[] = ["bitcoin", "ethereum", "dogecoin", "cardano", "solana"]

  try {
    let data = 
      await fetch(`${API_URL}price?ids=${coins}&vs_currencies=${currency}&${detailParams}`, options)

    let cryptoCurrencies = await data.json()

    return cryptoCurrencies
  } catch (error) {
    console.error(error)

    return error
  }
}

/**
 @name getCoinDetails
 @param {string} coin
 @param {Currency} currency
 @description Fetches the data of a specific cryptocurrency
**/

export async function getCoinDetails(coin: string, currency: Currency = "usd") {
  try {
    const data =
      await fetch(`${API_URL}price?ids=${coin}&vs_currencies=${currency}&${detailParams}`, options)

    const cryptoCurrency = await data.json()

    return cryptoCurrency
  } catch (error) {
    console.error(error)

    return error
  }
}
