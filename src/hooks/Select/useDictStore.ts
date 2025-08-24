const dict: Record<string, any> = {} // 使用普通对象替代Map

export const useDictStore = () => {
  // 设置字典值
  const setDict = (key: string, data: any) => {
    try {
      dict[key] = data
      // 同步更新到sessionStorage
      sessionStorage.setItem('dict', JSON.stringify(dict))
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  // 获取字典值
  const getDict = (key: string) => {
    try {
      // 先从内存中获取
      if (dict[key] !== undefined) {
        return dict[key]
      }

      // 内存中没有则从sessionStorage获取
      const dictStoreStr = sessionStorage.getItem('dict')
      if (dictStoreStr) {
        const dictStore = JSON.parse(dictStoreStr)
        // 更新内存中的字典
        Object.assign(dict, dictStore)
        return dictStore[key] || []
      }

      return []
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  // 更新字典值
  const updateDict = (key: string, data: any) => {
    // 如果已存在则不更新
    if (dict[key] !== undefined) return

    try {
      dict[key] = data
      // 同步更新到sessionStorage
      sessionStorage.setItem('dict', JSON.stringify(dict))
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  return {
    setDict,
    getDict,
    updateDict,
  }
}
