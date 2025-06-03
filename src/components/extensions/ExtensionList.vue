<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useExtensions } from '@/stores/useExtensions'
import ExtensionCard from './ExtensionCard.vue'
import FilterTabs from './FilterTabs.vue'

const store = useExtensions()

onMounted(() => {
  store.fetchExtensions()
})

const { filter, filteredExtensions } = storeToRefs(store)
</script>

<template>
  <div class="header-wrapper">
    <h1>Extensions List</h1>
    <FilterTabs v-model="filter" />
  </div>
  <div class="card-wrapper">
    <ExtensionCard
      v-for="(extension, id) in filteredExtensions"
      :key="id"
      :extension="extension"
    />
  </div>
</template>
<style scoped lang="scss">
h1 {
  font-weight: bold;
  font-size: 40px;
  text-align: center;
  margin: 25px 0 10px;
}
@media (min-width: 768px) {
  .card-wrapper {
    display: flex;
    flex-flow: wrap;
    justify-content: center;  
  }
}
@media (min-width: 1024px) {
  .header-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .card-wrapper {
    gap: 5px 5px;
  }
}
</style>