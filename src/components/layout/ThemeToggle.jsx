import { Moon, Sun } from 'lucide-react'

function ThemeToggle({ theme = 'light', onToggle }) {
  const isDark = theme === 'dark'
  const nextThemeLabel = isDark ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${nextThemeLabel} mode`}
      aria-pressed={isDark}
      title={`Switch to ${nextThemeLabel} mode`}
      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
    >
      {isDark ? (
        <Sun size={18} aria-hidden="true" />
      ) : (
        <Moon size={18} aria-hidden="true" />
      )}

      <span>{isDark ? 'Light mode' : 'Dark mode'}</span>
    </button>
  )
}

export default ThemeToggle
