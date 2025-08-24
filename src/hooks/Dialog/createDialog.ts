import { createApp, h, ref, watch, reactive, isRef, isReactive } from 'vue'
import { ElDialog, ElLoading, ElMessage, type DialogProps } from 'element-plus'

interface CustomRequiredParams {
  status: number //0:init 1:loading 2:success 3:error
}

// 关键修复：移除属性的readonly修饰符，使它们可写
type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

// 使用Mutable工具类型移除DialogProps的只读限制
type SafeDialogProps = Mutable<Omit<DialogProps, 'transition' | 'appendTo'>> & {
  transition?: string
  appendTo?: HTMLElement | string | (() => HTMLElement | string)
}

// 重新定义DialogConfig，确保所有属性可写
export type DialogConfig = Partial<SafeDialogProps> & CustomRequiredParams

/**
 * @description: 函数时弹框，将弹窗Promise化
 * @param {any} component 弹窗组件
 * @param {any} config 弹窗组件参数
 * @return {Promise} 弹窗Promise
 * @example
 *  const dialog = createDialog(component, config)
 *  await dialog()
 */

export function createDialog(component: any, config: DialogConfig) {
  /* 校验参数 */
  const validateParams = () => {
    if (!component) {
      throw new Error('创建弹窗失败：缺少必须组件参数')
    }
    if (!config) {
      throw new Error('创建弹窗失败：缺少必须config参数')
    }
    if (typeof config.status !== 'number' || config.status < 0 || config.status > 3) {
      throw new Error('创建弹窗失败：config参数status必须为0-3的数字')
    }
  }
  validateParams()

  return () => {
    return new Promise((resolve, reject) => {
      const visiable = ref(true)
      /* 创建响应式配置副本 */
      const reactiveConfig = isRef(config)
        ? config
        : isReactive(config)
          ? config
          : reactive<DialogConfig>({ ...config })
      const dialogUnMount = () => {
        visiable.value = false
      }
      /* 1.创建节点 */
      let el = document.createElement('div')
      /* 2.创建实例 */
      const app = createApp({
        onUnmounted() {
          if (!el) return
          el.parentNode && el.parentNode.removeChild(el)
        },
        render() {
          const currentConfig = isRef(reactiveConfig)
            ? reactiveConfig.value
            : (reactiveConfig as DialogConfig)

          if (typeof currentConfig !== 'object' || currentConfig === null) {
            throw new Error('创建弹窗失败：config参数必须为对象')
          }

          return h(
            ElDialog,
            {
              modelValue: visiable.value,
              ...currentConfig,
              beforeClose: (done: Function) => {
                console.log('before close')
                done()
              },
              onClose: () => {
                reject({
                  type: 'dialogClose',
                })
                dialogUnMount()
                console.log('dialog closed')
              },
              onClosed: () => {
                app.unmount()
                console.log('closed')
              },
            },
            {
              default: () =>
                h(component, {
                  onCancel: () => {
                    reject({
                      type: 'dialogCancel',
                    })
                    dialogUnMount()
                  },
                  onOk: (data: any) => {
                    resolve(data)
                    dialogUnMount()
                  },
                  config: currentConfig,
                }),
            },
          )
        },
      })
      watch(
        reactiveConfig,
        (newConfig) => {
          console.log('配置已更新', newConfig)
        },
        { deep: true },
      )
      /* 3.挂载实例 */
      app.mount(el)
      /* 4.布局挂载 */
      document.body.appendChild(el)
    })
  }
}
