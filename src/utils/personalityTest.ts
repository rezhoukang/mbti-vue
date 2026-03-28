// 人格测试核心逻辑 - personalityTest.ts - 提供评分计算、结果查询和IndexedDB持久化
import { openDB } from 'idb'
import { classicPersonalityTest } from '@/utils/data/personalityTest'
import { personalityClassGroup } from '@/utils/data/personalityClassGroups'
import type {
  BinaryAnswerType,
  DimensionScores,
  GenderAnswerValue,
  PersonalityType,
  PersonalityClassGroup,
  ScaleAnswerValue,
  TestAnswerValue,
  TestMode,
  TestQuestion,
  TestResult,
} from '@/types/personality'

const DB_NAME = 'MBTI_PERSONALITY_TEST_APP_IDB'
const DB_VERSION = 1
const TEST_RESULT_STORE = 'TEST_RESULT_STORE'

async function getDb() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(TEST_RESULT_STORE)) {
        db.createObjectStore(TEST_RESULT_STORE, { keyPath: 'timestamp' })
      }
    },
  })
}

export function createEmptyDimensionScores(): DimensionScores {
  return { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }
}

function isBinaryAnswer(answer: TestAnswerValue | null): answer is BinaryAnswerType {
  return answer === 'A' || answer === 'B'
}

function isScaleAnswer(answer: TestAnswerValue | null): answer is ScaleAnswerValue {
  return typeof answer === 'number'
}

function isGenderAnswer(answer: TestAnswerValue | null): answer is GenderAnswerValue {
  return answer === 'male' || answer === 'female'
}

/** 根据题号和选项获取对应的维度得分 */
export function getQuestionAnswerScore(
  questionNumber: number,
  answerOption: BinaryAnswerType
): PersonalityType {
  const question = classicPersonalityTest.find((q) => q.no === questionNumber)

  if (!question) {
    throw new Error(`未找到经典题号 ${questionNumber}`)
  }

  const selected = question.answerOptions.find((opt) => opt.type === answerOption)

  if (!selected) {
    throw new Error(`题号 ${questionNumber} 未找到选项 ${answerOption}`)
  }

  return selected.score
}

export function getDimensionScoresFromTestScores(testScores: PersonalityType[]): DimensionScores {
  return testScores.reduce((acc, score) => {
    acc[score] += 1
    return acc
  }, createEmptyDimensionScores())
}

export function getDimensionScoresByTestResult(testResult: TestResult): DimensionScores {
  if (testResult.dimensionScores) {
    return {
      ...createEmptyDimensionScores(),
      ...testResult.dimensionScores,
    }
  }

  if (testResult.testScores?.length) {
    return getDimensionScoresFromTestScores(testResult.testScores)
  }

  return createEmptyDimensionScores()
}

function applyClassicAnswerScore(scores: DimensionScores, score: PersonalityType) {
  scores[score] += 1
}

function applyScaleAnswerScore(
  scores: DimensionScores,
  question: Extract<TestQuestion, { kind: 'scale' }>,
  answer: ScaleAnswerValue
) {
  if (answer < 0) {
    scores[question.leftType] += Math.abs(answer)
  }

  if (answer > 0) {
    scores[question.rightType] += answer
  }
}

export function buildTestResult(
  mode: TestMode,
  questions: TestQuestion[],
  answers: Array<TestAnswerValue | null>
): TestResult {
  const timestamp = Date.now()
  const testAnswers = answers.filter((answer): answer is TestAnswerValue => answer !== null)

  if (mode === 'classic') {
    const dimensionScores = createEmptyDimensionScores()
    const testScores = questions.flatMap((question, index) => {
      const answer = answers[index]
      if (question.kind !== 'choice' || !isBinaryAnswer(answer)) {
        return []
      }

      const score = getQuestionAnswerScore(question.no, answer)
      applyClassicAnswerScore(dimensionScores, score)
      return [score]
    })

    return {
      timestamp,
      mode,
      testAnswers,
      testScores,
      dimensionScores,
    }
  }

  const dimensionScores = createEmptyDimensionScores()
  let gender: GenderAnswerValue | undefined

  questions.forEach((question, index) => {
    const answer = answers[index]

    if (question.kind === 'scale' && isScaleAnswer(answer)) {
      applyScaleAnswerScore(dimensionScores, question, answer)
    }

    if (question.kind === 'gender' && isGenderAnswer(answer)) {
      gender = answer
    }
  })

  return {
    timestamp,
    mode,
    testAnswers,
    dimensionScores,
    gender,
  }
}

export function getPersonalityClassGroupByDimensionScores(
  dimensionScores: DimensionScores
): PersonalityClassGroup | undefined {
  const type = `${dimensionScores.E >= dimensionScores.I ? 'E' : 'I'}${dimensionScores.S >= dimensionScores.N ? 'S' : 'N'}${dimensionScores.T >= dimensionScores.F ? 'T' : 'F'}${dimensionScores.J >= dimensionScores.P ? 'J' : 'P'}`

  return personalityClassGroup.find((g) => g.type === type)
}

/** 根据所有维度得分汇总，计算最终4字母人格类型 */
export function getPersonalityClassGroupByTestScores(
  testScores: PersonalityType[]
): PersonalityClassGroup | undefined {
  return getPersonalityClassGroupByDimensionScores(getDimensionScoresFromTestScores(testScores))
}

export function getPersonalityClassGroupByTestResult(
  testResult: TestResult
): PersonalityClassGroup | undefined {
  return getPersonalityClassGroupByDimensionScores(getDimensionScoresByTestResult(testResult))
}

/** 保存测试结果到IndexedDB */
export async function saveTestResult(testResult: TestResult): Promise<IDBValidKey> {
  const db = await getDb()
  return db.put(TEST_RESULT_STORE, testResult)
}

/** 获取单个测试结果 */
export async function getSavedTestResult(id: number): Promise<TestResult | undefined> {
  const db = await getDb()
  return db.get(TEST_RESULT_STORE, id)
}

/** 获取所有历史测试结果 */
export async function getAllSavedTestResults(): Promise<TestResult[]> {
  const db = await getDb()
  return db.getAll(TEST_RESULT_STORE)
}
