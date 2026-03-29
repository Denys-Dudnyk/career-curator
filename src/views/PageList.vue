<template>
  <ConfirmDialog group="headless">
    <template
      #container="{
        message,
        acceptCallback,
        rejectCallback,
      }"
    >
      <div
        class="flex flex-col items-center p-8 bg-white rounded-2xl shadow-2xl border-none border-primary-100"
      >
        <div
          class="rounded-full bg-primary-50 text-primary-600 inline-flex justify-center items-center h-20 w-20 -mt-16 border-4 border-primary shadow-lg"
        >
          <i
            class="pi pi-trash text-3xl"
          ></i>
        </div>
        <span
          class="font-bold text-xl text-primary-900 block mb-2 mt-4"
          >{{ message.header }}</span
        >
        <p
          class="text-normal-gray text-center mb-6 leading-relaxed"
        >
          {{ message.message }}
        </p>
        <div
          class="flex items-center gap-3 w-full"
        >
          <Button
            label="Удалить"
            @click="acceptCallback"
            class="flex-1 bg-red-500 hover:bg-red-600 border-none py-3 rounded-xl transition-all duration-200"
          ></Button>
          <Button
            label="Отменить"
            variant="outlined"
            @click="rejectCallback"
            class="flex-1 border-primary-200 text-primary-600 hover:bg-primary-50 py-3 rounded-xl transition-all duration-200"
          ></Button>
        </div>
      </div>
    </template>
  </ConfirmDialog>

  <div class="max-w-7xl mx-auto">
    <div
      class="flex justify-between items-center mb-8"
    >
      <AppTitle
        title="Список собеседований"
      />
      <div
        class="text-sm text-secondary font-medium bg-primary-50 px-4 py-2 rounded-full"
      >
        Всего:
        {{
          useInterviews.interviews
            .length
        }}
      </div>
    </div>

    <div
      class="bg-white rounded-2xl shadow-sm border border-primary-100 overflow-hidden"
    >
      <DataTable
        :value="
          isLoading
            ? skeletonRows
            : useInterviews.interviews
        "
        class="p-datatable-modern"
        dataKey="id"
        :rowHover="true"
      >
        <template #empty>
          <div
            class="text-center py-20 px-4"
          >
            <i
              class="pi pi-search text-4xl text-primary-200 mb-4"
            ></i>
            <p
              class="text-xl font-medium text-primary-900 mb-2"
            >
              У вас пока нет записей
            </p>
            <RouterLink
              :to="{ name: 'Home' }"
              class="text-primary-500 hover:text-primary-700 font-semibold decoration-2"
            >
              Создайте свое первое
              собеседование
            </RouterLink>
          </div>
        </template>

        <Column
          field="company"
          header="Компания"
          class="font-semibold text-primary-900"
        >
          <template #body="{ data }">
            <Skeleton
              v-if="isLoading"
              width="80%"
              height="1.2rem"
            />
            <span v-else>{{
              data.company
            }}</span>
          </template>
        </Column>

        <Column
          field="vacancyLink"
          header="Вакансия"
        >
          <template #body="{ data }">
            <Skeleton
              v-if="isLoading"
              width="90%"
              height="1rem"
            />
            <a
              v-else
              :href="data.vacancyLink"
              target="_blank"
              class="flex items-center text-primary-500 hover:text-primary-700 transition-colors"
            >
              <i
                class="pi pi-external-link mr-2 text-xs"
              ></i>
              <span
                class="truncate max-w-[200px]"
                >Перейти</span
              >
            </a>
          </template>
        </Column>

        <Column
          field="hrName"
          header="Контакт"
        >
          <template #body="{ data }">
            <Skeleton
              v-if="isLoading"
              width="70%"
              height="1rem"
            />
            <span
              v-else
              class="text-normal-gray"
              >{{ data.hrName }}</span
            >
          </template>
        </Column>

        <Column header="Связь">
          <template #body="{ data }">
            <div
              v-if="isLoading"
              class="flex gap-2"
            >
              <Skeleton
                shape="circle"
                size="2rem"
              />
              <Skeleton
                shape="circle"
                size="2rem"
              />
            </div>
            <div
              v-else
              class="flex gap-3 items-center"
            >
              <a
                v-if="
                  data.contactTelegram
                "
                :href="`https://t.me/${data.contactTelegram.replace('@', '')}`"
                target="_blank"
                class="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 border border-transparent hover:bg-[#0088cc]/10 text-[#0088cc]"
              >
                <i
                  class="pi pi-telegram"
                ></i>
              </a>
              <a
                v-if="
                  data.contactWhatsapp
                "
                :href="`https://wa.me/${data.contactWhatsapp}`"
                target="_blank"
                class="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 border border-transparent hover:bg-[#25d366]/10 text-[#25d366]"
              >
                <i
                  class="pi pi-whatsapp"
                ></i>
              </a>
              <a
                v-if="data.contactEmail"
                :href="`mailto:${data.contactEmail}`"
                class="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 border border-transparent hover:bg-primary-50 text-primary-500"
              >
                <i
                  class="pi pi-envelope"
                ></i>
              </a>
            </div>
          </template>
        </Column>

        <Column class="w-[120px]">
          <template #body="{ data }">
            <div
              class="flex gap-2 justify-end"
            >
              <RouterLink
                :to="`/interview/${data.id}`"
              >
                <Button
                  icon="pi pi-pencil"
                  class="w-9 h-9 p-0 border-none rounded-lg transition-all duration-200 text-primary-600 bg-primary-50 hover:bg-primary-100"
                />
              </RouterLink>
              <Button
                icon="pi pi-trash"
                @click="
                  showDeletePopup(
                    data.id,
                  )
                "
                class="w-9 h-9 p-0 border-none rounded-lg transition-all duration-200 text-red-600 bg-red-50 hover:bg-red-100"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppTitle from '@/components/ui/AppTitle.vue'
