import { v4 as uuidv4 } from 'uuid';
export default [
  {
    url: '/getColumns', // 接口路径
    method: 'get', // 请求方法
    response: () => { // 响应函数
     const data =  [
        {
            type: "selection",
            key: uuidv4(),
            width: 50,
            visible: true,
            fixed: false,
            label: "selection"
        },
        {
            label: "ID",
            prop: "id",
            key: uuidv4(),
            width: 100,
            visible: true,
        },
        {
            label: "项目名称",
            prop: "proName",
            key: uuidv4(),
            width: 180,
            visible: true,
            fixed: false,
        },
        {
            label: "客户名称",
            prop: "cusName",
            key: uuidv4(),
            width: 180,
            visible: true,
            fixed: false,
        },
        {
            label: "项目状态",
            prop: "status",
            key: uuidv4(),
            width: 100,
            visible: true,
            fixed: false,
        },
        {
            label: "项目负责人",
            prop: "proLeader",
            width: 100,
            key: uuidv4(),
            visible: true,
            fixed: false,
        },
        {
            label: "项目总金额",
            prop: "projectTotalAmount",
            key: uuidv4(),
            width: 100,
            visible: true,
            fixed: false,
        },
        {
            label: "项目已回款",
            prop: "projectReceivedAmount",
            width: 100,
            key: uuidv4(),
            visible: true,
            fixed: false,
        },
        {
            label: "项目剩余应收账款",
            prop: "projectRemainingReceivable",
            width: 100,
            key: uuidv4(),
            visible: true,
            fixed: false,
        },
        {
            label: "项目估计成本",
            prop: "projectEstimatedCost",
            width: 100,
            key: uuidv4(),
            visible: true,
            fixed: false,
        },
        {
            label: "项目已付成本",
            prop: "projectPaidCost",
            width: 100,
            key: uuidv4(),
            visible: true,
            fixed: false,
        },
        {
          label: "创建时间",
          prop: "createTime",
          key: uuidv4(),
          visible: true,
          fixed: false,
        },
    ]
      return {
        code: 0, // 自定义状态码
        message: 'success', // 状态信息
        data: data, // 返回数据
      }
    }
  },
  {
    url: '/getTable', // 接口路径
    method: 'get', // 请求方法
    response: (config) => { // 响应函数，接收config参数获取请求信息
      // 获取请求参数中的page和pageSize，设置默认值
      const query = config.query || {}; // 从config中获取查询参数
      const page = parseInt(query.page) || 1;
      const pageSize = parseInt(query.pageSize) || 10;
      // 生成总数据量（100-500之间）
      const total = Math.floor(Math.random() * 401) + 100;

      // 计算当前页数据起始索引
      const startIndex = (page - 1) * pageSize;

      // 计算当前页实际数据量（最后一页可能不足pageSize）
      const currentDataCount = startIndex >= total ? 0 : Math.min(pageSize, total - startIndex);

      // 生成项目状态列表
      const statusList = ['进行中', '已完成', '未开始', '暂停'];

      // 生成随机中文姓名
      function getChineseName() {
        const familyNames = ['张', '王', '李', '赵', '陈', '杨', '黄', '吴', '周', '徐'];
        const givenNames = ['伟', '芳', '娜', '秀英', '敏', '静', '强', '磊', '军', '洋'];
        return familyNames[Math.floor(Math.random() * familyNames.length)] +
          givenNames[Math.floor(Math.random() * givenNames.length)];
      }

      // 生成随机项目名称
      function getProjectName() {
        const prefixes = ['企业', '电商', '金融', '教育', '医疗', '物流', '科技', '文化'];
        const middles = ['管理', '服务', '交易', '分析', '集成', '智能', '数据', '信息'];
        const suffixes = ['系统', '平台', '项目', '工程', '架构', '模块', '应用', '方案'];
        return prefixes[Math.floor(Math.random() * prefixes.length)] +
          middles[Math.floor(Math.random() * middles.length)] +
          suffixes[Math.floor(Math.random() * suffixes.length)];
      }

      // 生成随机公司名称
      function getCompanyName() {
        const prefixes = ['北京', '上海', '广州', '深圳', '杭州', '苏州', '成都', '武汉'];
        const middles = ['恒通', '远大', '诚信', '创新', '聚力', '宏图', '盛世', '华夏'];
        const suffixes = ['科技有限公司', '信息技术有限公司', '发展有限公司', '集团有限公司'];
        return prefixes[Math.floor(Math.random() * prefixes.length)] +
          middles[Math.floor(Math.random() * middles.length)] +
          suffixes[Math.floor(Math.random() * suffixes.length)];
      }

      // 生成当前页数据
      const dataList = [];
      for (let i = 0; i < currentDataCount; i++) {
        // 生成总金额（50000-1000000，步长1000）
        const projectTotalAmount = Math.floor(Math.random() * 951) * 1000 + 50000;

        // 生成已回款金额（总金额的0-100%）
        const receivedRatio = Math.random();
        const projectReceivedAmount = Math.round(projectTotalAmount * receivedRatio);

        // 剩余应回款 = 总金额 - 已回款
        const projectRemainingReceivable = projectTotalAmount - projectReceivedAmount;

        // 预计成本（总金额的40%-80%）
        const estimatedRatio = 0.4 + Math.random() * 0.4;
        const projectEstimatedCost = Math.round(projectTotalAmount * estimatedRatio);

        // 已付成本（预计成本的0-100%）
        const paidRatio = Math.random();
        const projectPaidCost = Math.round(projectEstimatedCost * paidRatio);

        dataList.push({
          id: startIndex + i + 1,
          proName: getProjectName(),
          cusName: getCompanyName(),
          status: statusList[Math.floor(Math.random() * statusList.length)],
          proLeader: getChineseName(),
          projectTotalAmount: parseFloat(projectTotalAmount.toFixed(2)),
          projectReceivedAmount: parseFloat(projectReceivedAmount.toFixed(2)),
          projectRemainingReceivable: parseFloat(projectRemainingReceivable.toFixed(2)),
          projectEstimatedCost: parseFloat(projectEstimatedCost.toFixed(2)),
          projectPaidCost: parseFloat(projectPaidCost.toFixed(2)),
          createTime: `${2023 - Math.floor(Math.random() * 2)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
        });
      }

      // 构造响应数据
      return {
        code: 200,
        message: 'success',
        data: {
          list: dataList,
          total: total, // 增加总条数返回，方便分页
          page: page,
          pageSize: pageSize
        }
      };
    }
  }
]
