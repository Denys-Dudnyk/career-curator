<template>
  <div :class="[classContainer]">
    <AppLabel
      :id="id"
      :labelClass="labelClass"
      :label="label"
    />

    <IconField class="group">
      <InputIcon
        :class="[
          icon,
          iconColorClass,
          'transition-colors',
        ]"
        v-if="isIcon"
        >{{ iconText }}</InputIcon
      >
      <InputNumber
        v-if="type === 'number'"
        :id="id"
        :type="type"
        class="focus:border-primary rounded-lg w-full autofill:text-sm text-sm"
        :placeholder="placeholder"
        v-model="modelNumber"
        :autocomplete="autocomplete"
      />
      <InputText
        v-else
        :id="id"
        :type="type"
        class="focus:border-primary rounded-lg w-full autofill:text-sm text-sm"
        :placeholder="placeholder"
        v-model="modelString"
        :autocomplete="autocomplete"
      />
    </IconField>
  </div>
</template>

<script setup lang="ts">
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import { computed } from 'vue'
import AppLabel from './ui/AppLabel.vue'

const model = defineModel<
  string | number
>()

const modelString = computed({
  get: () => String(model.value ?? ''),
  set: (val) => (model.value = val),
})

const modelNumber = computed({
  get: () =>
    typeof model.value === 'number'
      ? model.value
      : null,
  set: (val) =>
    (model.value = val as number),
})

defineProps({
  classContainer: {
    type: String,
    default: 'mb-5',
  },
  iconText: {
    type: String,
    default: '',
  },
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
