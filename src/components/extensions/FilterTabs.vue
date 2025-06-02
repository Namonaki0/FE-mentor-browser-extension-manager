<script setup lang="ts">
import { computed } from 'vue'; 

const props = defineProps<{
  modelValue: 'all' | 'active' | 'inactive'
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: 'all' | 'active' | 'inactive'): void
}>()

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' }
]

const modelValue = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val)
})
</script>

<template>
  <div class="filter-tabs" role="radiogroup">
    <label
      v-for="option in filters"
      :key="option.value"
      class="filter-option"
      :class="{ active: modelValue === option.value }"
    >
      <input
        type="radio"
        class="sr-only"
        name="filter"
        :value="option.value"
        v-model="modelValue"
      />
      {{ option.label }}
    </label>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.filter-tabs {
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
}
.filter-option {
  display: inline-block;
  padding: .5rem 1.25rem;
  border: 1px solid $neutral-300;
  border-radius: 25px;
  background: white;
  color: $neutral-900;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 20px;

  &.active {
    background-color: $red-500;
    color: white;
  }

  &:hover:not(.active) {
    background-color: $neutral-100;
  }
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
</style>