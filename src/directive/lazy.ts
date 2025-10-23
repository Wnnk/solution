

export const lazy = {
  mounted(el: HTMLElement, binding: any) {
    if(typeof binding.value ==='string') {
      el.dataset.src = binding.value;
    } else {
      throw new Error('v-lazy directive requires a string value');
    }
    observer.observe(el);
  },
  unmounted(el: HTMLElement) {
    if(observer) {
      observer.unobserve(el);
    }
  },
}


const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const lazyImage = entry.target as HTMLImageElement;
      lazyImage.src = lazyImage.dataset.src;
      observer.unobserve(lazyImage);
    }
  });
})