<script setup lang="ts">
import AppFormField from '@/components/AppFormField.vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import AppTitle from '@/components/ui/AppTitle.vue'
import { useInterviewStages } from '@/composables/useInterviewStages'
import type { IInterview } from '@/interfaces/interview'
import { useInterviewStore } from '@/stores/interviews'
import Button from 'primevue/button'
import RadioButton from 'primevue/radiobutton'
import RadioButtonGroup from 'primevue/radiobuttongroup'
import { onMounted, ref } from 'vue'
import {
  useRoute,
  useRouter,
} from 'vue-router'
import InterviewStages from './components/InterviewStages.vue'

const useStore = useInterviewStore()
const router = useRouter()
const route = useRoute()

const interview =
  ref<IInterview | null>(null)
const {
  addStage,
  formatStageDate,
  removeStage,
} = useInterviewStages(interview)
const isLoading = ref<boolean>(false)

const saveInterview = async () => {
  isLoading.value = true
  if (interview.value) {
    await useStore.saveInterview({
      ...interview.value,
    })
  }
  isLoading.value = false
  router.push('/list')
}

onMounted(async () => {
  const data =
    await useStore.getInterviewById(
      route.params.id as string,
    )
  if (data) {
    if (!data.result) {
      data.result = 'process'
    }
    interview.value = data
  }
})
</script>

<style scoped></style>

<template>
  <div
    class="max-w-250 mx-auto"
    v-if="interview"
  >
    <div
      class="flex items-center justify-between"
    >
      <div>
        <AppTitle
          title="Frontend Developer"
        />
        <p
          class="mt-2 text-secondary text-base"
        >
          Детальная информация о
          процессе найма и текущем
          прогрессе
        </p>
      </div>

      <Button
        label="Сохранить"
        icon="pi pi-save"
        class="bg-primary"
        :loading="isLoading"
        @click="saveInterview"
      />
    </div>
    <div
      class="mx-auto grid grid-cols-3 gap-8 max-w-250 items-start"
    >
      <div class="col-span-2">
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
              v-model="
                interview.company
              "
              classContainer="w-full"
            />

            <AppFormField
              id="vacancyLink"
              label="Ссылка на вакансию"
              icon="pi pi-link"
              labelClass="normal-case text-sm mb-2 block"
              type="text"
              v-model="
                interview.vacancyLink
              "
              classContainer="w-full"
            />
          </div>
          <div class="">
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

        <InterviewStages
          :interview="interview"
          @addStage="addStage"
          @removeStage="removeStage"
          @formatStageDate="
            formatStageDate
          "
        />
      </div>

      <div class="col-span-1">
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
              <label for="offer"
                >Оффер</label
              >
            </div>
          </RadioButtonGroup>
        </div>
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
            v-model="
              interview.contactEmail
            "
            classContainer="mb-0"
          />
        </div>
      </div>
    </div>
  </div>
</template>
