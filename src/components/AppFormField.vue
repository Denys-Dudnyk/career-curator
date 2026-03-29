<template>
  <div class="mb-5">
    <label
      :for="id"
      :class="[
        labelClass,
        'text-normal-gray font-semibold text-xs',
      ]"
      >{{ label }}</label
    >
    <IconField class="group">
      <InputIcon
        :class="[
          icon,
          iconColorClass,
          'transition-colors',
        ]"
        v-if="isIcon"
      />
      <InputText
        :id="id"
        :type="type"
        class="focus:border-indigo-500 rounded-lg w-full autofill:text-sm text-sm"
        :placeholder="placeholder"
        v-model="model"
        :autocomplete="autocomplete"
      />
    </IconField>
  </div>
</template>

<script setup lang="ts">
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'

const model = defineModel<string>()

defineProps({
  iconColorClass: {
    type: String,
    default:
      'group-focus-within:text-primary',
  },
  labelClass: {
    type: String,
    default: 'uppercase',
  },

  isIcon: {
    type: Boolean,
    default: true,
  },
  label: String,
  type: String,
  placeholder: String,
  icon: String,
  id: String,
  autocomplete: {
    type: String,
    default: 'off',
  },
})
</script>

<style scoped></style>
