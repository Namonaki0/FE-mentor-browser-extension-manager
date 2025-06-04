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
  const { data, error: fetchError } = await supabase
    .from('extensions')
    .select('name, description, logo, is_active, deleted')
    .eq('deleted', false) // 👈 exclude deleted

    if (!fetchError && data) {
      extensions.value = data.map(row => ({
        name: row.name,
        description: row.description,
        logo: row.logo,
        isActive: row.is_active
      }))
    } else {
      console.error(fetchError?.message)
    }
  }

const restoreDeletedExtensions = async () => {
  const { data, error } = await supabase
    .from('extensions')
    .select('name')
    .eq('deleted', true)

  if (error) {
    console.error('Failed to fetch deleted extensions:', error.message)
    return
  }

  const restoreNames = data.map(e => e.name)

  if (restoreNames.length === 0) {
    console.log('No extensions to restore.')
    return
  }

  console.log('Restoring:', restoreNames)

  const { error: updateError } = await supabase
    .from('extensions')
    .update({ deleted: false, is_active: false })
    .in('name', restoreNames)

  if (updateError) {
    console.error('Failed to restore extensions:', updateError.message)
    return
  }

  await fetchExtensions()
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
      .update({ deleted: true })
      .eq('name', name)
      console.log('Removing:', name)

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
    restoreDeletedExtensions,
    filteredExtensions
  }
})