<!-- 页脚组件 - AppFooter.vue - 页面底部版权信息 -->
<template>
  <footer class="footer">
    <div class="container footer-inner">
      <span>MBTI 人格测试 &copy; {{ new Date().getFullYear() }}</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #1a202c;
  color: #a0aec0;
  padding: 20px 0;
  margin-top: auto;
}

.footer-inner {
  text-align: center;
  font-size: 0.85rem;
}
</style>
