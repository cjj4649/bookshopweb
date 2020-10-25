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
  listMenu: {
    url: '/pc/menu/listMenu',
    method: 'post'
  },
  listMenuHome: {
    url: '/pc/menu/listMenuHome',
    method: 'post'
  },
  getMenu: {
    url: '/pc/menu/getMenu',
    method: 'post'
  },
  addMenu: {
    url: '/pc/menu/addMenu',
    method: 'post'
  },
  deleteMenu: {
    url: '/pc/menu/deleteMenu',
    method: 'post'
  },
  updateMenu: {
    url: '/pc/menu/updateMenu',
    method: 'post'
  },
  getTopOfColumn: {
    url: '/pc/topOfColumn/getTopOfColumn',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
