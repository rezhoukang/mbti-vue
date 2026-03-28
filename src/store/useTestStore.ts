// 用户测试答案状态 - useTestStore.ts - 管理测试过程中的用户选择和测试状态
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { TestAnswerValue, TestMode } from '@/types/personality'
import { getQuestionBankByMode } from '@/utils/data/personalityTest'

export const useTestStore = defineStore('test', () => {
  /** 当前测试模式 */
  const mode = ref<TestMode>('classic')

  /** 当前题目索引 */
  const currentIndex = ref(0)

  /** 是否显示测试说明 */
  const showInstructions = ref(true)

  /** 当前模式题库 */
  const questionBank = computed(() => getQuestionBankByMode(mode.value))

  /** 用户选择的答案（按题号索引） */
  const userAnswers = ref<Array<TestAnswerValue | null>>(createEmptyAnswers())

  /** 总题数 */
  const totalQuestions = computed(() => questionBank.value.length)

  /** 已回答题数 */
  const answeredCount = computed(() =>
    userAnswers.value.filter((a) => a !== null).length
  )

  /** 进度百分比 */
  const progress = computed(() =>
    Math.round((answeredCount.value / totalQuestions.value) * 100)
  )

  /** 是否全部答完 */
  const isComplete = computed(() => answeredCount.value === totalQuestions.value)

  /** 当前题目数据 */
  const currentQuestion = computed(() => questionBank.value[currentIndex.value])

  function createEmptyAnswers(targetMode: TestMode = mode.value) {
    return new Array(getQuestionBankByMode(targetMode).length).fill(null) as Array<TestAnswerValue | null>
  }

  function setMode(nextMode: TestMode) {
    mode.value = nextMode
    userAnswers.value = createEmptyAnswers(nextMode)
    currentIndex.value = 0
    showInstructions.value = true
  }

  function setAnswer(index: number, answer: TestAnswerValue) {
    userAnswers.value[index] = answer
  }

  function goNext() {
    if (currentIndex.value < totalQuestions.value - 1) {
      currentIndex.value++
    }
  }

  function goPrev() {
    if (currentIndex.value > 0) {
      currentIndex.value--
    }
  }

  function dismissInstructions() {
    showInstructions.value = false
  }

  function reset(nextMode: TestMode = mode.value) {
    mode.value = nextMode
    userAnswers.value = createEmptyAnswers(nextMode)
    currentIndex.value = 0
    showInstructions.value = true
  }

  return {
    mode,
    userAnswers,
    currentIndex,
    showInstructions,
    questionBank,
    totalQuestions,
    answeredCount,
    progress,
    isComplete,
    currentQuestion,
    setMode,
    setAnswer,
    goNext,
    goPrev,
    dismissInstructions,
    reset,
  }
})
