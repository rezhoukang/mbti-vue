// 人格测试类型定义 - personality.ts - 定义MBTI测试题目、选项、人格类型、测试结果等核心类型
export type PersonalityType = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'P' | 'J'
export type PersonalityDimension = 'EI' | 'SN' | 'TF' | 'JP'
export type TestMode = 'classic' | 'scale'
export type BinaryAnswerType = 'A' | 'B'
export type ScaleAnswerValue = -3 | -2 | -1 | 0 | 1 | 2 | 3
export type GenderAnswerValue = 'male' | 'female'
export type TestAnswerValue = BinaryAnswerType | ScaleAnswerValue | GenderAnswerValue

type Extroverted = 'E'
type Introverted = 'I'
type Sensing = 'S'
type Intuitive = 'N'
type Thinking = 'T'
type Feeling = 'F'
type Perceiving = 'P'
type Judging = 'J'

export interface TestAnswerOption {
  type: BinaryAnswerType
  answer: string
  score: PersonalityType
}

export interface ClassicTestQuestion {
  no: number
  kind: 'choice'
  question: string
  answerOptions: TestAnswerOption[]
}

export interface ScaleTestQuestion {
  no: number
  kind: 'scale'
  question: string
  dimension: PersonalityDimension
  leftType: PersonalityType
  rightType: PersonalityType
}

export interface GenderTestOption {
  value: GenderAnswerValue
  label: string
}

export interface GenderTestQuestion {
  no: number
  kind: 'gender'
  question: string
  answerOptions: GenderTestOption[]
}

export type TestQuestion = ClassicTestQuestion | ScaleTestQuestion | GenderTestQuestion

export interface PersonalityClass {
  type: PersonalityType
  description: string
}

export interface PersonalityClassGroup {
  type: `${Extroverted | Introverted}${Sensing | Intuitive}${Thinking | Feeling}${Perceiving | Judging}`
  name: string
  nameDescription: string
  epithet: string
  description: string
  jungianFunctionalPreference: {
    dominant: string
    auxiliary: string
    tertiary: string
    inferior: string
  }
  generalTraits: string[]
  relationshipStrengths: string[]
  relationshipWeaknesses: string[]
  successDefinition: string
  strengths: string[]
  gifts: string[]
  potentialProblemAreas: string[]
  explanationOfProblems: string
  solutions: string
  livingHappilyTips: string
  suggestions?: string[]
  tenRulesToLive: string[]
}

export interface DimensionScores {
  E: number
  I: number
  S: number
  N: number
  T: number
  F: number
  J: number
  P: number
}

export interface TestResult {
  timestamp: number
  mode?: TestMode
  testAnswers: TestAnswerValue[]
  testScores?: PersonalityType[]
  dimensionScores?: DimensionScores
  gender?: GenderAnswerValue
}
