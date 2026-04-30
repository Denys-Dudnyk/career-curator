import { db } from '@/firebase/firebase'
import type { IInterview } from '@/interfaces/interview'
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
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

    const getDocRef = (id: string) => {
      if (!userId.value)
        throw new Error(
          'User not authenticated',
        )
      return doc(
        db,
        `users/${userId.value}/interviews`,
        id,
      )
    }

    const getColRef = () => {
      if (!userId.value)
        throw new Error(
          'User not authenticated',
        )
      return collection(
        db,
        `users/${userId.value}/interviews`,
      )
    }

    const addNewInterview = async (
      formData: Omit<
        IInterview,
        'id' | 'createdAt'
      >,
    ) => {
      try {
        const payload: IInterview = {
          ...formData,
          id: uuidv4(),
          createdAt: String(Date.now()),
        }
        console.log(payload)

        if (userId.value) {
          await setDoc(
            getDocRef(payload.id),
            payload,
          )

          interviews.value.push(payload)
        }
      } catch (error) {
        console.error(
          'Error adding interview:',
          error,
        )
      }
    }

    const getAllInterviews =
      async () => {
        try {
          const getData = query(
            getColRef(),
            orderBy(
              'createdAt',
              'desc',
            ),
          )

          const data =
            await getDocs(getData)

          interviews.value =
            data.docs.map(
              (doc) =>
                doc.data() as IInterview,
            )
        } catch (error) {
          console.error(
            'Error getting interviews:',
            error,
          )
        }
      }

    const deleteInterview = async (
      id: string,
    ) => {
      try {
        await deleteDoc(getDocRef(id))
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
      } catch (error) {
        console.error(
          'Error deleting interview:',
          error,
        )
      }
    }

    const getInterviewById = async (
      id: string,
    ) => {
      try {
        const docSnap = await getDoc(
          getDocRef(id),
        )

        if (!docSnap.exists()) {
          console.error(
            'Интервью не найдено в базе данных',
          )

          return null
        }

        const interviewData =
          docSnap.data() as IInterview

        const index =
          interviews.value.findIndex(
            (interview) =>
              interview.id === id,
          )

        if (index !== -1) {
          interviews.value[index] =
            interviewData
        }

        return interviewData
      } catch (error) {
        console.error(
          'Error fetching interview:',
          error,
        )
        return null
      }
    }

    const saveInterview = async (
      interview: IInterview,
    ): Promise<void> => {
      try {
        await updateDoc(
          getDocRef(interview.id),
          {
            ...interview,
          },
        )

        const index =
          interviews.value.findIndex(
            (i) =>
              i.id === interview.id,
          )

        if (index !== -1) {
          interviews.value[index] = {
            ...interview,
          }
        }
      } catch (error) {
        console.log(
          'Error updating interview:',
          error,
        )
      }
    }

    return {
      addNewInterview,
      interviews,
      getAllInterviews,
      deleteInterview,
      getInterviewById,
      saveInterview,
    }
  })
