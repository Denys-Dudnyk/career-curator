<script setup lang="ts">
import AppFormField from '@/components/AppFormField.vue'
import { FirebaseError } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
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
      if (
        error instanceof FirebaseError
      ) {
        if (
          error.code ===
          'auth/invalid-credential'
        ) {
          toast.add({
            severity: 'warn',
            summary:
              'Проблема со входом',
            detail:
              'Неверный пароль. Если вы регистрировались через Google, воспользуйтесь кнопкой ниже.',
            life: 5000,
          })
        } else {
          toast.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: error.message,
            life: 3000,
          })
        }
      }
    } finally {
      isLoading.value = false
    }
  }

const loginWithGoogle =
  async (): Promise<void> => {
    isLoading.value = true
    try {
      const provider =
        new GoogleAuthProvider()
      await signInWithPopup(
        getAuth(),
        provider,
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

const resetPassword =
  async (): Promise<void> => {
    if (!email.value) {
      toast.add({
        severity: 'warn',
        summary: 'Внимание',
        detail:
          'Пожалуйста, введите Email для сброса пароля',
        life: 3000,
      })
      return
    }
    isLoading.value = true

    try {
      await sendPasswordResetEmail(
        getAuth(),
        email.value,
      )
      toast.add({
        severity: 'success',
        summary: 'Успешно',
        detail:
          'Ссылка для сброса пароля отправлена на вашу почту',
        life: 5000,
      })
    } catch (error) {
      if (
        error instanceof FirebaseError
      ) {
        toast.add({
          severity: 'error',
          summary: 'Ошибка',
          detail:
            'Не удалось отправить письмо. Проверьте корректность Email.',
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

        <div
          class="flex justify-end -mt-3 mb-5"
        >
          <a
            @click="resetPassword"
            class="text-sm text-secondary hover:text-primary font-semibold cursor-pointer transition-all"
          >
            Забыли пароль?
          </a>
        </div>

        <Button
          :label="submitText"
          :loading="isLoading"
          type="submit"
          icon="pi pi-user"
          class="bg-primary border-none w-full"
        ></Button>
      </form>

      <div
        class="flex items-center my-6"
      >
        <div
          class="flex-grow border-t border-gray-200"
        ></div>
        <span
          class="mx-4 text-xs text-secondary uppercase"
          >или</span
        >
        <div
          class="flex-grow border-t border-gray-200"
        ></div>
      </div>

      <Button
        @click="loginWithGoogle"
        :loading="isLoading"
        class="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors py-2.5"
      >
        <svg
          v-if="!isLoading"
          viewBox="0 0 24 24"
          class="w-5 h-5 min-w-5"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        <span
          class="text-normal-gray font-semibold text-base"
          >Войти через Google</span
        >
      </Button>
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

<style scoped></style>
