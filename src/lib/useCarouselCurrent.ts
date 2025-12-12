import { useState, useEffect, useCallback } from 'react'
import { type CarouselApi } from '@/components/ui/carousel'

export const useCarouselCurrent = (api: CarouselApi) => {
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  const updateCurrent = useCallback((api: CarouselApi) => {
    setCurrent(api!.selectedScrollSnap() + 1)
  }, [])

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    updateCurrent(api)

    api.on('select', updateCurrent)

    return () => {
      api.off('select', updateCurrent)
    }
  }, [api, updateCurrent])

  return {
    current,
    count,
  }
}
