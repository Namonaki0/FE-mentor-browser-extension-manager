import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Extension } from '@/types/extension'
import { supabase } from '@/lib/supabase'

export const useExtensions = defineStore('extensions', () => {
  const extensions = ref<Extension[]>([])
  const filter = ref<'all' | 'active' | 'inactive'>('all')
  const loading = ref(false)
  const error = ref<null | string>(null)

  const fetchExtensions = async () => {
    loading.value = true
    const { data, error: fetchError } = await supabase
      .from('extensions')
      .select('name, description, logo, is_active')

    if (fetchError) {
      error.value = fetchError.message
    } else {
      extensions.value = data.map(row => ({
        name: row.name,
        description: row.description,
        logo: row.logo,
        isActive: row.is_active
      }))
    }

    loading.value = false
  }

  const toggleActive = async (name: string) => {
  const ext = extensions.value.find(e => e.name === name)
  if (!ext) return

  const { error } = await supabase
    .from('extensions')
    .update({ is_active: !ext.isActive })
    .eq('name', name)

  if (error) {
    console.error('Failed to toggle:', error.message)
    throw new Error(error.message)
  }

  ext.isActive = !ext.isActive
  }

  const removeExtension = async (name: string) => {
    const { error } = await supabase
      .from('extensions')
      .delete()
      .eq('name', name)

    if (!error) {
      extensions.value = extensions.value.filter(e => e.name !== name)
    } else {
      console.error('Failed to delete:', error.message)
      throw new Error(error.message)
    }
  }

  const filteredExtensions = computed(() => {
    if (filter.value === 'active') return extensions.value.filter(e => e.isActive)
    if (filter.value === 'inactive') return extensions.value.filter(e => !e.isActive)
    return extensions.value
  })

  return {
    extensions,
    filter,
    loading,
    error,
    fetchExtensions,
    toggleActive,
    removeExtension,
    filteredExtensions
  }
})