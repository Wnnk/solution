export const status = {
  mounted(el: HTMLElement, binding: any) {
    const status = binding.value
    updateStatus(el, status)
    /* 移除所有状态 */
    el.classList.remove('status-init','status-loading','status-success','status-error')
    switch (status) {
      case 0:
        el.classList.add('status-init')
        break
      case 1:
        el.classList.add('status-loading')
        break
      case 2:
        el.classList.add('status-success')
        break
      case 3:
        el.classList.add('status-error')
        break
    }
  },


}

  const updateStatus = (el: HTMLElement, status: string) => {
    
  }