<template>
  <label
    :for="id"
    :class="
      twMerge(
        'text-normal-gray font-semibold text-xs uppercase',
        labelClass,
      )
    "
    >{{ label }}</label
  >
</template>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge'

defineProps({
  id: String,
  label: String,
  labelClass: {
    type: String,
    default: 'uppercase',
  },
})
</script>

<style scoped></style>
