<script setup lang="ts">
const props = defineProps<{
  name?: string,
  message?: string
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()
</script>

<template>
  <Transition name="fade">
    <div class="modal-backdrop" @click.self="emit('cancel')">
      <div class="modal-content">
        <p>{{message || `Are you sure you want to remove the "${name}" extension?`}}</p>
        <div class="actions">
          <button class="btn-confirm" @click="emit('confirm')">Yes</button>
          <button class="btn-cancel" @click="emit('cancel')">No</button>
        </div>
      </div>
    </div>
  </Transition> 
</template>

<style scoped lang="scss">
@use '@/styles/components/modal' as *;
</style>