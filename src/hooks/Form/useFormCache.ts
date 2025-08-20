import { onUnmounted } from 'vue'
import { ref, onMounted, watch } from 'vue'
type Cachelocation = 'localStorage' | 'sessionStorage' | 'indexedDB' | 'server'
type ClearType = 'expired' | 'submit' 
interface CacheOptions {
  cacheLocation?: Cachelocation
  debounceTime?: number
  clearType?: ClearType
  expireTime?: number
}

export const useFormCache = <T extends object>(key: string, options: CacheOptions = {}) => {
  if (!key) {
    console.error('Please provide a key for the form cache')
    return {}
  }
  const defalutOptions: CacheOptions = {
    debounceTime: 2000,
    cacheLocation: 'localStorage',
    clearType: 'expired',
    expireTime: 60 * 60 * 3000, // 3 hour
  }
  const mergedOptions: CacheOptions = { ...defalutOptions, ...options }
  const { cacheLocation, clearType, expireTime, debounceTime } = mergedOptions
  let debounceTimer: any = null

  const loadData = () => {
    let storage: any = null
    if (cacheLocation === 'localStorage') {
      storage = localStorage.getItem(key)
      if (!storage) return {}
    } else if (cacheLocation ==='sessionStorage') {
      storage = sessionStorage.getItem(key)
      if (!storage) return {}
    }
    const { data, expiry } = JSON.parse(storage)
    if (expiry && expiry < Date.now()) {
      clearCache()
      return {}
    }
    return data
  }

  const loadFormCache = () => {
    if (!key || !cacheLocation) return {}
    let cacheData = {}
    switch (cacheLocation) {
      case 'localStorage':
        cacheData = loadData()
        return cacheData || {}
      case 'sessionStorage':
        cacheData = loadData()
        return cacheData || {}
      default:
        return {}
    }
  }
  /* localStorage储存 */
  const saveToLocalStorage = (data: T) => {
    if(clearType === 'expired'){
      try {
        localStorage.setItem(
          key,
          JSON.stringify({
            data,
            expiry: Date.now() + mergedOptions.expireTime,
          })
        )
      } catch (error) {
         if (
          error instanceof Error &&
          (error.name === 'QuotaExceededError' ||
            error.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
            error.name === 'QUOTA_EXCEEDED_ERR')
          ) {
            console.warn('储存空间不足，清除缓存')
          } else {
            console.log(error)
          }
      }
    }  else {
      try {
       localStorage.setItem(
          key,
          JSON.stringify({
            data,
          })
        )
      } catch (error) {
        if (
          error instanceof Error &&
          (error.name === 'QuotaExceededError' ||
            error.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
            error.name === 'QUOTA_EXCEEDED_ERR')
        ) {
          console.warn('储存空间不足，清除缓存')
        } else {
          console.log(error)
        }
      }
    }
  }
  /* sessionStorage储存 */
  const saveToSessionStorage = (data: T) => {
    if(clearType === 'expired'){
      try {
        sessionStorage.setItem(
          key,
          JSON.stringify({
            data,
            expiry: Date.now() + mergedOptions.expireTime,
          })
        )
      } catch (error) {
        if (
          error instanceof Error &&
          (error.name === 'QuotaExceededError' ||
            error.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
            error.name === 'QUOTA_EXCEEDED_ERR')
        ) {
          console.warn('储存空间不足，清除缓存')
        } else {
          console.log(error)
        }
      }
    } else {
      try {
        sessionStorage.setItem(
          key,
          JSON.stringify({
            data,
          })
        )
      } catch (error) {
        if (
          error instanceof Error &&
          (error.name === 'QuotaExceededError' ||
            error.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
            error.name === 'QUOTA_EXCEEDED_ERR')
        ) {
          console.warn('储存空间不足，清除缓存')
        } else {
          console.log(error)
        }
      }
    }
  }

  /* 自动保存 */
  const autoSave = (data: T) => {
    watch(
      () => data,
      (newValue) => {
        if(debounceTimer) {
          clearTimeout(debounceTimer)
        }
        debounceTimer = setTimeout(() => {
          saveToCache(newValue)
        }, debounceTime)
      },
      { deep: true }
    )
  }


  const saveToCache = (data: T) => {
    switch (cacheLocation) {
      case 'localStorage':
        saveToLocalStorage(data)
        break
      case 'sessionStorage':
        saveToSessionStorage(data)
        break
      default:
        break
    }
  }

  const clearCache = () => {
    switch (cacheLocation) {
      case 'localStorage':
        localStorage.removeItem(key)
        break
      case 'sessionStorage':
        sessionStorage.removeItem(key)
        break
      default:
        break
    }
  }

  onUnmounted(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }
  })


  return {
    loadFormCache,
    saveToCache,
    autoSave,
    clearCache,
  }
}
