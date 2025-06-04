<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useExtensions } from '@/stores/useExtensions'
import ExtensionCard from './ExtensionCard.vue'
import FilterTabs from './FilterTabs.vue'
import ConfirmModal from '@/components/modal/ConfirmModal.vue'

const store = useExtensions()

onMounted(() => {
  store.fetchExtensions()
})

const { filter, filteredExtensions } = storeToRefs(store)

const showRestoreConfirm = ref(false)

const confirmRestore = async () => {
  await store.restoreDeletedExtensions()
  showRestoreConfirm.value = false
}
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
  <div class="restore-button-wrapper">
    <button class="restore-button" @click="showRestoreConfirm = true">
      Restore All Extensions
    </button>
  </div>

  <ConfirmModal
    v-if="showRestoreConfirm"
    :message="'Restore all deleted extensions?'"
    @confirm="confirmRestore"
    @cancel="showRestoreConfirm = false"
  />
</template>
<style scoped lang="scss">
h1 {
  font-weight: bold;
  font-size: 40px;
  text-align: center;
  margin: 0;
}
.restore-button-wrapper {
  display: flex;
  justify-content: center;
}
.header-wrapper {
  margin: 15px 0;
}
.card-wrapper {
  gap: 10px 10px;
  margin-bottom: 20px;
}
.restore-button {
  background: var(--restore-button-bg);
  color: var(--text);
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  opacity: 0.8;

  &:hover,
  &:focus {
    opacity: 1;
  }
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