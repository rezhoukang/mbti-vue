<!-- 测试结果页面 - TestResultView.vue - 展示人格类型详细分析报告 -->
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  getSavedTestResult,
  getDimensionScoresByTestResult,
  getPersonalityClassGroupByTestResult,
} from '@/utils/personalityTest'
import { useThemeStore } from '@/store/useThemeStore'
import type { TestResult, PersonalityClassGroup, PersonalityType } from '@/types/personality'

const route = useRoute()
const themeStore = useThemeStore()
const testResult = ref<TestResult | null>(null)
const personality = ref<PersonalityClassGroup | null>(null)
const loading = ref(true)
const scoreUnit = computed(() => (testResult.value?.mode === 'scale' ? '分' : '项'))
const modeLabel = computed(() => (testResult.value?.mode === 'scale' ? '93题七级量表模式' : '70题经典二选一'))

/** 各维度统计数据 */
const scoreStats = computed(() => {
  if (!testResult.value) return []
  const scores = getDimensionScoresByTestResult(testResult.value)

  const dims: { left: PersonalityType; right: PersonalityType; label: string }[] = [
    { left: 'E', right: 'I', label: '外向 — 内向' },
    { left: 'S', right: 'N', label: '感觉 — 直觉' },
    { left: 'T', right: 'F', label: '思维 — 情感' },
    { left: 'J', right: 'P', label: '判断 — 知觉' },
  ]

  return dims.map((d) => {
    const lc = scores[d.left]
    const rc = scores[d.right]
    const dimTotal = lc + rc
    const leftPct = dimTotal > 0 ? Math.round((lc / dimTotal) * 100) : 50
    const rightPct = dimTotal > 0 ? 100 - leftPct : 50

    return {
      left: d.left,
      right: d.right,
      label: d.label,
      leftCount: lc,
      rightCount: rc,
      leftPct,
      rightPct,
      winner: lc >= rc ? d.left : d.right,
    }
  })
})

/** 当前活动的章节 ID（目录高亮用） */
const activeSection = ref('')
const sectionHeadings = ref<{ id: string; text: string }[]>([])

onMounted(async () => {
  const id = Number(route.query.testResultId)
  if (!id) {
    loading.value = false
    return
  }
  const result = await getSavedTestResult(id)
  if (result) {
    testResult.value = result
    personality.value = getPersonalityClassGroupByTestResult(result) ?? null
    if (personality.value) {
      themeStore.setByMbtiType(personality.value.type)
    }
  }
  loading.value = false

  // 等待 DOM 渲染后收集标题
  setTimeout(() => {
    const headings = document.querySelectorAll('.result-content h2')
    sectionHeadings.value = Array.from(headings).map((h) => ({
      id: (h as HTMLElement).id,
      text: h.textContent ?? '',
    }))
    observeHeadings(headings)
  }, 100)
})

function observeHeadings(headings: NodeListOf<Element>) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeSection.value = (entry.target as HTMLElement).id
        }
      }
    },
    { rootMargin: '-20% 0% -35% 0px' }
  )
  headings.forEach((h) => observer.observe(h))
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function getImageUrl(type: string): string {
  return new URL(`../assets/images/mbti/${type}.png`, import.meta.url).href
}
</script>

