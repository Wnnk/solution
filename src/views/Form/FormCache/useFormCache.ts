import { ref, onMounted, watch } from 'vue'
type Cachelocation = 'localStorage' | 'sessionStorage' | 'indexedDB' | 'server'
type ClearType = 'expired' | 'submit' | 'level'
interface CacheOptions {
  cacheLocation?: Cachelocation
  debounceTime?: number
  clearType?: ClearType
}

const useFormCache = <T extends object>(key: string, options: CacheOptions = {}) => {
  if (!key) {
    console.error('Please provide a key for the form cache')
    return {}
  }
  const defalutOptions: CacheOptions = {
    debounceTime: 2000,
    cacheLocation: 'localStorage',
    clearType: 'expired',
  }
  const mergedOptions: CacheOptions = { ...defalutOptions, ...options }
  const cacheLocation = mergedOptions.cacheLocation

  const loadData = () => {
    if (cacheLocation === 'localStorage') {
      const storage = localStorage.getItem(key)
      if (!storage) return {}
    }
  }
  const loadFormCache = () => {
    if (!key || !cacheLocation) return {}
    let cacheData = {}
    switch (cacheLocation) {
      case 'localStorage':
        cacheData = loadData()
        break
      case 'sessionStorage':
        cacheData = loadData()
        break
      default:
        return {}
    }
  }
}
