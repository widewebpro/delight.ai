import { useState } from '#app'

interface Flash {
  id: number
  message: string
  level: string
}

export function useFlashes() {
  const flashes = useState<Flash[]>('flashes', () => [])

  const addFlash = (message: string, level: string = 'info') => {
    const id = Date.now()
    flashes.value.push({ id, message, level })
    
    setTimeout(() => {
      removeFlash(id)
    }, 5000)
  }

  const removeFlash = (id: number) => {
    flashes.value = flashes.value.filter(flash => flash.id !== id)
  }

  return {
    flashes,
    addFlash,
    removeFlash
  }
}