// 性别动画题 - gender.ts - 最后一题用于交互动效展示，不参与人格分析
import type { GenderTestQuestion } from '@/types/personality'

export const genderQuestion: Omit<GenderTestQuestion, 'no'> = {
  kind: 'gender',
  question: '你的性别是？',
  answerOptions: [
    { value: 'male', label: '男' },
    { value: 'female', label: '女' },
  ],
}