<template>
  <div v-if="loading" class="loading">加载中...</div>
  <div v-else-if="!personality" class="loading">未找到测试结果</div>
  <div v-else class="result-page">
    <!-- 左侧：维度统计 -->
    <aside class="stats-sidebar">
      <div class="stats-card card">
        <h3>维度分析</h3>
        <div v-for="stat in scoreStats" :key="stat.left" class="stat-row">
          <div class="stat-dim-label">{{ stat.label }}</div>
          <div class="stat-labels">
            <span :class="{ active: stat.winner === stat.left }">{{ stat.left }} {{ stat.leftPct }}%</span>
            <span :class="{ active: stat.winner === stat.right }">{{ stat.rightPct }}% {{ stat.right }}</span>
          </div>
          <div class="stat-bar" :style="{ justifyContent: stat.winner === stat.left ? 'flex-start' : 'flex-end' }">
            <div class="stat-bar-fill" :style="{ width: (stat.winner === stat.left ? stat.leftPct : stat.rightPct) + '%' }"></div>
          </div>
          <div class="stat-counts">
            <span>{{ stat.leftCount }} {{ scoreUnit }}</span>
            <span>{{ stat.rightCount }} {{ scoreUnit }}</span>
          </div>
        </div>
      </div>
    </aside>

    <!-- 中间：结果详情 -->
    <main class="result-content">
      <div class="result-header card">
        <div class="type-badge">{{ personality.type }}</div>
        <img :src="getImageUrl(personality.type)" :alt="personality.type" class="type-image" />
        <h1>{{ personality.epithet }}</h1>
        <p class="type-name">{{ personality.name }}</p>
        <p class="mode-tag">{{ modeLabel }}</p>
      </div>

      <div class="result-body card">
        <section>
          <h2 id="description">人格描述</h2>
          <p v-for="(para, i) in personality.description.split('。').filter(Boolean)" :key="i">
            {{ para }}。
          </p>
        </section>

        <section>
          <h2 id="jungian">荣格功能偏好</h2>
          <table class="func-table">
            <tr>
              <td>主导功能</td>
              <td>{{ personality.jungianFunctionalPreference.dominant }}</td>
            </tr>
            <tr>
              <td>辅助功能</td>
              <td>{{ personality.jungianFunctionalPreference.auxiliary }}</td>
            </tr>
            <tr>
              <td>第三功能</td>
              <td>{{ personality.jungianFunctionalPreference.tertiary }}</td>
            </tr>
            <tr>
              <td>劣势功能</td>
              <td>{{ personality.jungianFunctionalPreference.inferior }}</td>
            </tr>
          </table>
        </section>

        <section>
          <h2 id="traits">性格特质</h2>
          <ul>
            <li v-for="(t, i) in personality.generalTraits" :key="i">{{ t }}</li>
          </ul>
        </section>

        <section>
          <h2 id="rel-strengths">关系优势</h2>
          <ul>
            <li v-for="(s, i) in personality.relationshipStrengths" :key="i">{{ s }}</li>
          </ul>
        </section>

        <section>
          <h2 id="rel-weaknesses">关系劣势</h2>
          <ul>
            <li v-for="(w, i) in personality.relationshipWeaknesses" :key="i">{{ w }}</li>
          </ul>
        </section>

        <section>
          <h2 id="success">成功定义</h2>
          <p>{{ personality.successDefinition }}</p>
        </section>

        <section>
          <h2 id="strengths">个人优势</h2>
          <ul>
            <li v-for="(s, i) in personality.strengths" :key="i">{{ s }}</li>
          </ul>
        </section>

        <section>
          <h2 id="gifts">特殊天赋</h2>
          <ul>
            <li v-for="(g, i) in personality.gifts" :key="i">{{ g }}</li>
          </ul>
        </section>

        <section>
          <h2 id="problems">潜在问题</h2>
          <p v-for="(p, i) in personality.potentialProblemAreas" :key="i">{{ p }}</p>
        </section>

        <section>
          <h2 id="explanation">问题分析</h2>
          <p>{{ personality.explanationOfProblems }}</p>
        </section>

        <section>
          <h2 id="solutions">解决方案</h2>
          <p>{{ personality.solutions }}</p>
        </section>

        <section>
          <h2 id="tips">幸福生活建议</h2>
          <p>{{ personality.livingHappilyTips }}</p>
        </section>

        <section v-if="personality.tenRulesToLive.length">
          <h2 id="rules">十条生活准则</h2>
          <ol>
            <li v-for="(r, i) in personality.tenRulesToLive" :key="i">{{ r }}</li>
          </ol>
        </section>

        <section v-if="personality.suggestions?.length">
          <h2 id="suggestions">具体建议</h2>
          <ul>
            <li v-for="(s, i) in personality.suggestions" :key="i">{{ s }}</li>
          </ul>
        </section>
      </div>
    </main>

    <!-- 右侧：目录导航 -->
    <aside class="toc-sidebar">
      <div class="toc-card card">
        <h3>目录</h3>
        <ul class="toc-list">
          <li
            v-for="heading in sectionHeadings"
            :key="heading.id"
            :class="{ active: activeSection === heading.id }"
          >
            <a @click.prevent="scrollTo(heading.id)" href="#">{{ heading.text }}</a>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 140px);
  font-size: 1.2rem;
  color: var(--color-text-secondary);
}

