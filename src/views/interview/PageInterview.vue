<script setup lang="ts">
import AppTitle from '@/components/ui/AppTitle.vue'
import { useInterviewStages } from '@/composables/useInterviewStages'
import type { IInterview } from '@/interfaces/interview'
import { useInterviewStore } from '@/stores/interviews'
import Button from 'primevue/button'
import { onMounted, ref } from 'vue'
import {
  useRoute,
  useRouter,
} from 'vue-router'
import InterviewBasicInfo from './components/InterviewBasicInfo.vue'
import InterviewContactInfo from './components/InterviewContactInfo.vue'
import InterviewStages from './components/InterviewStages.vue'
import InterviewStatus from './components/InterviewStatus.vue'

const useStore = useInterviewStore()
const router = useRouter()
const route = useRoute()

const interview =
  ref<IInterview | null>(null)
const isLoading = ref<boolean>(false)
const {
  addStage,
  formatStageDate,
  removeStage,
} = useInterviewStages(interview)

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
        <InterviewBasicInfo
          v-model="interview"
        />

        <InterviewStages
          v-model="interview"
          @addStage="addStage"
          @removeStage="removeStage"
          @formatStageDate="
            formatStageDate
          "
        />
      </div>

      <div class="col-span-1">
        <InterviewStatus
          v-model="interview"
        />
        <InterviewContactInfo
          v-model="interview"
        />
      </div>
    </div>
  </div>
</template>
