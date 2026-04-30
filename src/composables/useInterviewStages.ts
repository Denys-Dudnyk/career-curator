import type { IInterview } from '@/interfaces/interview'
import dayjs from 'dayjs'
import type { Ref } from 'vue'

export const useInterviewStages = (
  interview: Ref<IInterview | null>,
) => {
  const addStage = () => {
    if (interview.value) {
      if (!interview.value.stages) {
        interview.value.stages = []
      }

      interview.value.stages?.push({
        id: Date.now(),
        name: '',
        date: null,
        description: '',
      })
    }
  }

  const removeStage = (
    index: number,
  ) => {
    if (interview.value?.stages) {
      interview.value?.stages.splice(
        index,
        1,
      )
    }
  }

  const formatStageDate = (
    index: number,
  ) => {
    if (
      interview.value?.stages &&
      interview.value.stages.length
    ) {
      const stage =
        interview.value.stages[index]
      if (stage && stage.date) {
        stage.date = dayjs(
          stage.date,
        ).format('DD.MM.YYYY')
      }
    }
  }

  return {
    addStage,
    removeStage,
    formatStageDate,
  }
}
