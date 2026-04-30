<script setup lang="ts">
import AppFormField from '@/components/AppFormField.vue'
import type { IInterview } from '@/interfaces/interview'

const interview =
  defineModel<IInterview>({
    required: true,
  })
</script>

<template>
  <div
    class="p-8 bg-white rounded-2xl mt-10"
  >
    <h3
      class="text-sm font-bold text-primary uppercase flex items-center gap-2 mb-6"
    >
      <span
        class="pi pi-address-book"
      ></span>
      Контакт HR
    </h3>
    <AppFormField
      id="hrName"
      label="ФИО Менеджера"
      :isIcon="false"
      :labelClass="'text-[11px] mb-2 block mb-2 block font-bold'"
      type="text"
      v-model="interview.hrName"
    />
    <AppFormField
      id="contactTelegram"
      label="Telegram"
      :isIcon="false"
      :labelClass="'text-[11px] mb-2 block mb-2 block font-bold'"
      type="text"
      v-model="
        interview.contactTelegram
      "
    />
    <AppFormField
      id="contactEmail"
      label="Email HR"
      :isIcon="false"
      :labelClass="'text-[11px] mb-2 block mb-2 block font-bold'"
      type="text"
      v-model="interview.contactEmail"
      classContainer="mb-0"
    />
  </div>
</template>

<style scoped></style>
