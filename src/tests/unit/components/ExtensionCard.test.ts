import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import ExtensionCard from '@/components/extensions/ExtensionCard.vue'
import { createTestingPinia } from '@pinia/testing'

const extensionMock = {
  name: 'MockExtension',
  description: 'Mock description',
  logo: 'https://example.com/logo.svg',
  isActive: true
}

describe('ExtensionCard.vue', () => {
  it('renders extension details', () => {
    const { getByText, getByAltText } = render(ExtensionCard, {
      props: { extension: extensionMock },
      global: {
        plugins: [createTestingPinia()],
      },
    })

    expect(getByText('MockExtension')).toBeInTheDocument()
    expect(getByText('Mock description')).toBeInTheDocument()
    expect(getByAltText('MockExtension')).toBeInTheDocument()
  })

  it('opens the confirmation modal when clicking Remove', async () => {
    const { getByText, queryByText } = render(ExtensionCard, {
      props: { extension: extensionMock },
      global: {
        plugins: [createTestingPinia()],
      },
    })

    expect(queryByText(/are you sure/i)).not.toBeInTheDocument()

    await fireEvent.click(getByText('Remove'))

    expect(queryByText(/are you sure/i)).toBeInTheDocument()
  })

  it('calls store.removeExtension on modal confirm', async () => {
    const spy = vi.fn()
    const { getByText } = render(ExtensionCard, {
      props: { extension: extensionMock },
      global: {
        plugins: [createTestingPinia({
          createSpy: () => spy,
          stubActions: false
        })],
      },
    })

    await fireEvent.click(getByText('Remove'))

    await fireEvent.click(getByText('Yes'))

    expect(spy).toHaveBeenCalledWith('MockExtension')
  })

  it('calls store.toggleActive when checkbox is changed', async () => {
    const spy = vi.fn()
    const { getByRole } = render(ExtensionCard, {
      props: { extension: extensionMock },
      global: {
        plugins: [createTestingPinia({
          createSpy: () => spy,
          stubActions: false
        })],
      },
    })

    const checkbox = getByRole('checkbox')
    await fireEvent.click(checkbox)

    expect(spy).toHaveBeenCalledWith('MockExtension')
  })
})