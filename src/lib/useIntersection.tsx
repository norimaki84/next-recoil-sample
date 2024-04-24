import { useState, useEffect, RefObject } from 'react'

export const useIntersection = (ref: RefObject<HTMLDivElement>) => {
  const [intersecting, setIntersecting] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting)
    })
    let observerRefCurrent: HTMLDivElement | null = null
    if (ref.current) {
      observer.observe(ref.current)
      observerRefCurrent = ref.current
    }
    if (observerRefCurrent) {
      return () => {
        observer.unobserve(observerRefCurrent as HTMLDivElement)
      }
    }
    return
  })
  return intersecting
}
