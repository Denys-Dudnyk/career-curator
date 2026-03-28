<template>
  <app-toast position="top-right" />
  <div
    class="flex justify-center items-center flex-col h-full"
  >
    <div
      class="p-10 bg-white rounded-xl w-full max-w-112.5 mb-5"
    >
      <div class="mb-8">
        <div
          class="text-primary text-2xl font-bold mb-1.5"
        >
          Добро пожаловать
        </div>
        <p
          class="text-secondary text-sm"
        >
          Пожалуйста, войдите в свою
          учетную запись, чтобы
          продолжить управление
          карьерой.
        </p>
      </div>

      <form
        @submit.prevent="submitForm"
      >
        <AppFormField
          id="email"
          label="Email"
          icon="pi pi-envelope "
          placeholder="example@mail.com"
          type="email"
          v-model="email"
        />

        <AppFormField
          id="password"
          label="Пароль"
          icon="pi pi-lock "
          placeholder="••••••••"
          type="password"
          v-model="password"
        />

        <Button
          :label="submitText"
          :loading="isLoading"
          type="submit"
          icon="pi pi-user"
          class="bg-primary border-none w-full"
        ></Button>
      </form>
    </div>
    <p class="text-normal-gray text-sm">
      {{ subtitleText }}
      <a
        class="text-primary font-semibold cursor-pointer"
        @click="toggleAuth"
      >
        {{ linkAccountText }}
      </a>
    </p>
  </div>
</template>

<script setup lang="ts">
import AppFormField from '@/components/AppFormField.vue'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref<string>('')
const password = ref<string>('')
const isLogin = ref<boolean>(true)
const isLoading = ref<boolean>(false)
const router = useRouter()
const toast = useToast()
const toggleAuth = () => {
  isLogin.value = !isLogin.value
}

const subtitleText = computed(() => {
  return isLogin.value
    ? 'Нет аккаунта?'
    : 'Уже есть аккаунт?'
})

const linkAccountText = computed(() => {
  return isLogin.value
    ? 'Зарегистрироваться'
    : 'Войти'
})

const submitText = computed(() => {
  return isLogin.value
    ? 'Войти'
    : 'Зарегистрироваться'
})

const signUp =
  async (): Promise<void> => {
    isLoading.value = true
    try {
      await createUserWithEmailAndPassword(
        getAuth(),
        email.value,
        password.value,
      )
      router.push('/')
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
          life: 3000,
        })
      }
    } finally {
      isLoading.value = false
    }
  }

const signIn =
  async (): Promise<void> => {
    isLoading.value = true
    try {
      await signInWithEmailAndPassword(
        getAuth(),
        email.value,
        password.value,
      )
      router.push('/')
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
          life: 3000,
        })
      }
    } finally {
      isLoading.value = false
    }
  }

const submitForm = (): void => {
  if (isLogin.value) {
    signIn()
  } else {
    signUp()
  }
}
</script>

<style scoped></style>
