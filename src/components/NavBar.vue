<!-- 导航栏组件 - NavBar.vue - 顶部导航、Logo、主题切换和路由跳转 -->
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeStore } from '@/store/useThemeStore'

const route = useRoute()
const themeStore = useThemeStore()
const isTestingPage = computed(() => route.path === '/test')
</script>

<template>
  <header class="navbar">
    <div class="navbar-inner container">
      <router-link to="/" class="logo">
        <span class="logo-icon">◈</span>
        返回首页
      </router-link>

      <div class="nav-right">
        <button class="theme-toggle" @click="themeStore.toggle" title="切换主题">
          <span
            v-for="t in themeStore.THEME_LIST"
            :key="t"
            class="theme-dot"
            :class="['theme-dot--' + t, { active: themeStore.theme === t }]"
          ></span>
        </button>
        <nav v-if="!isTestingPage" class="nav-links">
          <router-link to="/test/result/history" class="nav-link">测试历史</router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  height: 60px;
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background var(--transition);
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--color-primary-dark);
  text-decoration: none;
  letter-spacing: -0.01em;
  transition: color var(--transition);
}

.logo:hover {
  text-decoration: none;
}

.logo-icon {
  font-size: 1.3rem;
  color: var(--color-primary);
  transition: color var(--transition);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.theme-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: all var(--transition);
}

.theme-toggle:hover {
  box-shadow: var(--shadow);
}

.theme-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid transparent;
  transition: all var(--transition);
  opacity: 0.4;
  transform: scale(0.85);
}

.theme-dot.active {
  opacity: 1;
  transform: scale(1);
  border-color: white;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
}

.theme-dot--mint {
  background: #4fc5a0;
}

.theme-dot--blue {
  background: #5b7ff6;
}

.theme-dot--purple {
  background: #9b6dff;
}

.theme-dot--yellow {
  background: #f0a030;
}

.nav-links {
  display: flex;
  gap: 24px;
}

.nav-link {
  font-size: 0.88rem;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: all var(--transition);
  padding: 5px 14px;
  border-radius: 20px;
  background: var(--color-bg);
}

.nav-link:hover {
  color: var(--color-primary);
  background: var(--color-primary-bg);
  text-decoration: none;
}

@media (max-width: 640px) {
  .navbar {
    height: 52px;
  }

  .logo {
    font-size: 1rem;
  }

  .nav-right {
    gap: 10px;
  }
}
</style>
