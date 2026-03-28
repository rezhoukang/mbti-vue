<!-- 测试历史页面 - TestHistoryView.vue - 展示经典模式与量表模式的历史测试记录 -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAllSavedTestResults, getPersonalityClassGroupByTestResult } from '@/utils/personalityTest'
import dayjs from 'dayjs'
import type { TestResult } from '@/types/personality'

const router = useRouter()
const results = ref<TestResult[]>([])
const loading = ref(true)

onMounted(async () => {
  const all = await getAllSavedTestResults()
  results.value = all.sort((a, b) => b.timestamp - a.timestamp).slice(0, 6)
  loading.value = false
})

function formatDate(timestamp: number): string {
  return dayjs(timestamp).format('YYYY年MM月DD日 HH:mm')
}

function getType(result: TestResult): string {
  const group = getPersonalityClassGroupByTestResult(result)
  return group ? `${group.type} - ${group.epithet}` : '未知'
}

function getModeLabel(result: TestResult): string {
  return result.mode === 'scale' ? '93题量表' : '经典70题'
}

function viewResult(timestamp: number) {
  router.push({ path: '/test/result', query: { testResultId: String(timestamp) } })
}
</script>

<template>
  <div class="history-page container">
    <h1>测试历史</h1>

    <div v-if="loading" class="empty">加载中...</div>
    <div v-else-if="results.length === 0" class="empty">
      <p>暂无测试记录</p>
      <router-link to="/" class="btn btn-primary">去测试</router-link>
    </div>

    <div v-else class="history-list">
      <div
        v-for="result in results"
        :key="result.timestamp"
        class="history-item card"
        @click="viewResult(result.timestamp)"
      >
        <div class="item-main">
          <div class="item-type">{{ getType(result) }}</div>
          <div class="item-mode">{{ getModeLabel(result) }}</div>
        </div>
        <div class="item-time">{{ formatDate(result.timestamp) }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.history-page {
  padding-top: 40px;
  padding-bottom: 40px;
}

.history-page h1 {
  font-size: 1.5rem;
  margin-bottom: 24px;
  color: var(--color-primary-dark);
}

.empty {
  text-align: center;
  padding: 80px 0;
  color: var(--color-text-secondary);
}

.empty .btn {
  margin-top: 16px;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
}

.history-item:hover {
  background: color-mix(in srgb, var(--color-primary-bg) 70%, white);
  transform: translateY(-1px);
}

.item-main {
  display: flex;
  align-items: center;
  gap: 12px;
}

.item-type {
  font-weight: 700;
  color: var(--color-primary);
}

.item-mode {
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--color-primary-bg);
  color: var(--color-primary-dark);
  font-size: 0.76rem;
  font-weight: 700;
}

.item-time {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

@media (max-width: 640px) {
  .history-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .item-main {
    flex-wrap: wrap;
  }
}
</style>
