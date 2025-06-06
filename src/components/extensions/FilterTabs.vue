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
        class="all-btn"
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
@use '@/styles/components/filter' as *;
</style>