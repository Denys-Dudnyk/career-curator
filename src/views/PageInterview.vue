<template>
  <div
    class="max-w-7xl mx-auto"
    v-if="interview"
  >
    <AppTitle
      title="Frontend Developer"
    />
    <p
      class="mt-2 text-secondary text-base"
    >
      Детальная информация о процессе
      найма и текущем прогрессе
    </p>

    <div
      class="p-8 bg-white rounded-2xl mt-10 max-w-150"
    >
      <h3
        class="text-sm font-bold text-primary uppercase flex items-center gap-2 mb-6"
      >
        <span
          class="pi pi-id-card"
        ></span>
        Основная информация
      </h3>

      <AppFormField
        id="company"
        label="Название компании"
        icon="pi pi-building"
        :isIcon="false"
        :labelClass="'normal-case !text-sm'"
        type="text"
        v-model="interview.company"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppFormField from '@/components/AppFormField.vue'
import AppTitle from '@/components/ui/AppTitle.vue'
import type { IInterview } from '@/interfaces/interview'
import { useInterviewStore } from '@/stores/interviews'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const useStore = useInterviewStore()
const route = useRoute()

const interview =
  ref<IInterview | null>(null)

onMounted(async () => {
  interview.value =
    await useStore.getInterviewById(
      route.params.id as string,
    )
})
</script>

<style scoped></style>
