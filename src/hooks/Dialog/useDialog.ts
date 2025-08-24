import { createApp, h, ref, watch, reactive, isRef, isReactive, unref, App, VNode } from 'vue'
import type { Ref, Reactive } from 'vue'
import { ElDialog, type DialogProps } from 'element-plus'
import { init } from 'echarts'

/* 必需参数 */
interface CustomRequiredParams {
  status: number //0:init 1:loading 2:success 3:error
}
/* 去除只读属性工具 */
type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

type SafeDialogProps = Mutable<Omit<DialogProps, 'transition' | 'appendTo'>> & {
  transition?: string
  appendTo?: HTMLElement | string | (() => HTMLElement | string)
}
type DialogConfig = Partial<SafeDialogProps> & CustomRequiredParams

/* 单例弹窗实例 */
let dialogInstance: {
  app: App | null
  el: HTMLElement | null
  visible: Ref<boolean>
  component: any
  config: DialogConfig | Ref<DialogConfig>
  resolve: ((data: any) => void) | null
  reject: ((error?: any) => void) | null
} = {
  app: null,
  el: null,
  visible: ref(false),
  component: null,
  config: { status: 0 },
  resolve: null,
  reject: null,
}

const getConfigValue = (config: DialogConfig | Ref<DialogConfig> | Reactive<DialogConfig>) => {
  return unref(config) as DialogConfig
}

const setConfigValue = (
  target: DialogConfig | Ref<DialogConfig> | Reactive<DialogConfig>,
  newConfig: Partial<DialogConfig>,
): DialogConfig | Ref<DialogConfig> | Reactive<DialogConfig> => {
  const unwrapped = unref(target)
  const config = unref(newConfig)
  const merged = { ...unwrapped, ...config }
  console.log('merged', merged)
  if (isRef(target)) {
    target.value = merged
  } else if (isReactive(target)) {
    Object.assign(target, merged)
  } else {
    return merged
  }
}

export const createReusableDialog = () => {
  /* 创建弹窗实例(只创建一次) */
  const initInstance = () => {
    if (dialogInstance.app && dialogInstance.el) return

    /* 创建DOM节点 */
    const el = document.createElement('div')
    document.body.appendChild(el)
    dialogInstance.el = el

    /* 创建应用实例 */
    const app = createApp({
      render(): VNode {
        const currentConfig = getConfigValue(dialogInstance.config)
        return h(
          ElDialog,
          {
            modelValue: dialogInstance.visible.value,
            ...(currentConfig as Record<string, any>),
            beforeClose: (done: Function) => done(),
            onClose: () => {
              dialogInstance.visible.value = false
              dialogInstance.reject?.({ type: 'dialogClose' })
              /* 重置回调 */
              dialogInstance.resolve = null
              dialogInstance.reject = null
            },
          },
          {
            default: () =>
              h(dialogInstance.component, {
                onCancel: () => {
                  dialogInstance.visible.value = false
                  dialogInstance.reject?.({ type: 'dialogCancel' })
                  dialogInstance.resolve = null
                  dialogInstance.reject = null
                },
                onOk: (data: any) => {
                  dialogInstance.visible.value = false
                  dialogInstance.resolve?.(data)
                  dialogInstance.resolve = null
                  dialogInstance.reject = null
                },
                config: currentConfig,
              }),
          },
        )
      },
    })
    dialogInstance.app = app
    dialogInstance.component = app.mount(el)
  }

  const openDialog = (
    component: any,
    config: DialogConfig | Ref<DialogConfig> | Reactive<DialogConfig>,
  ) => {
    /* 确保弹窗实例已创建 */
    initInstance()
    /* 更新配置 */
    dialogInstance.component = component
    dialogInstance.config = setConfigValue(dialogInstance.config, config as DialogConfig)

    /* 监听配置变化 */
    watch(
      () => getConfigValue(dialogInstance.config),
      (newConfig) => {
        console.log('配置已更新', newConfig)
      },
      { deep: true },
    )
    /* 显示弹窗 */
    dialogInstance.visible.value = true

    /* 返回 Promise */
    return new Promise((resolve, reject) => {
      dialogInstance.resolve = resolve
      dialogInstance.reject = reject
    })
  }

  return {
    openDialog,
    updateConfig: (newConfig: Partial<DialogConfig>) => {
      setConfigValue(dialogInstance.config, newConfig)
    },
  }
}
