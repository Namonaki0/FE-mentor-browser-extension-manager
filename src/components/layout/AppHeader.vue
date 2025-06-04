<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme'
import BaseLogo from '@/components/ui/BaseLogo.vue'

const { theme, toggleTheme } = useTheme()

const iconPath = computed(() =>
  new URL(
    `../../assets/icons/${theme.value === 'dark' ? 'icon-sun.svg' : 'icon-moon.svg'}`,
    import.meta.url
  ).href
)
</script>

<template>
  <div class="app-header">
    <BaseLogo />
    <button class="btn btn-primary" @click="toggleTheme">
      <img :src="iconPath" :alt="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'" class="icon" />
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
  border: 1px solid var(--default-border-color);
  border-radius: 10px;
  background: var(--card-bg);

  .btn {
    border: none;
    cursor: pointer;
    background: var(--theme-switcher);
    padding: 10px;
    border-radius: 10px;

    .icon {
      width: 24px;
      height: 24px;
    }
  }
}
</style>