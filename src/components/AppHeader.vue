<template>
  <aside
    :class="[
      'relative transition-all duration-300 h-full flex flex-col justify-between bg-[#F0F4F7]',
      collapsed ? 'w-20' : 'w-64',
    ]"
  >
    <div
      class="p-4 flex items-center justify-between"
    >
      <div
        class="flex items-center gap-3"
      >
        <div
          class="w-10 h-10 rounded-full bg-primary-200 flex items-center justify-center"
        >
          <span
            class="text-primary font-bold"
            >{{
              userStore.user?.email
                ?.charAt(0)
                .toUpperCase() || 'CC'
            }}</span
          >
        </div>

        <div
          class="transition-all duration-200 whitespace-nowrap"
          :class="
            collapsed
              ? 'opacity-0 w-0 overflow-hidden'
              : 'opacity-100 w-auto'
          "
        >
          <div
            class="font-semibold text-gray-800"
          >
            {{
              userStore.user?.email?.split(
                '@',
              )[0] || 'Career Curator'
            }}
          </div>
          <div
            class="text-sm text-gray-400"
          >
            Кандидат
          </div>
        </div>
      </div>

      <button
        @click="collapsed = !collapsed"
        class="absolute top-6 -right-3 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-white shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200"
      >
        <i
          style="
            font-size: 10px;
            color: #4f46e5;
          "
          class="pi"
          :class="
            collapsed
              ? 'pi-chevron-right'
              : 'pi-chevron-left'
          "
        ></i>
      </button>
    </div>
    <ul class="flex-1 px-4 space-y-2">
      <li
        v-for="item in visibleItems"
        :key="item.path"
      >
        <RouterLink
          :to="item.path"
          class="flex items-center gap-3 px-1.25 py-2 rounded-xl transition-all hover:translate-x-1"
          :class="[
            isActive(item.path)
              ? 'bg-white text-primary'
              : 'text-secondary hover:bg-gray-300 hover:text-gray-600',
          ]"
        >
          <div
            class="w-9 flex justify-center"
          >
            <div
              class="w-9 h-9 flex items-center justify-center rounded-lg"
            >
              <i :class="item.icon"></i>
            </div>
          </div>

          <span
            class="transition-all duration-200 whitespace-nowrap font-medium"
            :class="
              collapsed
                ? 'opacity-0 w-0 overflow-hidden'
                : 'opacity-100 w-auto'
            "
          >
            {{ item.label }}
          </span>
        </RouterLink>
      </li>
    </ul>

    <div
      class="p-4 flex items-center"
      :class="
        collapsed
          ? 'justify-center'
          : 'justify-between'
      "
    >
      <button
        v-if="userStore.userId"
        @click="signOutMethod"
        class="flex items-center justify-center gap-3 text-secondary hover:text-primary hover:translate-x-1 transition"
      >
        <i class="pi pi-sign-out"></i>
        <span
          class="transition-all duration-200 whitespace-nowrap"
          :class="
            collapsed
              ? 'opacity-0 w-0 overflow-hidden'
              : 'opacity-100 w-auto'
          "
          >Выход</span
        >
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import {
  getAuth,
  signOut,
} from 'firebase/auth'
import type { ComputedRef } from 'vue'
import { computed, ref } from 'vue'

import {
  RouterLink,
  useRoute,
  useRouter,
} from 'vue-router'

interface IMenuItem {
  label: string
  icon: string
  path: string
  show: ComputedRef<boolean>
}

const userStore = useUserStore()

const router = useRouter()
const route = useRoute()

const isActive = (path: string) =>
  route.path === path
const collapsed = ref(false)

const items = ref<IMenuItem[]>([
  {
    label: 'Авторизация',
    icon: 'pi pi-user',
    path: '/auth',
    show: computed(
      (): boolean =>
        !userStore.isAuthenticated,
    ),
  },
  {
    label: 'Добавить',
    icon: 'pi pi-plus',
    path: '/',
    show: computed(
      (): boolean =>
        userStore.isAuthenticated,
    ),
  },
  {
    label: 'Собеседования',
    icon: 'pi pi-list',
    path: '/list',
    show: computed(
      (): boolean =>
        userStore.isAuthenticated,
    ),
  },
  {
    label: 'Статистика',
    icon: 'pi pi-chart-pie',
    path: '/statistic',
    show: computed(
      (): boolean =>
        userStore.isAuthenticated,
    ),
  },
])

const signOutMethod =
  async (): Promise<void> => {
    await signOut(getAuth())
    router.push('/auth')
  }

const visibleItems = computed(() =>
  items.value.filter(
    (item) => item.show,
  ),
)
</script>

<style scoped>
i.pi {
  font-size: 1.2rem;
}
</style>
