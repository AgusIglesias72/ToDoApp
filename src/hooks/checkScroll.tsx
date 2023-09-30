// useScrollToFooter.ts
import { useEffect, useState } from 'react'

interface ScrollInfo {
  distanceFromEnd: number
  isNearEnd: boolean
}

const useScrollToFooter = (): ScrollInfo => {
  const [scrollInfo, setScrollInfo] = useState<ScrollInfo>({
    distanceFromEnd: 0,
    isNearEnd: false,
  })

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const footerElement = document.getElementById('footer') // Reemplaza 'footer' con el ID de tu elemento footer
      const footerPosition = footerElement?.getBoundingClientRect().top ?? 0

      // Calcula la distancia desde la parte inferior de la ventana hasta el footer
      const distance = windowHeight - footerPosition

      // Determina si el usuario está cerca del final de la página
      const isNearEnd = distance > 0

      setScrollInfo({ distanceFromEnd: distance, isNearEnd })
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return scrollInfo
}

export default useScrollToFooter
