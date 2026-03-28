<!-- 答题组件 - TestQuestion.vue - 支持经典二选一、七级量表和性别动画题的统一答题组件 -->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTestStore } from '@/store/useTestStore'
import { buildTestResult, saveTestResult } from '@/utils/personalityTest'
import type { GenderAnswerValue, ScaleAnswerValue, TestAnswerValue } from '@/types/personality'
import TestProgress from '@/components/TestProgress.vue'

const router = useRouter()
const testStore = useTestStore()
const isTransitioning = ref(false)

const scaleOptions: Array<{
  value: ScaleAnswerValue
  tone: 'agree' | 'neutral' | 'disagree'
  size: 'lg' | 'md' | 'sm'
}> = [
  { value: -3, tone: 'agree', size: 'lg' },
  { value: -2, tone: 'agree', size: 'md' },
  { value: -1, tone: 'agree', size: 'sm' },
  { value: 0, tone: 'neutral', size: 'sm' },
  { value: 1, tone: 'disagree', size: 'sm' },
  { value: 2, tone: 'disagree', size: 'md' },
  { value: 3, tone: 'disagree', size: 'lg' },
]

const currentQuestion = computed(() => testStore.currentQuestion)
const currentAnswer = computed(() => testStore.userAnswers[testStore.currentIndex])
const isLastQuestion = computed(() => testStore.currentIndex === testStore.totalQuestions - 1)
const answeredCurrent = computed(() => currentAnswer.value !== null)
const modeLabel = computed(() => (testStore.mode === 'scale' ? '七级量表' : '经典模式'))

const choiceQuestion = computed(() =>
  currentQuestion.value.kind === 'choice' ? currentQuestion.value : null
)

const scaleQuestion = computed(() =>
  currentQuestion.value.kind === 'scale' ? currentQuestion.value : null
)

const genderQuestion = computed(() =>
  currentQuestion.value.kind === 'gender' ? currentQuestion.value : null
)

function queueNext() {
  if (isLastQuestion.value) {
    return
  }

  isTransitioning.value = true
  window.setTimeout(() => {
    testStore.goNext()
    isTransitioning.value = false
  }, 280)
}

function selectAnswer(answer: TestAnswerValue) {
  if (isTransitioning.value) {
    return
  }

  testStore.setAnswer(testStore.currentIndex, answer)
  queueNext()
}

function selectGender(answer: GenderAnswerValue) {
  selectAnswer(answer)
}

async function submitTest() {
  const result = buildTestResult(testStore.mode, testStore.questionBank, testStore.userAnswers)

  await saveTestResult(result)
  testStore.reset(testStore.mode)
  router.push({ path: '/test/result', query: { testResultId: String(result.timestamp) } })
}
</script>

<template>
  <div class="question-wrapper">
    <TestProgress
      :progress="testStore.progress"
      :current="testStore.currentIndex + 1"
      :total="testStore.totalQuestions"
    />

    <div class="question-card card" :class="[`question-card--${currentQuestion.kind}`]">
      <div class="question-header">
        <div class="question-meta">
          <span class="question-badge">{{ modeLabel }}</span>
          <span class="question-number">Q{{ testStore.currentIndex + 1 }} / {{ testStore.totalQuestions }}</span>
        </div>
      </div>

      <h2 class="question-text">{{ currentQuestion.question }}</h2>

      <p v-if="scaleQuestion" class="question-tip">
        左侧绿色圆点代表更认同这句描述，右侧紫色圆点代表更不认同。
      </p>

      <div v-if="choiceQuestion" class="options">
        <button
          v-for="option in choiceQuestion.answerOptions"
          :key="option.type"
          class="option-btn"
          :class="{
            selected: currentAnswer === option.type,
            locked: isTransitioning,
          }"
          :disabled="isTransitioning"
          @click="selectAnswer(option.type)"
        >
          <span class="option-label">{{ option.type }}</span>
          <span class="option-text">{{ option.answer }}</span>
          <span class="option-check">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </button>
      </div>

      <div v-else-if="scaleQuestion" class="scale-panel">
        <div class="scale-meta">
          <span class="scale-side scale-side--agree">认同</span>
          <span class="scale-side scale-side--disagree">不认同</span>
        </div>

        <div class="scale-options">
          <button
            v-for="option in scaleOptions"
            :key="option.value"
            class="scale-dot"
            :class="[
              `scale-dot--${option.tone}`,
              `scale-dot--${option.size}`,
              { selected: currentAnswer === option.value, locked: isTransitioning },
            ]"
            :disabled="isTransitioning"
            @click="selectAnswer(option.value)"
            :title="option.tone === 'agree' ? '认同' : option.tone === 'disagree' ? '不认同' : '中立'"
          >
            <span class="scale-dot-core"></span>
          </button>
        </div>
      </div>

      <div v-else-if="genderQuestion" class="gender-panel">
        <div class="gender-options">
          <button
            v-for="option in genderQuestion.answerOptions"
            :key="option.value"
            class="gender-card"
            :class="[
              `gender-card--${option.value}`,
              { selected: currentAnswer === option.value, locked: isTransitioning },
            ]"
            :disabled="isTransitioning"
            @click="selectGender(option.value)"
          >
            <span class="gender-icon">{{ option.value === 'male' ? '♂' : '♀' }}</span>
            <span class="gender-text">{{ option.label }}</span>
          </button>
        </div>
      </div>
    </div>

    <div class="nav-buttons">
      <button
        class="btn btn-outline"
        :disabled="testStore.currentIndex === 0 || isTransitioning"
        @click="testStore.goPrev"
      >
        上一题
      </button>

      <button
        v-if="!isLastQuestion"
        class="btn btn-primary"
        :disabled="!answeredCurrent || isTransitioning"
        @click="testStore.goNext"
      >
        下一题
      </button>

      <button
        v-else
        class="btn btn-primary"
        :disabled="!testStore.isComplete || isTransitioning"
        @click="submitTest"
      >
        查看结果
      </button>
    </div>
  </div>
