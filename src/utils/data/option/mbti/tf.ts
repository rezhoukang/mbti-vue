// TF 量表题库 - tf.ts - 思考与情感维度的 23 道七级量表题
import type { ScaleTestQuestion } from '@/types/personality'

export const tfScaleQuestions: Array<Omit<ScaleTestQuestion, 'no'>> = [
  { kind: 'scale', dimension: 'TF', leftType: 'T', rightType: 'F', question: '做决定时，我通常先看逻辑是否站得住脚。' },
  { kind: 'scale', dimension: 'TF', leftType: 'T', rightType: 'F', question: '即使关系亲近，我也会指出不合理的地方。' },
  { kind: 'scale', dimension: 'TF', leftType: 'T', rightType: 'F', question: '我认为公平的规则比照顾个别情绪更重要。' },
  { kind: 'scale', dimension: 'TF', leftType: 'T', rightType: 'F', question: '讨论问题时，我更在意结论是否准确。' },
  { kind: 'scale', dimension: 'TF', leftType: 'T', rightType: 'F', question: '我习惯先分析利弊，再考虑感受层面。' },
  { kind: 'scale', dimension: 'TF', leftType: 'T', rightType: 'F', question: '当别人向我求建议时，我更倾向于给出有效方案。' },
  { kind: 'scale', dimension: 'TF', leftType: 'T', rightType: 'F', question: '如果事实和情绪冲突，我通常会优先相信事实。' },
  { kind: 'scale', dimension: 'TF', leftType: 'T', rightType: 'F', question: '我欣赏能清楚表达观点并自圆其说的人。' },
  { kind: 'scale', dimension: 'TF', leftType: 'T', rightType: 'F', question: '在团队里，我愿意扮演提出质疑的角色。' },
  { kind: 'scale', dimension: 'TF', leftType: 'T', rightType: 'F', question: '我不太会因为场面尴尬就放弃一个正确判断。' },
  { kind: 'scale', dimension: 'TF', leftType: 'T', rightType: 'F', question: '我更容易被有依据的论证说服。' },
  { kind: 'scale', dimension: 'TF', leftType: 'T', rightType: 'F', question: '评价一件事时，我会尽量把个人好恶放在后面。' },
  { kind: 'scale', dimension: 'TF', leftType: 'T', rightType: 'F', question: '为了长远结果，短期的难听真话也是必要的。' },
  { kind: 'scale', dimension: 'TF', leftType: 'T', rightType: 'F', question: '我觉得“讲道理”本身就是一种尊重。' },
  { kind: 'scale', dimension: 'TF', leftType: 'T', rightType: 'F', question: '遇到分歧时，我更关注问题本身而不是语气。' },
  { kind: 'scale', dimension: 'TF', leftType: 'T', rightType: 'F', question: '如果方案更高效，我愿意调整原有习惯。' },
  { kind: 'scale', dimension: 'TF', leftType: 'T', rightType: 'F', question: '我更认同把标准统一后再执行。' },
  { kind: 'scale', dimension: 'TF', leftType: 'T', rightType: 'F', question: '我不喜欢因为顾及面子而模糊事实。' },
  { kind: 'scale', dimension: 'TF', leftType: 'T', rightType: 'F', question: '在冲突中，我通常先判断谁的观点更合理。' },
  { kind: 'scale', dimension: 'TF', leftType: 'T', rightType: 'F', question: '对我来说，是否有效往往比是否温柔更关键。' },
  { kind: 'scale', dimension: 'TF', leftType: 'T', rightType: 'F', question: '我更相信理性梳理能解决大部分问题。' },
  { kind: 'scale', dimension: 'TF', leftType: 'T', rightType: 'F', question: '我习惯把复杂情境拆解成原因与结果。' },
  { kind: 'scale', dimension: 'TF', leftType: 'T', rightType: 'F', question: '我希望别人给我的反馈直接、清楚、不绕弯。' },
]
