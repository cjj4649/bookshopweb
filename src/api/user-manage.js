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
  updateUser: {
    url: '/pc/user/updateUser',
    method: 'post'
  },
  getTableData: {
    url: '/pc/user/listUsers',
    method: 'post'
  },
  searchuser: {
    url: '/pc/user/getUserByUserCode',
    method: 'post'
  },
  adduser: {
    url: 'pc/user/saveUser',
    method: 'post'
  },
  deletuser: {
    url: '/pc/user/deleteUser',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
