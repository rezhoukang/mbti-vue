<!-- 根组件 - App.vue - 应用布局：导航栏 + 路由视图 + 页脚 -->
<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <div class="app">
    <NavBar />
    <router-view />
    <AppFooter />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
