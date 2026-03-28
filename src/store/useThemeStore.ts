// 主题状态管理 - useThemeStore.ts - 管理应用主题切换（薄荷/蓝调/紫梦/金韵）
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export type ThemeName = 'mint' | 'blue' | 'purple' | 'yellow'

const THEME_LIST: ThemeName[] = ['mint', 'blue', 'purple', 'yellow']

/** MBTI 类型 → 主题色映射 */
const MBTI_THEME_MAP: Record<string, ThemeName> = {
  INFJ: 'mint', ENFP: 'mint', ENFJ: 'mint', INFP: 'mint',
  ENTJ: 'purple', ENTP: 'purple', INTJ: 'purple', INTP: 'purple',
  ESFJ: 'blue', ESTJ: 'blue', ISFJ: 'blue', ISTJ: 'blue',
  ESFP: 'yellow', ESTP: 'yellow', ISFP: 'yellow', ISTP: 'yellow',
}

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<ThemeName>('mint')

  function setTheme(name: ThemeName) {
    theme.value = name
    document.documentElement.setAttribute('data-theme', name)
  }

  function toggle() {
    const idx = THEME_LIST.indexOf(theme.value)
    setTheme(THEME_LIST[(idx + 1) % THEME_LIST.length])
  }

  function setByMbtiType(type: string) {
    const t = MBTI_THEME_MAP[type.toUpperCase()]
    if (t) setTheme(t)
  }

  watch(theme, (val) => {
    document.documentElement.setAttribute('data-theme', val)
  }, { immediate: true })

  return { theme, setTheme, toggle, setByMbtiType, THEME_LIST }
})
