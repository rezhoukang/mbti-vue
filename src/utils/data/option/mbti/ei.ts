// EI 量表题库 - ei.ts - 外向与内向维度的 23 道七级量表题
import type { ScaleTestQuestion } from '@/types/personality'

export const eiScaleQuestions: Array<Omit<ScaleTestQuestion, 'no'>> = [
  { kind: 'scale', dimension: 'EI', leftType: 'E', rightType: 'I', question: '我常常在与很多人互动后更有精神。' },
  { kind: 'scale', dimension: 'EI', leftType: 'E', rightType: 'I', question: '进入陌生社交场合时，我通常会主动开启话题。' },
  { kind: 'scale', dimension: 'EI', leftType: 'E', rightType: 'I', question: '遇到有趣的事时，我第一反应是立刻找人分享。' },
  { kind: 'scale', dimension: 'EI', leftType: 'E', rightType: 'I', question: '我喜欢通过聊天把想法说出来，而不是先独自想很久。' },
  { kind: 'scale', dimension: 'EI', leftType: 'E', rightType: 'I', question: '团队讨论通常会激发我的状态和效率。' },
  { kind: 'scale', dimension: 'EI', leftType: 'E', rightType: 'I', question: '在人多热闹的环境里，我往往能更快进入状态。' },
  { kind: 'scale', dimension: 'EI', leftType: 'E', rightType: 'I', question: '我愿意把自己的想法直接说给现场的人听。' },
  { kind: 'scale', dimension: 'EI', leftType: 'E', rightType: 'I', question: '开会或上课时，我比较容易即兴发言。' },
  { kind: 'scale', dimension: 'EI', leftType: 'E', rightType: 'I', question: '比起独处，我更容易从外部互动中恢复精力。' },
  { kind: 'scale', dimension: 'EI', leftType: 'E', rightType: 'I', question: '我认识新朋友时通常不会太拘谨。' },
  { kind: 'scale', dimension: 'EI', leftType: 'E', rightType: 'I', question: '当气氛冷下来时，我会自然地想把场子带热。' },
  { kind: 'scale', dimension: 'EI', leftType: 'E', rightType: 'I', question: '长时间一个人待着会让我明显觉得闷。' },
  { kind: 'scale', dimension: 'EI', leftType: 'E', rightType: 'I', question: '在群体里，我通常更愿意让别人知道我在想什么。' },
  { kind: 'scale', dimension: 'EI', leftType: 'E', rightType: 'I', question: '有问题时，我更愿意先找人讨论再整理结论。' },
  { kind: 'scale', dimension: 'EI', leftType: 'E', rightType: 'I', question: '比起文字沟通，我通常更偏好当面或语音交流。' },
  { kind: 'scale', dimension: 'EI', leftType: 'E', rightType: 'I', question: '我不太介意自己的生活节奏被各种邀约打断。' },
  { kind: 'scale', dimension: 'EI', leftType: 'E', rightType: 'I', question: '参加聚会时，我往往会认识比预期更多的人。' },
  { kind: 'scale', dimension: 'EI', leftType: 'E', rightType: 'I', question: '我做决定时，外界反馈通常会给我很大帮助。' },
  { kind: 'scale', dimension: 'EI', leftType: 'E', rightType: 'I', question: '即使是不熟悉的圈子，我通常也能较快融入其中。' },
  { kind: 'scale', dimension: 'EI', leftType: 'E', rightType: 'I', question: '需要表达观点时，我通常不会等别人先点名我。' },
  { kind: 'scale', dimension: 'EI', leftType: 'E', rightType: 'I', question: '热闹的合作环境会让我觉得更有干劲。' },
  { kind: 'scale', dimension: 'EI', leftType: 'E', rightType: 'I', question: '连续几天安排满社交活动时，我通常也能适应得不错。' },
  { kind: 'scale', dimension: 'EI', leftType: 'E', rightType: 'I', question: '我更愿意把思考过程说出来，而不是完全藏在心里。' },
]
