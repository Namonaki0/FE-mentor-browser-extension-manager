<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useExtensions } from '@/stores/useExtensions'
import ExtensionCard from './ExtensionCard.vue'
import FilterTabs from './FilterTabs.vue'

const store = useExtensions()
const { filter, filteredExtensions } = storeToRefs(store)
</script>

<template>
  <h1>Extensions List</h1>
  <FilterTabs v-model="filter" />
  <ExtensionCard
    v-for="(extension, id) in filteredExtensions"
    :key="id"
    :extension="extension"
  />
</template>
<style scoped lang="scss">
h1 {
  font-weight: bold;
  font-size: 40px;
  text-align: center;
  margin: 25px 0 10px;
}
</style>