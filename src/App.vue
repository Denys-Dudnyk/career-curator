<template>
  <AppProgress
    v-if="!userStore.isAuthReady"
  />

  <div
    v-else
    class="flex h-screen bg-gray-50"
  >
    <AppHeader />
    <main
      class="flex-1 p-6 overflow-auto"
    >
      <RouterView />
    </main>
  </div>
  <app-toast position="top-right" />
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'

import { useUserStore } from '@/stores/user'
// import {
//   getAuth,
//   onAuthStateChanged,
// } from 'firebase/auth'
// import { onMounted, ref } from 'vue'

const userStore = useUserStore()
// const isLoading = ref<boolean>(true)

// onMounted(() => {
//   onAuthStateChanged(
//     getAuth(),
//     (user) => {
//       if (user) {
//         console.log(user)
//         userStore.userId = user.uid
//       } else {
//         userStore.userId = ''
//       }
//       isLoading.value = false
//     },
//   )
// })
</script>
<style scoped>
.main-container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}

.fade-enter-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from {
  opacity: 0;
}

.flex.h-screen {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
