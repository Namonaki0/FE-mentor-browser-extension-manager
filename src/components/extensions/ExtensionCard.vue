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
  <div class="card">
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
      v-if="showModal"
      :name="extension.name"
      @confirm="store.removeExtension(extension.name); showModal = false"
      @cancel="showModal = false"
    />
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/components/switch' as *;
.card {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid var(--card-border);
  border-radius: 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  margin: 0;
    margin-bottom: 10px;
  background: var(--card-bg);
}
.logo-container {
  display: flex;
  align-items: center;
  width: 100%;
  flex: 1;
}
.logo {
  width: 60px;
  margin-right: 1rem;
}
.content {
  flex: 1;
}
.name {
  font-weight: 700;
}
.actions {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}
.name {
  margin-bottom: 0.5rem;
}
.description {
  margin: 0;
  color: var(--secondary-text);
}
.remove-btn {
  border: 1px solid var(--button-border);
  outline: 1px solid var(--card-bg);
  border-radius: 20px;
  padding: 6px 15px;
  cursor: pointer;
  transition: all 0.1s ease;
  color: var(--text);
}
.remove-btn:hover,
.remove-btn:focus {
  background: var(--red-700);
  color: var(--neutral-0);
  outline: 1px solid var(--red-500);
}
.toggle-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.toggle-label {
  font-weight: 500;
  color: var(--neutral-900);
}
@media (min-width: 770px) {
  .card {
    width: 49%;
    margin-bottom: 0;
  }
}
@media (min-width: 1440px) {
  .card {
    width: 33%;
  }
}
</style>