import { useInterviewStore } from '@/stores/interviews'

import Button from 'primevue/button'
import Column from 'primevue/column'
import ConfirmDialog from 'primevue/confirmdialog'
import DataTable from 'primevue/datatable'
import Skeleton from 'primevue/skeleton'
import { useConfirm } from 'primevue/useconfirm'
import { onMounted } from 'vue'

import { ref } from 'vue'

const useInterviews =
  useInterviewStore()

const confirm = useConfirm()

const isLoading = ref<boolean>(true)

const skeletonRows = Array.from(
  { length: 15 },
  () => ({}),
)

const showDeletePopup = (
  id: string,
) => {
  confirm.require({
    group: 'headless',
    header: 'Удаление отклика',
    message:
      'Вы уверены что хотите удалить этот отклик?',
    icon: 'pi pi-exclamation-triangle',

    accept: async () => {
      await useInterviews.deleteInterview(
        id,
      )
    },
  })
}

onMounted(async () => {
  isLoading.value = true

  await useInterviews.getAllInterviews()
  isLoading.value = false
})
</script>

<style scoped>
:deep(
  .p-datatable-modern
    .p-datatable-thead
    > tr
    > th
) {
  background-color: var(
    --color-neutral
  );
  color: var(--color-normal-gray);
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  padding: 1.25rem 1rem;
  border-bottom: 1px solid
    var(--color-primary-100);
}

:deep(
  .p-datatable-modern
    .p-datatable-tbody
    > tr
) {
  transition: background-color 0.2s;
}

:deep(
  .p-datatable-modern
    .p-datatable-tbody
    > tr
    > td
) {
  padding: 1.25rem 1rem;
  border-bottom: 1px solid
    var(--color-primary-50);
}

:deep(
  .p-datatable-modern
    .p-datatable-tbody
    > tr:hover
) {
  background-color: var(
    --color-primary-50
  ) !important;
}
</style>
