import { createApp, h , ref } from 'vue'
import { ElDialog, ElLoading, ElMessage } from 'element-plus'


/** 
 * @description: 函数时弹框，将弹窗Promise化
 * @param {any} component 弹窗组件
 * @param {any} config 弹窗组件参数
 * @return {Promise} 弹窗Promise
 * @example 
 *  const dialog = createDialog(component, config)
 *  await dialog()
  */

export function createDialog(component:any, config:any) {
  return () => {
    return new Promise((resolve, reject) => {
      const visiable = ref(false)
      const dialogUnMount = () => {
        visiable.value = false
      }
      /* 1.创建节点 */
      let el = document.createElement('div')
      /* 2.创建实例 */
      const app = createApp({
        onUnmounted() {
          if(!el) return
          el.parentNode && el.parentNode.removeChild(el)
        },
        render() {
          return h(
            ElDialog,
            {
              modelValue: visiable.value,
              ...config,
              vLoading: true,
              beforClose: (done:Function) => {
                console.log('before close')
                done()
              },
              onClose: () => {
                reject({
                  type: 'dialogClose'
                })
                dialogUnMount()
                console.log('dialog closed')
              },
              onClosed: () => {
                app.unmount()
                console.log('closed')
              }
            },
            {
              default: () => h(component, {
                onCancel: () => {
                  reject({
                    type: 'dialogCancel',
                  })
                  dialogUnMount()
                },
                onOk: (data:any) => {
                  resolve(data)
                  dialogUnMount()
                }
              })
            }
          )
        }
      })
      /* 3.挂载实例 */
      app.mount(el)
      /* 4.布局挂载 */
      document.body.appendChild(el)
    })
  }
}