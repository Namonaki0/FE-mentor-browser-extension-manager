<script setup lang="ts">
import { ref } from 'vue'
import type { Extension } from '@/types/extension'
import ConfirmModal from '../modal/ConfirmModal.vue'
import { useExtensions } from '@/stores/useExtensions'

const props = defineProps<{ extension: Extension }>()

const showModal = ref(false)
const store = useExtensions()

const handleToggle = async () => {
  try {
    await store.toggleActive(props.extension.name)
  } catch (err) {
    console.error('Toggle failed:', err)
    alert('Failed to update toggle. Please try again.')
  }
}

const confirmRemoval = async () => {
  try {
    await store.removeExtension(props.extension.name)
    showModal.value = false
  } catch (err) {
    console.error('Deletion failed:', err)
    alert('Failed to remove extension. Please try again.')
  }
}

function resolveLogo(path: string): string {
  return new URL(`../../assets/images/${path.split('/').pop()}`, import.meta.url).href
}
</script>

<template>
  <li class="card">
    <div class="logo-container">
      <img :src="resolveLogo(extension.logo)" :alt="extension.name" class="logo" />
      <div class="content">
        <h3 class="name">{{ extension.name }}</h3>
        <p class="description">{{ extension.description }}</p>
      </div>
    </div>

    <div class="actions">
      <button class="remove-btn" @click="showModal = true">Remove</button>
      <div class="toggle-wrapper">
        <label class="switch">
          <input
            type="checkbox"
            :checked="extension.isActive"
            @change="store.toggleActive(extension.name)"
          />
        <span class="slider"></span>
        </label>
      </div>
    </div>

    <ConfirmModal
      v-show="showModal"
      :name="extension.name"
      @confirm="store.removeExtension(extension.name); showModal = false"
      @cancel="showModal = false"
    />
  </li>
</template>

<style scoped lang="scss">
@use '@/styles/components/switch' as *;
@use '@/styles/components/card' as *;
</style>
