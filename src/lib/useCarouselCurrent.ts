import { useState, useEffect, useCallback } from 'react'
import { type CarouselApi } from '@/components/ui/carousel'

export const useCarouselCurrent = (api: CarouselApi) => {
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  const updateCurrent = useCallback((api: CarouselApi) => {
    if (!api) return
    setCurrent(api.selectedScrollSnap() + 1)
  }, [])

  // on reinit, set count and go back to first slide
  const reinit = useCallback((api: CarouselApi) => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    api.scrollTo(0, true)
  }, [])

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    updateCurrent(api)

    api.on('select', updateCurrent)
    api.on('reInit', reinit)

    return () => {
      api.off('select', updateCurrent)
      api.off('reInit', reinit)
    }
  }, [api, updateCurrent, reinit])

  return {
    current,
    count,
  }
}
