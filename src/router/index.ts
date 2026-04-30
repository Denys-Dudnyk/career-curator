import { useUserStore } from '@/stores/user'
import type {
  NavigationGuard,
  RouteLocationNormalized,
  RouteRecordRaw,
} from 'vue-router'
import {
  createRouter,
  createWebHistory,
} from 'vue-router'

interface RouteMeta {
  requiresAuth?: boolean
}

const authGuard: NavigationGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
) => {
  const userStore = useUserStore()

  if (
    (to.meta as RouteMeta)
      ?.requiresAuth &&
    !userStore.isAuthenticated
  ) {
    return { name: 'Auth' }
  }

  if (
    to.name === 'Auth' &&
    userStore.isAuthenticated
  ) {
    return { name: 'Home' }
  }
  return true
}

const routes: Array<
  RouteRecordRaw & { meta?: RouteMeta }
> = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import('@/views/PageHome.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () =>
      import('@/views/PageAuth.vue'),
  },
  {
    path: '/interview/:id',
    name: 'Interview',
    component: () =>
      import('@/views/interview/PageInterview.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/list',
    name: 'List',
    component: () =>
      import('@/views/PageList.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/statistic',
    name: 'Statistic',
    component: () =>
      import('@/views/PageStatistic.vue'),
    meta: {
      requiresAuth: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL,
  ),
  routes: routes,
})

router.beforeEach(authGuard)

export default router
