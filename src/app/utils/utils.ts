/**
  @name convertNumber
  @param {number} value
  @description Converts a number to a more readable format
**/

export function convertNumber(value: number) {
  if(value >= 1_000_000_000_000) {
    return `${(value / 1_000_000_000_000).toFixed(2)}T`
  } else if(value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(2)}B`
  } else if(value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M`
  }

  return value
}
