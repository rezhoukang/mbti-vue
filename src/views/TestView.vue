<!-- 测试页面 - TestView.vue - 展示测试说明和答题流程 -->
<script setup lang="ts">
import { useTestStore } from '@/store/useTestStore'
import TestInstructions from '@/components/TestInstructions.vue'
import TestQuestion from '@/components/TestQuestion.vue'

const testStore = useTestStore()
</script>

<template>
  <div class="test-page container">
    <TestInstructions
      v-if="testStore.showInstructions"
      :mode="testStore.mode"
      :total="testStore.totalQuestions"
      @dismiss="testStore.dismissInstructions"
    />
    <TestQuestion v-else />
  </div>
</template>

<style scoped>
.test-page {
  padding-top: 40px;
  padding-bottom: 40px;
  min-height: calc(100vh - 140px);
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 640px) {
  .test-page {
    padding-top: 24px;
    padding-bottom: 24px;
    align-items: flex-start;
  }
}
</style>
