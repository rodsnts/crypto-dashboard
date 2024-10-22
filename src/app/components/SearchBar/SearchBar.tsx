"use client"
import { useState } from "react"

function SearchBar() {

  return (
    <div className="flex items-center justify-between bg-gray-50 border-b border-gray-100">
      <input 
        type="text" 
        placeholder="Search"
        className="border border-gray-200 p-2 rounded-md focus:outline-none"
      />
    </div>
  )
}

export default SearchBar
