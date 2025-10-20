import { v4 as uuidv4 } from 'uuid'

export default [
  {
    url: '/api/getSuperOptions', // 接口路径
    method: 'get',
    timeout: 3000,
    response: (config) => {
      const total = Math.floor(Math.random() * 401) + 100
      const getCity = () => {
        const prefixes = ['北京', '上海', '广州', '深圳', '杭州', 
          '苏州', '成都', '武汉','南京','天津','重庆','西安','长沙','郑州',
          '青岛','大连','宁波','厦门','福州','济南','哈尔滨','沈阳','石家庄',
          '太原','西安','长春','合肥','武汉','南京','长沙','南昌','郑州','天津',
          '南宁','银川','兰州','乌鲁木齐','西宁','银川','拉萨','昆明','乌兰察布',
          '呼和浩特','石河子','吉林','呼伦贝尔','乌海','塔城','香港','澳门',
        ]
        return prefixes[Math.floor(Math.random() * prefixes.length)]
      }

      const dataList = []
      for (let i = 0; i < total; i++) {
        dataList.push({
          label: `${getCity()}-${i}`,
          value: uuidv4(),
        })
      }

      return {
        code: 200,
        message: '请求成功',
        data: {
          data: dataList,
        },
      }
    },
  }
]