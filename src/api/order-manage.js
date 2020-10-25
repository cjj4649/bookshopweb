import req from '../fetch/index.js'

const config = {
  // portExport: {
  //   url: '/api/media/stimulate/exportExcel',
  //   method: 'post',
  //   fileConfig: {
  //     type: 'file',
  //     fileName: '销售激励报表'
  //   }
  // },
  listOrder: {
    url: '/pc/order/listOrder',
    method: 'post'
  },
  getOrderByOrderCode: {
    url: '/pc/order/getOrderByOrderCode',
    method: 'post'
  },
  updateOrderStatus: {
    url: '/pc/order/updateOrderStatus',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