</template>

<style scoped>
.question-wrapper {
  width: 640px;
  flex-shrink: 0;
}

.question-card {
  margin-bottom: 20px;
  min-height: 420px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.question-card--choice {
  min-height: 340px;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.question-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.question-badge {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-primary);
  background: var(--color-primary-bg);
  padding: 4px 12px;
  border-radius: 999px;
}

.question-number {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
}

.question-text {
  font-size: 1.18rem;
  margin-bottom: 14px;
  line-height: 1.7;
  min-height: 84px;
  color: var(--color-text);
}

.question-tip {
  color: var(--color-text-secondary);
  font-size: 0.88rem;
  margin-bottom: 18px;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  min-height: 0;
}

.option-btn {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0 20px;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: white;
  text-align: left;
  font-size: 0.95rem;
  flex: 1;
  min-height: 0;
  position: relative;
  transition: all 0.35s ease;
}

.option-btn.selected {
  border-color: var(--color-primary);
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: white;
  box-shadow: 0 8px 18px var(--gradient-btn-shadow);
  transform: scale(1.01);
}

.option-btn.locked,
.scale-dot.locked,
.gender-card.locked {
  pointer-events: none;
}

.option-label {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--color-bg);
  font-weight: 700;
  flex-shrink: 0;
  font-size: 0.9rem;
}

.option-btn.selected .option-label {
  background: rgba(255, 255, 255, 0.18);
}

.option-text {
  line-height: 1.5;
  flex: 1;
}

.option-check {
  opacity: 0;
  transform: scale(0);
  transition: all 0.25s ease;
  flex-shrink: 0;
}

.option-btn.selected .option-check {
  opacity: 1;
  transform: scale(1);
}

.scale-panel {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
}

.scale-meta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 12px;
  font-size: 0.9rem;
  font-weight: 600;
}

.scale-side--agree {
  color: #3cb878;
}

.scale-side--disagree {
  color: #8b61eb;
  text-align: right;
}

.scale-options {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 10px;
  align-items: end;
}

.scale-dot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  background: transparent;
  transition: transform var(--transition);
}

.scale-dot-core {
  display: block;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 2px solid currentColor;
  background: white;
  transition: transform var(--transition), background var(--transition), box-shadow var(--transition);
}

.scale-dot--lg .scale-dot-core {
  width: 54px;
  height: 54px;
}

.scale-dot--md .scale-dot-core {
  width: 46px;
  height: 46px;
}

.scale-dot--sm .scale-dot-core {
  width: 38px;
  height: 38px;
}

.scale-dot--agree {
  color: #41b97c;
}

.scale-dot--disagree {
  color: #8d65f0;
}

.scale-dot--neutral {
  color: #b5bcc9;
}

.scale-dot.selected {
  transform: translateY(-4px);
}

.scale-dot.selected .scale-dot-core {
  background: currentColor;
  box-shadow: 0 10px 24px rgba(49, 64, 100, 0.18);
}

.gender-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  gap: 18px;
}

.gender-options {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.gender-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 28px 20px;
  border-radius: 22px;
  border: 1px solid var(--color-border);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.9));
  transition: transform var(--transition), border-color var(--transition), box-shadow var(--transition);
}

.gender-card--male {
  --gender-accent: #5b7ff6;
}

.gender-card--female {
  --gender-accent: #ef7eb8;
}

.gender-card.selected {
  border-color: var(--gender-accent);
  box-shadow: 0 14px 28px color-mix(in srgb, var(--gender-accent) 18%, transparent);
  transform: translateY(-6px) scale(1.01);
}

.gender-icon {
  font-size: 2rem;
  color: var(--gender-accent);
  font-weight: 700;
}

.gender-text {
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--color-text);
}

.nav-buttons {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.nav-buttons .btn {
  flex: 1;
}

@media (max-width: 640px) {
  .question-wrapper {
    width: calc(100vw - 32px);
  }

  .question-card {
    min-height: 460px;
  }

  .question-card--choice {
    min-height: 360px;
  }

  .question-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .question-text {
    font-size: 1.05rem;
    min-height: 94px;
  }

  .option-btn {
    padding: 0 16px;
    font-size: 0.9rem;
  }

  .option-label {
    width: 30px;
    height: 30px;
    font-size: 0.85rem;
  }

  .scale-options {
    gap: 6px;
  }

  .scale-dot--lg .scale-dot-core {
    width: 42px;
    height: 42px;
  }

  .scale-dot--md .scale-dot-core {
    width: 36px;
    height: 36px;
  }

  .scale-dot--sm .scale-dot-core {
    width: 30px;
    height: 30px;
  }

  .gender-options {
    grid-template-columns: 1fr;
  }
}
</style>
