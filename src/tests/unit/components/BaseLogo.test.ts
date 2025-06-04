import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import BaseLogo from '@/components/ui/BaseLogo.vue'

describe('BaseLogo.vue', () => {
  it('renders SVG logo container', () => {
    const { container } = render(BaseLogo)

    const svg = container.querySelector('svg')
    expect(svg).toBeTruthy()
    expect(svg?.classList.contains('logo')).toBe(true)
  })
})