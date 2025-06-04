import { render, fireEvent } from '@testing-library/vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import { describe, it, expect, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { useTheme } from '@/composables/useTheme'

vi.mock('@/composables/useTheme', () => ({
  useTheme: vi.fn()
}))

describe('AppHeader.vue', () => {
  it('renders BaseLogo and toggle button', () => {
    useTheme.mockReturnValue({
      theme: { value: 'light' },
      toggleTheme: vi.fn()
    })

    const { getByAltText, getByRole } = render(AppHeader, {
      global: {
        plugins: [createTestingPinia()]
      }
    })

    expect(getByRole('button')).toBeTruthy()
    expect(getByAltText('Switch to dark mode')).toBeTruthy()
  })

  it('displays correct icon based on theme', () => {
    useTheme.mockReturnValue({
      theme: { value: 'dark' },
      toggleTheme: vi.fn()
    })

    const { getByAltText } = render(AppHeader)
    expect(getByAltText('Switch to light mode')).toBeTruthy()
  })

  it('calls toggleTheme when button is clicked', async () => {
    const toggleMock = vi.fn()
    useTheme.mockReturnValue({
      theme: { value: 'light' },
      toggleTheme: toggleMock
    })

    const { getByRole } = render(AppHeader)
    await fireEvent.click(getByRole('button'))

    expect(toggleMock).toHaveBeenCalled()
  })
})