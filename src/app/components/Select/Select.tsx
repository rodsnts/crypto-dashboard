"use client"

interface SelectProps {
  value: string
  name?: string
  onChangeAction: (event: React.ChangeEvent<HTMLSelectElement>) => void
  children: React.ReactNode
}

export function Select({value, name, onChangeAction, children}: SelectProps) {
  return (
    <select
      className="border border-gray-200 p-2 rounded-md focus:outline-none"
      name={name}
      value={value}
      onChange={onChangeAction}
    >
      {children}
    </select>
  ) 
}

interface OptionProps {
  value: string
  children: string
}

export function Option({value, children}: OptionProps) {
  return (
    <option value={value}>
      {children}
    </option>
  )
}
