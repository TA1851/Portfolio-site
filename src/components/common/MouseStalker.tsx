'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { usePathname } from 'next/navigation'

export default function MouseStalker() {
  const followerRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const follower = followerRef.current
    
    if (!follower) return

    // 初期位置の設定
    gsap.set(follower, { xPercent: -50, yPercent: -50 })

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(follower, {
        duration: 0.5,
        x: e.clientX,
        y: e.clientY,
        ease: 'power2.out',
        overwrite: 'auto'
      })
    }

    const onHover = () => {
      gsap.to(follower, {
        scale: 2,
        backgroundColor: 'rgba(59, 130, 246, 0.1)', // blue-500 with opacity
        borderColor: 'transparent',
        duration: 0.3
      })
    }

    const onLeave = () => {
      gsap.to(follower, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'currentColor', 
        duration: 0.3
      })
    }
    
    const addListeners = () => {
        const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select')
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', onHover)
            el.addEventListener('mouseleave', onLeave)
        })
    }
    
    const removeListeners = () => {
        const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select')
        interactiveElements.forEach(el => {
            el.removeEventListener('mouseenter', onHover)
            el.removeEventListener('mouseleave', onLeave)
        })
    }

    window.addEventListener('mousemove', onMouseMove)
    // 少し遅延させてリスナーを追加（DOMのレンダリング待ち）
    const timer = setTimeout(addListeners, 500)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      removeListeners()
      clearTimeout(timer)
    }
  }, [pathname])

  return (
    <>
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-10 h-10 border border-blue-500 dark:border-green-500 text-blue-500 dark:text-green-500 rounded-full pointer-events-none z-[9998] transition-colors duration-300"
      />
    </>
  )
}
