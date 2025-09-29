import { ElSkeleton } from "element-plus"
import { update } from "lodash"
import { h, render } from "vue"

const map = new WeakMap()
export const skeleton = {
  mounted(el: HTMLElement, binding: any) {
    const container = document.createElement("div")
    el.appendChild(container)
    console.log(el.offsetWidth,el.offsetHeight)
    container.style.position = 'absolute'
    container.style.top = '0px'
    container.style.left = '0px'
    container.style.right = '0px'
    container.style.bottom = '0px'
    container.style.zIndex = '9999'
    container.style.backgroundColor = '#fff'


    if(!el.style.position|| el.style.position === 'static') {
      el.style.position ='relative'
    }

    el.style.overflow = 'hidden'

    const vnode = h(ElSkeleton,{
      ...binding.value
    })
     render(
      vnode,
      container
    )

    map.set(el,{
      showSkeleton: () => {
        vnode.component.props.loading = true
        container.style.backgroundColor = '#fff'
         el.style.overflow = 'hidden'
      },
      hiddenSkeleton: () => {
        vnode.component.props.loading = false
        container.style.backgroundColor = 'transparent'
      },
      destroy: () => {
        render(null, container)
        container.remove()
      }
    })
  },
  updated(el,binding) {
    const skeletons = map.get(el)
    if(binding.value.loading === true) {
      skeletons.showSkeleton()
    }else {
      skeletons.hiddenSkeleton()
    }
  },
  unmounted(el,binding) {
    const skeletons = map.get(el)
    skeletons.destory()
  },
}