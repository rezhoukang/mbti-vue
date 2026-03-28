<!-- 进度条组件 - TestProgress.vue - 展示测试完成进度 -->
<script setup lang="ts">
interface Props {
  progress: number
  current: number
  total: number
}

defineProps<Props>()
</script>

<template>
  <div class="progress-wrapper">
    <div class="progress-info">
      <span>已完成 {{ current }} / {{ total }}</span>
      <span>{{ progress }}%</span>
    </div>
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: progress + '%' }"></div>
    </div>
  </div>
</template>

<style scoped>
.progress-wrapper {
  margin-bottom: 20px;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  margin-bottom: 8px;
  font-weight: 500;
}

.progress-bar {
  height: 6px;
  background: var(--color-border);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-primary-light));
  border-radius: 3px;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
