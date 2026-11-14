import { useCallback, useEffect, useState } from 'react'

const THEME_STORAGE_KEY = 'saas-comparison-theme'

function getInitialTheme() {
  try {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)

    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme
    }
  } catch {
    // Use the default theme when browser storage is unavailable.
  }

  return 'light'
}

function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // The selected theme still works for the current session.
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) =>
      currentTheme === 'light' ? 'dark' : 'light'
    )
  }, [])

  return {
    theme,
    toggleTheme,
  }
}

export default useTheme
