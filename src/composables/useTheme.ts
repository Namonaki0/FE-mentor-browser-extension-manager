import { ref, watchEffect } from 'vue'

export function useTheme() {
  const theme = ref<'light' | 'dark'>('light')

  const initTheme = () => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null

    if (saved) {
      theme.value = saved
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      theme.value = prefersDark ? 'dark' : 'light'
    }

    document.documentElement.setAttribute('data-theme', theme.value)
  }

  initTheme()

  watchEffect(() => {
    document.documentElement.setAttribute('data-theme', theme.value)
    localStorage.setItem('theme', theme.value)
  })

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  return { theme, toggleTheme }
}