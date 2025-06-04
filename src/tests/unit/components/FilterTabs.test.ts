import { render, fireEvent } from '@testing-library/vue'
import FilterTabs from '@/components/extensions/FilterTabs.vue'
import { describe, it, expect, vi } from 'vitest'

describe('FilterTabs.vue', () => {
  it('renders all filter options', () => {
    const { getByLabelText } = render(FilterTabs, {
      props: {
        modelValue: 'all',
      },
    })

    expect(getByLabelText('All')).toBeTruthy()
    expect(getByLabelText('Active')).toBeTruthy()
    expect(getByLabelText('Inactive')).toBeTruthy()
  })

  it('highlights the selected filter', () => {
    const { getByLabelText } = render(FilterTabs, {
      props: {
        modelValue: 'active',
      },
    })

    const activeOption = getByLabelText('Active').closest('label')
    expect(activeOption?.classList.contains('active')).toBe(true)
  })

  it('emits update:modelValue when a different option is selected', async () => {
    const { getByLabelText, emitted } = render(FilterTabs, {
      props: {
        modelValue: 'all',
      },
    })

    await fireEvent.update(getByLabelText('Inactive'), 'inactive')

    expect(emitted()['update:modelValue']).toBeTruthy()
    expect(emitted()['update:modelValue'][0]).toEqual(['inactive'])
  })
})