<script setup lang="ts">
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
      class="text-sm font-bold text-secondary uppercase flex items-center gap-2 mb-6"
    >
      Статус интервью
    </h3>
    <RadioButtonGroup
      name="result"
      v-model="interview.result"
      class="flex flex-col gap-4"
    >
      <div
        class="flex items-center gap-2 p-4 bg-radio rounded-xl checked:border-primary w-full"
      >
        <RadioButton
          inputId="reject"
          value="reject"
        />
        <span
          class="pi pi-times text-[15px] text-red-600 border-2 border-red-600 rounded-full p-0.5"
        ></span>
        <label for="reject">
          Отказ</label
        >
      </div>
      <div
        class="flex items-center p-4 bg-radio gap-2 rounded-xl"
      >
        <RadioButton
          inputId="process"
          value="process"
        />
        <span
          class="pi pi-ellipsis-h text-[15px] text-primary border-2 border-primary rounded-full p-0.5"
        ></span>
        <label for="process"
          >В процессе</label
        >
      </div>
      <div
        class="flex items-center p-4 bg-radio gap-2 rounded-xl"
      >
        <RadioButton
          inputId="offer"
          value="offer"
        />
        <span
          class="pi pi-verified text-[23px] text-green-600 p-0.5"
        ></span>
        <label for="offer">Оффер</label>
      </div>
    </RadioButtonGroup>
  </div>
</template>

<style scoped></style>
