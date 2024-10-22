export type Currency = "usd" | "eur" | "gbp"

export interface SearchParamsTypes {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
