<script setup lang="ts">
import AppHeader from './components/layout/AppHeader.vue';
import ExtensionList from './components/extensions/ExtensionList.vue';
</script>

<template>
  <div class="app-container">
    <AppHeader />
    <ExtensionList />
  </div>
</template>
<style scoped lang="scss">
.app-container {
  background: var(--bg);
  color: var(--text);
  padding: var(--mobile-padding);
  min-height: 100vh;
}

@media (min-width: 1024px) {
  .app-container {
    padding: var(--desktop-padding);
      
  } 
}
</style>
