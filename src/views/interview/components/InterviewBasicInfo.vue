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
        class="pi pi-id-card"
      ></span>
      Основная информация
    </h3>

    <div
      class="flex gap-6 justify-between items-center"
    >
      <AppFormField
        id="company"
        label="Название компании"
        :isIcon="false"
        :labelClass="'normal-case !text-sm mb-2 block'"
        type="text"
        v-model="interview.company"
        classContainer="w-full"
      />

      <AppFormField
        id="vacancyLink"
        label="Ссылка на вакансию"
        icon="pi pi-link"
        labelClass="normal-case text-sm mb-2 block"
        type="text"
        v-model="interview.vacancyLink"
        classContainer="w-full"
      />
    </div>
    <div>
      <AppLabel
        label="Вилка зарплаты (в месяц)"
        labelClass="normal-case text-sm"
      />
      <div
        class="flex items-center mt-2"
      >
        <AppFormField
          id="salaryFrom"
          iconText="От"
          type="number"
          classContainer="mb-0"
          v-model.number="
            interview.salaryFrom
          "
        />
        <AppFormField
          id="salaryTo"
          type="number"
          iconText="До"
          classContainer="mb-0 ml-4"
          v-model.number="
            interview.salaryTo
          "
        />

        <div>
          <span
            class="h-full ml-4 my-auto text-secondary"
          >
            EURO
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
