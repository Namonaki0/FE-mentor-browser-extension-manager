<script setup lang="ts">
import { ref, computed } from 'vue'

const isDarkMode = ref(false)

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  console.log(`Switched to ${isDarkMode.value ? 'dark' : 'light'} mode`)
}
const iconPath = computed(() =>
  new URL(
    `../../assets/icons/${isDarkMode.value ? 'icon-sun.svg' : 'icon-moon.svg'}`,
    import.meta.url
  ).href
)
</script>

<template>
  <div class="app-header">
    <div class="logo-container">
      <img src="@/assets/images/logo.svg" alt="Logo" class="logo" />
    </div>
    <button class="btn btn-primary" @click="toggleTheme">
      <img :src="iconPath" :alt="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'" class="icon" />
    </button>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border: 1px solid $neutral-300;
  border-radius: 10px;
  background: $neutral-0;

  .logo-container .logo {
    height: 40px;
  }

  .btn {
    border: none;
    cursor: pointer;
    background: $neutral-300;
    padding: 10px;
    border-radius: 10px;

    .icon {
      width: 24px;
      height: 24px;
    }
  }
}
</style>