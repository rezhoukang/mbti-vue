// 路由配置 - index.ts - 定义MBTI应用的页面路由映射
import { createRouter, createMemoryHistory } from 'vue-router'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/test',
      name: 'Test',
      component: () => import('@/views/TestView.vue'),
    },
    {
      path: '/test/result',
      name: 'TestResult',
      component: () => import('@/views/TestResultView.vue'),
    },
    {
      path: '/test/result/history',
      name: 'TestHistory',
      component: () => import('@/views/TestHistoryView.vue'),
    },
  ],
})

export default router
