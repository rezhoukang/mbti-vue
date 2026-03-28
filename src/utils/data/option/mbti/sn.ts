// SN 量表题库 - sn.ts - 感觉与直觉维度的 23 道七级量表题
import type { ScaleTestQuestion } from '@/types/personality'

export const snScaleQuestions: Array<Omit<ScaleTestQuestion, 'no'>> = [
  { kind: 'scale', dimension: 'SN', leftType: 'S', rightType: 'N', question: '我更信赖亲眼看到、亲手验证过的事实。' },
  { kind: 'scale', dimension: 'SN', leftType: 'S', rightType: 'N', question: '开始一件事前，我更关注具体步骤而不是远景设想。' },
  { kind: 'scale', dimension: 'SN', leftType: 'S', rightType: 'N', question: '我通常先注意眼前发生了什么，而不是它可能意味着什么。' },
  { kind: 'scale', dimension: 'SN', leftType: 'S', rightType: 'N', question: '面对说明书或规则时，我喜欢按现成方法来。' },
  { kind: 'scale', dimension: 'SN', leftType: 'S', rightType: 'N', question: '我觉得可靠的经验比灵光一现更值得依赖。' },
  { kind: 'scale', dimension: 'SN', leftType: 'S', rightType: 'N', question: '做决定时，细节是否清楚对我很重要。' },
  { kind: 'scale', dimension: 'SN', leftType: 'S', rightType: 'N', question: '我更容易记住真实发生过的情境，而不是抽象概念。' },
  { kind: 'scale', dimension: 'SN', leftType: 'S', rightType: 'N', question: '比起谈趋势，我更喜欢讨论可落地的做法。' },
  { kind: 'scale', dimension: 'SN', leftType: 'S', rightType: 'N', question: '新点子如果没有实际依据，我通常会先保持谨慎。' },
  { kind: 'scale', dimension: 'SN', leftType: 'S', rightType: 'N', question: '我倾向于从已知事实出发，逐步推进判断。' },
  { kind: 'scale', dimension: 'SN', leftType: 'S', rightType: 'N', question: '与其猜测未来可能性，我更愿意先解决当下问题。' },
  { kind: 'scale', dimension: 'SN', leftType: 'S', rightType: 'N', question: '我关注一件事时，常先看它的用途和结果。' },
  { kind: 'scale', dimension: 'SN', leftType: 'S', rightType: 'N', question: '相比“为什么如此”，我更常先问“具体怎么做”。' },
  { kind: 'scale', dimension: 'SN', leftType: 'S', rightType: 'N', question: '我认为稳定执行比灵感跳跃更可靠。' },
  { kind: 'scale', dimension: 'SN', leftType: 'S', rightType: 'N', question: '我处理信息时，通常先看明确证据。' },
  { kind: 'scale', dimension: 'SN', leftType: 'S', rightType: 'N', question: '我更喜欢讲清楚现实情况，而不是展开想象空间。' },
  { kind: 'scale', dimension: 'SN', leftType: 'S', rightType: 'N', question: '当别人说得太抽象时，我会希望回到具体例子。' },
  { kind: 'scale', dimension: 'SN', leftType: 'S', rightType: 'N', question: '我对熟悉的方法有天然信任感。' },
  { kind: 'scale', dimension: 'SN', leftType: 'S', rightType: 'N', question: '我更擅长把复杂事情拆成可执行的小步骤。' },
  { kind: 'scale', dimension: 'SN', leftType: 'S', rightType: 'N', question: '我买东西时，往往先看实用性和耐用性。' },
  { kind: 'scale', dimension: 'SN', leftType: 'S', rightType: 'N', question: '我常根据已经发生过的经验来判断下一步。' },
  { kind: 'scale', dimension: 'SN', leftType: 'S', rightType: 'N', question: '对我来说，脚踏实地比天马行空更有安全感。' },
  { kind: 'scale', dimension: 'SN', leftType: 'S', rightType: 'N', question: '我更愿意先把现有资源用好，再考虑新的可能。' },
]
