import { render, fireEvent } from '@testing-library/vue'
import ConfirmModal from '@/components/modal/ConfirmModal.vue'
import { describe, it, expect, vi } from 'vitest'

describe('ConfirmModal.vue', () => {
  it('renders default message with name when no custom message is passed', () => {
    const { getByText } = render(ConfirmModal, {
      props: { name: 'TestExtension' }
    })

    expect(getByText(/are you sure you want to remove the "TestExtension" extension/i)).toBeTruthy()
  })

  it('renders custom message when provided', () => {
    const { getByText } = render(ConfirmModal, {
      props: { message: 'Restore all deleted extensions?' }
    })

    expect(getByText('Restore all deleted extensions?')).toBeTruthy()
  })

  it('emits confirm event when clicking Yes button', async () => {
    const { getByText, emitted } = render(ConfirmModal, {
      props: { name: 'Mock' }
    })

    await fireEvent.click(getByText('Yes'))

    expect(emitted()).toHaveProperty('confirm')
    expect(emitted().confirm).toHaveLength(1)
  })

  it('emits cancel event when clicking No button', async () => {
    const { getByText, emitted } = render(ConfirmModal, {
      props: { name: 'Mock' }
    })

    await fireEvent.click(getByText('No'))

    expect(emitted()).toHaveProperty('cancel')
    expect(emitted().cancel).toHaveLength(1)
  })

  it('emits cancel event when clicking outside modal content', async () => {
    const { getByText, container, emitted } = render(ConfirmModal, {
      props: { name: 'Mock' }
    })

    const backdrop = container.querySelector('.modal-backdrop')
    await fireEvent.click(backdrop as HTMLElement)

    expect(emitted()).toHaveProperty('cancel')
  })
})