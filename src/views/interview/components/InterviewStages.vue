<script setup lang="ts">
import type { IInterview } from '@/interfaces/interview'
import Textarea from 'primevue/textarea'

import AppFormField from '@/components/AppFormField.vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import Button from 'primevue/button'
import DatePicker from 'primevue/datepicker'

defineProps<{
  interview: IInterview
}>()

const emit = defineEmits([
  'addStage',
  'removeStage',
  'formatStageDate',
])
const addStage = () => {
  emit('addStage')
}
const removeStage = (index: number) => {
  emit('removeStage', index)
}

const formatStageDate = (
  index: number,
) => {
  emit('formatStageDate', index)
}
</script>

<style scoped></style>

<template>
  <div
    class="p-8 bg-white rounded-2xl mt-10"
  >
    <div
      :class="[
        'flex items-center justify-between',
        interview.stages?.length
          ? 'mb-8'
          : '',
      ]"
    >
      <h3
        class="text-sm font-bold text-primary uppercase flex items-center gap-2"
      >
        <span class="pi pi-list"></span>
        Этапы интервью
      </h3>

      <button
        class="flex items-center text-primary text-sm font-bold gap-1"
        @click="addStage"
      >
        <span
          class="pi pi-plus-circle text-base"
        >
        </span>
        Добавить этап
      </button>
    </div>
    <template v-if="interview.stages">
      <div class="flex flex-col gap-4">
        <div
          class="flex flex-col gap-2 relative bg-radio/50 p-4 rounded-xl"
          v-for="(
            stage, index
          ) in interview.stages"
          :key="stage.id"
        >
          <div
            class="text-base font-bold text-primary w-8 h-8 bg-primary-200 flex justify-center items-center rounded-full"
          >
            {{ index + 1 }}
          </div>
          <Button
            @click="removeStage(index)"
            class="pi pi-trash absolute right-4 top-4 text-secondary bg-radio border-none text-xl hover:text-red-600 transition-all"
          ></Button>
          <div
            class="flex items-center justify-between gap-6"
          >
            <AppFormField
              :id="`name-stage-${index}`"
              label="Название этапа"
              :isIcon="false"
              labelClass="text-[11px] mb-2 block mb-2 block font-bold text-secondary"
              type="text"
              :classContainer="'w-full'"
              v-model="stage.name"
            />
            <div class="w-full">
              <AppLabel
                :id="`date-stage-${index}`"
                label="Дата"
                labelClass="text-[11px] mb-2 block mb-2 block font-bold text-secondary"
              />
              <DatePicker
                :id="`date-stage-${index}`"
                fluid
                v-model="
                  stage.date as any
                "
                class="w-full max-h-9.5 focus:border-primary"
                dateFormat="dd.mm.yy"
                @date-select="
                  formatStageDate(index)
                "
              />
            </div>
          </div>

          <div class="mb-5">
            <AppLabel
              :id="`description-stage-${index}`"
              label="Комментарий"
              labelClass="text-[11px] mb-2 block mb-2 block font-bold text-secondary"
            />
            <Textarea
              :id="`description-stage-${index}`"
              rows="5"
              class="w-full h-full max-h-25 focus:border-primary"
              v-model="
                stage.description
              "
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
