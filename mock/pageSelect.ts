import { v4 as uuidv4 } from 'uuid'

export default [
  {
    url: '/getOptions', // 接口路径
    method: 'get',
    timeout: 3000,
    response: (config) => {
      const query = config.query || {} // 从config中获取查询参数
      const page = query.page || 1 // 获取page参数，默认为1
      const pageSize = query.pageSize || 10 // 获取pageSize参数，默认为10
      // 生成总数据量（100-500之间）
      const total = Math.floor(Math.random() * 401) + 100
      // 计算当前页数据起始索引
      const startIndex = (page - 1) * pageSize
      // 计算当前页实际数据量（最后一页可能不足pageSize）
      const currentDataCount = startIndex >= total ? 0 : Math.min(pageSize, total - startIndex)

      const getCity = () => {
        const prefixes = ['北京', '上海', '广州', '深圳', '杭州', '苏州', '成都', '武汉']
        return prefixes[Math.floor(Math.random() * prefixes.length)]
      }

      const dataList = []
      for (let i = 0; i < currentDataCount; i++) {
        dataList.push({
          label: `${getCity()}-${i}`,
          value: uuidv4(),
        })
      }

      return {
        code: 200,
        message: '请求成功',
        data: {
          page: Number(page),
          pageSize: Number(pageSize),
          total: Number(total),
          data: dataList,
        },
      }
    },
  },
]
