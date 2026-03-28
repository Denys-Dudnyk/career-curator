<template>
  <div
    class="flex justify-center items-center align-middle h-full"
  >
    <div
      class="p-10 bg-white rounded-xl w-full max-w-112.5 mb-5"
    >
      <h1
        class="text-2xl mb-2 font-semibold"
      >
        Создать интервью
      </h1>
      <form
        @submit.prevent="
          createInterview
        "
      >
        <AppFormField
          id="company"
          label="Компания*"
          icon="pi pi-building"
          placeholder="Компания"
          type="text"
          v-model="formData.company"
          autocomplete="on"
        />
        <AppFormField
          id="vacancyLink"
          label="Описание вакансии
            (ссылка)*"
          icon="pi pi-link"
          placeholder="https://djinni.co/jobs"
          type="url"
          v-model="formData.vacancyLink"
          autocomplete="on"
        />
        <AppFormField
          id="hrName"
          label="Контакт (имя)*"
          icon="pi pi-user"
          placeholder="Полина"
          type="text"
          v-model="formData.hrName"
          autocomplete="on"
        />
        <AppFormField
          id="contactTelegram"
          label="Telegram контакт"
          icon="pi pi-telegram"
          placeholder="@copsoft"
          type="text"
          iconColorClass="group-focus-within:text-blue-600"
          v-model="
            formData.contactTelegram
          "
          autocomplete="on"
        />
        <AppFormField
          id="contactWhatsapp"
          label="Whatsapp контакт"
          icon="pi pi-whatsapp"
          placeholder="+380 000 000 000"
          iconColorClass="group-focus-within:text-green-600"
          type="text"
          v-model="
            formData.contactWhatsapp
          "
          autocomplete="on"
        />

        <AppFormField
          id="contactEmail"
          label="Email контакт"
          icon="pi pi-at "
          placeholder="hr@company.com"
          type="text"
          v-model="
            formData.contactEmail
          "
          autocomplete="on"
        />

        <Button
          :label="'Создать'"
          :loading="isLoading"
          type="submit"
          icon="pi pi-desktop"
          class="bg-primary border-none w-full"
          :disabled="formDisabled"
        ></Button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppFormField from '@/components/AppFormField.vue'
import { useInterviewStore } from '@/stores/interviews'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import {
  computed,
  reactive,
  ref,
} from 'vue'
import { useRouter } from 'vue-router'

const initialState = {
  company: '',
  vacancyLink: '',
  hrName: '',
  contactTelegram: '',
  contactWhatsapp: '',
  contactEmail: '',
}

const interviewStore =
  useInterviewStore()

const formData = reactive({
  ...initialState,
})

const isLoading = ref<boolean>(false)
const toast = useToast()
const router = useRouter()

const formDisabled = computed(() => {
  return !(
    formData.company &&
    formData.vacancyLink &&
    formData.hrName
  )
})

const createInterview =
  async (): Promise<void> => {
    try {
      isLoading.value = true

      await interviewStore.addNewInterview(
        { ...formData },
      )

      Object.assign(
        formData,
        initialState,
      )
      toast.add({
        severity: 'success',
        summary: 'Успешно',
        detail:
          'Вы успешно добавили новый отклик',
        life: 5000,
      })

      router.push('/list')
    } catch (error) {
      if (error instanceof Error) {
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
          life: 5000,
        })
      }
    } finally {
      isLoading.value = false
    }
  }
</script>

<style scoped></style>
