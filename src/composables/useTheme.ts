export function useTheme() {
  const theme = ref<'light' | 'dark'>('light')

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    document.body.className = theme.value
  }

  return { theme, toggleTheme }
}
function ref<T>(initialValue: T) {
  return {
    value: initialValue
  }
}

