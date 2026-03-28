<!-- 首页 - HomeView.vue - 展示MBTI双模式入口和四大维度说明 -->
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useTestStore } from '@/store/useTestStore'
import type { TestMode } from '@/types/personality'

const router = useRouter()
const testStore = useTestStore()

const modeCards: Array<{
  mode: TestMode
  badge: string
  title: string
  features: string[]
}> = [
  {
    mode: 'classic',
    badge: '快速版',
    title: '70题经典二选一',
    features: ['适合首次测试', '延续原有题库', '结果读取更直接'],
  },
  {
    mode: 'scale',
    badge: '新版',
    title: '93题七级量表',
    features: ['强弱分值更细', '四维独立累计', '适合细分偏好强度'],
  },
]

const dimensions = [
  {
    label: '能量方向',
    value: '外向 (E) / 内向 (I)',
    tone: 'energy',
  },
  {
    label: '认知方式',
    value: '感觉 (S) / 直觉 (N)',
    tone: 'perception',
  },
  {
    label: '判断方式',
    value: '思考 (T) / 情感 (F)',
    tone: 'decision',
  },
  {
    label: '生活态度',
    value: '判断 (J) / 知觉 (P)',
    tone: 'lifestyle',
  },
] as const

function startTest(mode: TestMode) {
  testStore.reset(mode)
  router.push('/test')
}
</script>

<template>
  <div class="home">
    <div class="hero">
      <span class="eyebrow">MBTI Personality Explorer</span>
      <h1 class="title">MBTI 人格测试</h1>

      <div class="mode-grid">
        <button
          v-for="card in modeCards"
          :key="card.mode"
          class="mode-card"
          @click="startTest(card.mode)"
        >
          <span class="mode-badge">{{ card.badge }}</span>
          <h2>{{ card.title }}</h2>
          <ul class="mode-features">
            <li v-for="feature in card.features" :key="feature">{{ feature }}</li>
          </ul>
        </button>
      </div>

      <div class="dimensions">
        <div
          v-for="dimension in dimensions"
          :key="dimension.label"
          class="dimension"
          :class="`dimension--${dimension.tone}`"
        >
          <span class="dim-label">{{ dimension.label }}</span>
          <span class="dim-value">{{ dimension.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 140px);
  padding: 48px 20px;
}

.hero {
  width: min(980px, 100%);
  text-align: center;
  margin-top: -6vh; /* pull entire block up */
}

.eyebrow {
  display: inline-flex;
  padding: 6px 14px;
  border-radius: 999px;
  background: var(--color-primary-bg);
  color: var(--color-primary);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 14px;
}

.title {
  font-size: 2.9rem;
  font-weight: 900;
  color: var(--color-primary-dark);
  margin-bottom: 40px; /* pulled away from content below */
}

.subtitle {
  font-size: 1.2rem;
  color: var(--color-text-secondary);
  margin-bottom: 18px;
}

.desc {
  max-width: 760px;
  margin: 0 auto 32px;
  color: var(--color-text-secondary);
  line-height: 1.85;
}

.mode-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  margin-bottom: 28px;
}

.mode-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 26px;
  border-radius: 28px;
  border: 1px solid var(--color-border);
  background:
    radial-gradient(circle at top right, var(--color-primary-bg), transparent 45%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(255, 255, 255, 0.88));
  box-shadow: var(--shadow-lg);
  text-align: left;
  transition: transform var(--transition), border-color var(--transition), box-shadow var(--transition);
  overflow: hidden;
}

.mode-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-primary-light);
}

.mode-badge {
  display: inline-flex;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  padding: 5px 12px;
  border-radius: 999px;
  background: var(--color-primary-bg);
  color: var(--color-primary);
  font-size: 0.78rem;
  font-weight: 800;
  margin-bottom: 2px;
}

.mode-card h2 {
  font-size: 1.35rem;
  color: var(--color-primary-dark);
  margin: 0;
}

.mode-features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.mode-features li {
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  font-size: 0.8rem;
}

.dimensions {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.dimension {
  --dimension-bg-start: #f8fbfa;
  --dimension-bg-end: #edf7f2;
  --dimension-accent: var(--color-primary);
  --dimension-label: var(--color-text-secondary);

  background: linear-gradient(135deg, var(--dimension-bg-start), var(--dimension-bg-end));
  border-radius: var(--radius);
  padding: 16px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.02);
  text-align: left;
  border: 1px solid rgba(0, 0, 0, 0.03);
}

.dimension--energy {
  --dimension-bg-start: #f2fcf6;
  --dimension-bg-end: #e5f6eb;
  --dimension-accent: #3b9f65;
  --dimension-label: #6ab88c;
}

.dimension--perception {
  --dimension-bg-start: #f3f8ff;
  --dimension-bg-end: #e6f0ff;
  --dimension-accent: #4581d9;
  --dimension-label: #7ca8ea;
}

.dimension--decision {
  --dimension-bg-start: #faf6ff;
  --dimension-bg-end: #f2eaff;
  --dimension-accent: #8a5cd7;
  --dimension-label: #b699ed;
}

.dimension--lifestyle {
  --dimension-bg-start: #fffef2;
  --dimension-bg-end: #fffce0;
  --dimension-accent: #b49b18;
  --dimension-label: #d1ba49;
}

.dim-label {
  display: block;
  font-size: 0.8rem;
  color: var(--dimension-label);
  font-weight: 700;
  margin-bottom: 6px;
}

.dim-value {
  font-weight: 800;
  color: var(--dimension-accent);
}

@media (max-width: 900px) {
  .mode-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .dimensions {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 480px) {
  .home {
    padding: 36px 16px;
  }

  .hero {
    margin-top: 0;
  }

  .title {
    font-size: 2rem;
  }

  .mode-card {
    padding: 38px 20px 20px;
    border-radius: 22px;
  }
}
</style>
