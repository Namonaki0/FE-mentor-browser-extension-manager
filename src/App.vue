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
@use '@/styles/globals' as *;
</style>
