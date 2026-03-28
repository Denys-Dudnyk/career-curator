import { db } from '@/firebase/firebase'
import type { IInterview } from '@/interfaces/interview'
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { computed, ref } from 'vue'

import { useUserStore } from './user'

export const useInterviewStore =
  defineStore('interviews', () => {
    const userStore = useUserStore()
    const userId = computed(
      () => userStore.userId,
    )

    const interviews = ref<
      IInterview[]
    >([])

    const addNewInterview = async (
      formData: Omit<
        IInterview,
        'id' | 'createdAt'
      >,
    ) => {
      const payload: IInterview = {
        ...formData,
        id: uuidv4(),
        createdAt: String(Date.now()),
      }
      console.log(payload)

      if (userId.value) {
        await setDoc(
          doc(
            db,
            `users/${userId.value}/interviews`,
            payload.id,
          ),
          payload,
        )

        interviews.value.push(payload)
      }
    }

    const getAllInterviews =
      async () => {
        const getData = query(
          collection(
            db,
            `users/${userId.value}/interviews`,
          ),
          orderBy('createdAt', 'desc'),
        )

        const data =
          await getDocs(getData)

        interviews.value =
          data.docs.map(
            (doc) =>
              doc.data() as IInterview,
          )
      }

    const deleteInterview = async (
      id: string,
    ) => {
      await deleteDoc(
        doc(
          db,
          `users/${userId.value}/interviews`,
          id,
        ),
      )
      const index =
        interviews.value.findIndex(
          (interview) =>
            interview.id === id,
        )

      if (index !== -1) {
        interviews.value.splice(
          index,
          1,
        )
      }
    }

    return {
      addNewInterview,
      interviews,
      getAllInterviews,
      deleteInterview,
    }
  })
