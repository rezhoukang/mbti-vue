<!-- 测试说明组件 - TestInstructions.vue - 根据模式展示测试须知和开始按钮 -->
<script setup lang="ts">
import { computed } from 'vue'
import type { TestMode } from '@/types/personality'

const props = defineProps<{
  mode: TestMode
  total: number
}>()

const emit = defineEmits<{
  dismiss: []
}>()

const modeCopy = computed(() => {
  if (props.mode === 'scale') {
    return {
      title: '93题七级量表模式',
      subtitle: '更适合观察四大维度的偏好强度',
      tips: [
        `共 ${props.total} 题，7 个圆点作答，左侧偏向认同，右侧偏向不认同`,
        '请根据第一反应快速作答，不要过度思考',
        '请选择最真实反映你行为的选项，而不是理想中的自己',
        '适合快速得到 MBTI 四字母类型结果',
      ],
      action: '进入量表测试',
    }
  }

  return {
    title: '70题经典模式',
    subtitle: '保留原有二选一答题方式',
    tips: [
      `本测试共 ${props.total} 题，每题 2 个选项，没有对错之分`,
      '请根据第一反应快速作答，不要过度思考',
      '请选择最真实反映你行为的选项，而不是理想中的自己',
      '适合快速得到 MBTI 四字母类型结果',
    ],
    action: '进入经典测试',
  }
})
</script>

<template>
  <div class="instructions card">
    <span class="mode-chip">{{ props.mode === 'scale' ? '新模式' : '经典模式' }}</span>
    <h2>{{ modeCopy.title }}</h2>
    <p class="subtitle">{{ modeCopy.subtitle }}</p>
    <ul>
      <li v-for="tip in modeCopy.tips" :key="tip">{{ tip }}</li>
    </ul>
    <button class="btn btn-primary" @click="emit('dismiss')">
      {{ modeCopy.action }}
    </button>
  </div>
</template>

<style scoped>
.instructions {
  max-width: 560px;
  text-align: center;
}

.mode-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 12px;
  border-radius: 999px;
  background: var(--color-primary-bg);
  color: var(--color-primary);
  font-size: 0.78rem;
  font-weight: 700;
  margin-bottom: 12px;
}

.instructions h2 {
  font-size: 1.6rem;
  color: var(--color-primary-dark);
  margin-bottom: 8px;
}

.subtitle {
  color: var(--color-text-secondary);
  margin-bottom: 24px;
}

.instructions ul {
  list-style: none;
  padding: 0;
  margin-bottom: 32px;
  text-align: left;
}

.instructions li {
  padding: 14px 0;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.instructions li:last-child {
  border-bottom: none;
}
</style>
