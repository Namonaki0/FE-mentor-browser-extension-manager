<script setup lang="ts">
const props = defineProps<{
  name: string
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()
</script>

<template>
  <div class="modal-backdrop" @click.self="emit('cancel')">
    <div class="modal-content">
      <p>Are you sure you want to remove the <strong>{{ name }}</strong> extension?</p>
      <div class="actions">
        <button class="btn-confirm" @click="emit('confirm')">Yes</button>
        <button class="btn-cancel" @click="emit('cancel')">No</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/styles/components/modal' as *;
</style>