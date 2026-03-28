// 环境类型声明 - env.d.ts - 声明 Vue 单文件组件模块类型
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
