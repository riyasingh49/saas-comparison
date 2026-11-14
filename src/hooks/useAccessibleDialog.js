import { useCallback, useEffect, useRef } from 'react'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not(:disabled)',
  'input:not(:disabled)',
  'select:not(:disabled)',
  'textarea:not(:disabled)',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

function useAccessibleDialog({ isOpen, onClose } = {}) {
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)

  const handleBackdropMouseDown = useCallback(
    (event) => {
      if (event.target === event.currentTarget) {
        onClose?.()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const previouslyFocusedElement = document.activeElement
    const previousBodyOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    // Move keyboard focus into the dialog when it opens.
    const focusTimer = requestAnimationFrame(() => {
      closeButtonRef.current?.focus()
    })

    const getFocusableElements = () => {
      if (!dialogRef.current) {
        return []
      }

      return Array.from(
        dialogRef.current.querySelectorAll(FOCUSABLE_SELECTOR)
      ).filter(
        (element) =>
          element.getClientRects().length > 0 &&
          element.getAttribute('aria-hidden') !== 'true'
      )
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose?.()
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const focusableElements = getFocusableElements()

      if (focusableElements.length === 0) {
        event.preventDefault()
        dialogRef.current?.focus()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement =
        focusableElements[focusableElements.length - 1]

      if (
        event.shiftKey &&
        (document.activeElement === firstElement ||
          !dialogRef.current?.contains(document.activeElement))
      ) {
        event.preventDefault()
        lastElement.focus()
      } else if (
        !event.shiftKey &&
        (document.activeElement === lastElement ||
          !dialogRef.current?.contains(document.activeElement))
      ) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      cancelAnimationFrame(focusTimer)
      document.removeEventListener('keydown', handleKeyDown)

      document.body.style.overflow = previousBodyOverflow

      // Return focus to the element that opened the dialog.
      if (previouslyFocusedElement instanceof HTMLElement) {
        previouslyFocusedElement.focus()
      }
    }
  }, [isOpen, onClose])

  return {
    dialogRef,
    closeButtonRef,
    handleBackdropMouseDown,
  }
}

export default useAccessibleDialog
