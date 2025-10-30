
import { onUnmounted, ref, watch, Ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import _ from "lodash";


interface CacheOptions {
  time?: number
  expiredTime?: number
  excludeKeys?: string[]

}
export const useFormCache = (key: string, formData: Ref<any>, options: CacheOptions) => {

  if(!key) {
    console.error('Please provide a key for the form cache')
    return;
  }
  const defaultOptions: CacheOptions = {
    time: 3000,
    expiredTime: 60 * 60 * 1000 * 24, // 1 day
    excludeKeys: []
  }

  const mergedOptions: CacheOptions = { ...defaultOptions, ...options }
  const { time ,expiredTime, excludeKeys } = mergedOptions
  /* 保存最初的formData */
  let originalFormData = _.cloneDeep(formData.value);
  /** 
   * @description: 清除缓存
  **/
  const clearCache = () => {
    localStorage.removeItem(key)
    originalFormData = null;
  }



  /**
   * @description:保存到localStorage
   * @params {object} data 表单数据
  */
  const cacheLocalStorage = (data: any) => {
    const cloneData = _.cloneDeep(data);
    for (const key in cloneData) {
      if (excludeKeys && excludeKeys.includes(key)) {
        delete cloneData[key];
      }
    }
    const expire = Date.now() + expiredTime
    const cacheData = _.cloneDeep({
      data: cloneData,
      expire
    });
    try {
      localStorage.setItem(key, JSON.stringify(cacheData))
    } catch (error) {
      if(error instanceof Error && error.name === 'QuotaExceededError' 
          || error.name === 'NS_ERROR_DOM_QUOTA_REACHED'
          || error.name === 'QUOTA_EXCEEDED_ERR'
        ){ 
          ElMessage.error('LocalStorage quota exceeded. Please clear some space.')
      }else {
        ElMessage.error('Failed to save form data to localStorage')
      }
    }
  }
  /** 
   * @description:获取缓存数据
   * @params {string} key 缓存的key
   * @return { object } 缓存的数据
    */
  const getCacheData = (key: string) => {
    const storage = localStorage.getItem(key)
    if(!storage) return {}
    const { data, expire } = JSON.parse(storage)
    if(Date.now() > expire) {
      clearCache()
      return {}
    }
    if(excludeKeys) {
      for (const excludeKey of excludeKeys) {
        data[excludeKey] = null;
      }
    }
    return data;
  }

  /** 
   * @description: 刷新时自动获取缓存数据并更新formData
  */
  const initFormData = () => {
    const cacheData = getCacheData(key);
    if(cacheData && Object.keys(cacheData).length > 0) {
      formData.value = cacheData;
    }
    return;
  }
  initFormData();
  
  /** 
   * @description: 自动缓存表单数据
    */
  const debounceFunc = _.debounce(cacheLocalStorage, time);
  watch(
    () => formData.value,
    (newVal) => {
      debounceFunc(newVal);
    },
    {
      deep: true
    }
  )



  /** 
   * @description: 重置表单数据
  */
  const resetFormData = () => {
    formData.value = originalFormData;
  }






  return {
    clearCache,
    getCacheData,
    resetFormData
  }

}