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
  <div class="header-wrapper" v-auto-animate>
    <h1>Extensions List</h1>
    <FilterTabs v-model="filter" />
  </div>
  <ul class="card-wrapper" v-auto-animate>
    <ExtensionCard
      v-for="(extension, id) in filteredExtensions"
      :key="extension.name"
      :extension="extension"
    />
  </ul>
  <div class="restore-button-wrapper">
    <button class="restore-button" @click="showRestoreConfirm = true">
      Restore All Extensions
    </button>
  </div>

  <ConfirmModal
    v-show="showRestoreConfirm"
    :message="'Restore all deleted extensions?'"
    @confirm="confirmRestore"
    @cancel="showRestoreConfirm = false"
  />
</template>
<style scoped lang="scss">
@use '@/styles/components/list' as *;
</style>