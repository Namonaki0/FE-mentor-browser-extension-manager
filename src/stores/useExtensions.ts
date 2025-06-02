import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Extension } from '@/types/extension'
import rawData from '@/data/data.json'

export const useExtensions = defineStore('extensions', () => {
  const extensions = ref<Extension[]>(rawData)

  const filter = ref<'all' | 'active' | 'inactive'>('all')

  const filteredExtensions = computed(() => {
    if (filter.value === 'active') return extensions.value.filter(e => e.isActive)
    if (filter.value === 'inactive') return extensions.value.filter(e => !e.isActive)
    return extensions.value
  })

  const toggleActive = (name: string) => {
    const ext = extensions.value.find(e => e.name === name)
    if (ext) {
      ext.isActive = !ext.isActive
    }
  }

  const removeExtension = (name: string) => {
    extensions.value = extensions.value.filter(e => e.name !== name)
  }

  return {
    extensions,
    filter,
    filteredExtensions,
    toggleActive,
    removeExtension
  }
})