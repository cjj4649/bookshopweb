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
  listPicture: {
    url: '/pc/homepagePicture/listPicture',
    method: 'post'
  },
  usePicture: {
    url: '/pc/homepagePicture/usePicture',
    method: 'post'
  },
  addPicture: {
    url: '/pc/homepagePicture/addPicture',
    method: 'post'
  },
  listGoodsPicture: {
    url: '/pc/homepagePicture/listGoodsPicture',
    method: 'post'
  },
  deletePicture: {
    url: '/pc/homepagePicture/deletePicture',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
