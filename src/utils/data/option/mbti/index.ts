// MBTI 题库索引 - index.ts - 汇总经典题库与 93 题七级量表题库
import type { ScaleTestQuestion, TestMode, TestQuestion } from '@/types/personality'
import { classicPersonalityTest } from './classic'
import { eiScaleQuestions } from './ei'
import { snScaleQuestions } from './sn'
import { tfScaleQuestions } from './tf'
import { jpScaleQuestions } from './jp'
import { genderQuestion } from './gender'

const scaleQuestions: ScaleTestQuestion[] = [
  ...eiScaleQuestions,
  ...snScaleQuestions,
  ...tfScaleQuestions,
  ...jpScaleQuestions,
].map((question, index) => ({
  ...question,
  no: index + 1,
}))

export const spectrumPersonalityTest: TestQuestion[] = [
  ...scaleQuestions,
  {
    ...genderQuestion,
    no: scaleQuestions.length + 1,
  },
]

export function getQuestionBankByMode(mode: TestMode): TestQuestion[] {
  return mode === 'scale' ? spectrumPersonalityTest : classicPersonalityTest
}

export { classicPersonalityTest }