.result-page {
  display: flex;
  gap: 24px;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 24px 20px;
}

/* 左栏 */
.stats-sidebar {
  width: 240px;
  flex-shrink: 0;
  position: sticky;
  top: 100px;
  align-self: flex-start;
}

.stats-card h3 {
  margin-bottom: 16px;
  font-size: 1rem;
  color: var(--color-primary-dark);
}

.stat-row {
  margin-bottom: 20px;
}

.stat-dim-label {
  font-size: 0.72rem;
  color: var(--color-text-secondary);
  margin-bottom: 4px;
  letter-spacing: 0.04em;
}

.stat-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  margin-bottom: 6px;
}

.stat-labels span {
  color: var(--color-text-secondary);
  transition: all var(--transition);
}

.stat-labels .active {
  font-weight: 700;
  color: var(--color-primary);
}

.stat-bar {
  height: 10px;
  background: var(--color-border);
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  display: flex;
}

.stat-bar-fill {
  height: 100%;
  border-radius: 5px;
  background: var(--gradient-btn);
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.stat-bar-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.3), transparent);
  border-radius: 5px 5px 0 0;
}

.stat-counts {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  margin-top: 2px;
}

/* 中间 */
.result-content {
  flex: 1;
  min-width: 0;
}

.result-header {
  text-align: center;
  margin-bottom: 24px;
}

.type-badge {
  display: inline-block;
  font-size: 2rem;
  font-weight: 800;
  color: white;
  background: var(--color-primary);
  padding: 8px 32px;
  border-radius: var(--radius);
  margin-bottom: 16px;
}

.type-image {
  display: block;
  max-width: 200px;
  margin: 0 auto 16px;
}

.result-header h1 {
  font-size: 1.5rem;
  margin-bottom: 4px;
}

.type-name {
  color: var(--color-text-secondary);
}

.mode-tag {
  margin-top: 10px;
  display: inline-flex;
  padding: 6px 14px;
  border-radius: 999px;
  background: var(--color-primary-bg);
  color: var(--color-primary-dark);
  font-size: 0.82rem;
  font-weight: 700;
}

.result-body section {
  margin-bottom: 32px;
}

.result-body h2 {
  font-size: 1.2rem;
  color: var(--color-primary-dark);
  border-bottom: 2px solid var(--color-border);
  padding-bottom: 8px;
  margin-bottom: 16px;
}

.result-body p {
  margin-bottom: 12px;
  line-height: 1.8;
}

.result-body ul,
.result-body ol {
  padding-left: 20px;
}

.result-body li {
  margin-bottom: 8px;
  line-height: 1.7;
}

.func-table {
  width: 100%;
  border-collapse: collapse;
}

.func-table td {
  padding: 10px 16px;
  border-bottom: 1px solid var(--color-border);
}

.func-table td:first-child {
  font-weight: 600;
  color: var(--color-text-secondary);
  width: 120px;
}

/* 右栏 */
.toc-sidebar {
  width: 200px;
  flex-shrink: 0;
  position: sticky;
  top: 100px;
  align-self: flex-start;
}

.toc-card h3 {
  margin-bottom: 12px;
  font-size: 1rem;
  color: var(--color-primary-dark);
}

.toc-list {
  list-style: none;
  padding: 0;
}

.toc-list li {
  margin-bottom: 6px;
}

.toc-list a {
  display: block;
  font-size: 0.85rem;
  padding: 4px 8px;
  border-radius: 4px;
  color: var(--color-text-secondary);
  transition: all 0.2s;
}

.toc-list a:hover {
  background: var(--color-border);
  text-decoration: none;
}

.toc-list li.active a {
  color: var(--color-primary);
  background: #ebf8ff;
  font-weight: 600;
}

@media (max-width: 1024px) {
  .toc-sidebar {
    display: none;
  }
}

@media (max-width: 768px) {
  .result-page {
    flex-direction: column;
  }
  .stats-sidebar {
    width: 100%;
    position: static;
  }
}
</style>
