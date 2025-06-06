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

const altText = computed(() =>
  theme.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
)

</script>

<template>
  <div class="app-header" v-auto-animate>
    <BaseLogo />
    <button class="theme-switcher" @click="toggleTheme">
      <img :src="iconPath" :alt="altText" class="icon" />
    </button>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/components/header' as *;
</style>