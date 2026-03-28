// JP 量表题库 - jp.ts - 判断与知觉维度的 23 道七级量表题
import type { ScaleTestQuestion } from '@/types/personality'

export const jpScaleQuestions: Array<Omit<ScaleTestQuestion, 'no'>> = [
  { kind: 'scale', dimension: 'JP', leftType: 'J', rightType: 'P', question: '我喜欢在开始之前就把计划排好。' },
  { kind: 'scale', dimension: 'JP', leftType: 'J', rightType: 'P', question: '任务一旦明确，我会希望尽快推进到完成。' },
  { kind: 'scale', dimension: 'JP', leftType: 'J', rightType: 'P', question: '行程被临时打乱时，我通常会明显不舒服。' },
  { kind: 'scale', dimension: 'JP', leftType: 'J', rightType: 'P', question: '我做事前习惯先设定优先级。' },
  { kind: 'scale', dimension: 'JP', leftType: 'J', rightType: 'P', question: '看到待办清单被一项项划掉会让我很满足。' },
  { kind: 'scale', dimension: 'JP', leftType: 'J', rightType: 'P', question: '我倾向于提前到场，而不是踩点。' },
  { kind: 'scale', dimension: 'JP', leftType: 'J', rightType: 'P', question: '我喜欢事情有明确截止时间和结果。' },
  { kind: 'scale', dimension: 'JP', leftType: 'J', rightType: 'P', question: '对我来说，先定方案再行动会更安心。' },
  { kind: 'scale', dimension: 'JP', leftType: 'J', rightType: 'P', question: '我通常会把文件、物品或资料整理得比较清楚。' },
  { kind: 'scale', dimension: 'JP', leftType: 'J', rightType: 'P', question: '比起保留太多可能，我更想先做出决定。' },
  { kind: 'scale', dimension: 'JP', leftType: 'J', rightType: 'P', question: '我不太喜欢长期悬而未决的状态。' },
  { kind: 'scale', dimension: 'JP', leftType: 'J', rightType: 'P', question: '完成一件事后，我才真正能放松下来。' },
  { kind: 'scale', dimension: 'JP', leftType: 'J', rightType: 'P', question: '我喜欢知道接下来几天大概要做什么。' },
  { kind: 'scale', dimension: 'JP', leftType: 'J', rightType: 'P', question: '与其边做边改，我更偏好先规划再执行。' },
  { kind: 'scale', dimension: 'JP', leftType: 'J', rightType: 'P', question: '我通常会比要求时间更早开始准备。' },
  { kind: 'scale', dimension: 'JP', leftType: 'J', rightType: 'P', question: '如果别人反复改主意，我会觉得推进很慢。' },
  { kind: 'scale', dimension: 'JP', leftType: 'J', rightType: 'P', question: '我做决定后，通常不喜欢再回头反复比较。' },
  { kind: 'scale', dimension: 'JP', leftType: 'J', rightType: 'P', question: '收尾和归档这类事情我会主动处理。' },
  { kind: 'scale', dimension: 'JP', leftType: 'J', rightType: 'P', question: '我更喜欢有结构的节奏，而不是完全随兴。' },
  { kind: 'scale', dimension: 'JP', leftType: 'J', rightType: 'P', question: '旅行时，我倾向于先查好路线和安排。' },
  { kind: 'scale', dimension: 'JP', leftType: 'J', rightType: 'P', question: '我会优先完成重要事项，再考虑临时兴趣。' },
  { kind: 'scale', dimension: 'JP', leftType: 'J', rightType: 'P', question: '事情有结论时，我比开放式状态更轻松。' },
  { kind: 'scale', dimension: 'JP', leftType: 'J', rightType: 'P', question: '我希望合作对象也能给出明确反馈和时间点。' },
]
