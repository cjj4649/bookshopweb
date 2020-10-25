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
  updateStore: {
    url: '/pc/store/updateStore',
    method: 'post'
  },
  getTableData: {
    url: '/pc/store/listStore',
    method: 'post'
  },
  getStore: {
    url: '/pc/store/getStore',
    method: 'post'
  },
  addStore: {
    url: '/pc/store/addStore',
    method: 'post'
  },
  deleteStore: {
    url: '/pc/store/deleteStore',
    method: 'post'
  },
  listArea: {
    url: '/pc/selectCombox/listArea',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
