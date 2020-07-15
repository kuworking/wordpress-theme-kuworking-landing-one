// v2020.04.08

import { useWindowResize } from './usewindowresize'
import { useEffect } from 'react'

export const useReplace100vh = () => {
  const setCssVar = () =>
    window.scrollY === 0 && document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)

  useEffect(() => setCssVar(), [])
  useWindowResize(setCssVar, 500)
  return ''
}
