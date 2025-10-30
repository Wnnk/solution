import { v4 as uuidv4 } from 'uuid'


export default [
  {
    url: '/api/areas', // 接口路径
    method: 'get',
    timeout: 1000,
    response: () => {
      const areas = [
        {
          id: uuidv4(),
          label: '北京',
          value: 'beijing'
        },
        {
          id: uuidv4(),
          label: '上海',
          value:'shanghai'
        },
        {
          id: uuidv4(),
          label: '广州',
          value:'guangzhou'
        }
      ]

      return {
        code:200,
        data: areas
      }
    }
  },
  {
    url: '/api/resources',
    timeout: 3000,
    response: () => {
      const resources = [
        {
          id: uuidv4(),
          label: '资源1',
          value: '1'
        },
        {
          id: uuidv4(),
          label: '资源2',
          value: '2'
        },
      ]

      return {
        code:200,
        data: resources
      }
    }
  }
]