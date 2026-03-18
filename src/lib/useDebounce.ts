import { useState, useEffect } from 'react'

export const useDebounce = <T>(value: T, delay: number = 0): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // update debounced value after specified delay time
    const timerId = setTimeout(() => setDebouncedValue(value), delay)

    // cancel the timeout if value changes
    return () => {
      clearTimeout(timerId)
    }
  }, [value, delay])

  return debouncedValue
}
