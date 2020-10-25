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
  getlistDrivers: {
    url: '/pc/driver/listDriver',
    method: 'post'
  },
  deleteDriver: {
    url: '/pc/driver/deleteDriver',
    method: 'post'
  },
  listArea: {
    url: '/pc/selectCombox/listArea',
    method: 'post'
  },
  searchdriver: {
    url: '/pc/driver/getDriver',
    method: 'post'
  },
  updateDriver: {
    url: '/pc/driver/updateDriver',
    method: 'post'
  },
  addDriver: {
    url: '/pc/driver/addDriver',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
