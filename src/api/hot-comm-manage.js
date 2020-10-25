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
  listHotGoods: {
    url: '/pc/hotGoods/listHotGoods',
    method: 'post'
  },
  listGoodsPicture: {
    url: '/pc/homePagePicture/listGoodsPicture',
    method: 'post'
  },
  addHotGoods: {
    url: '/pc/hotGoods/addHotGoods',
    method: 'post'
  },
  getHotGoods: {
    url: '/pc/hotGoods/getHotGoods',
    method: 'post'
  },
  deleteHotGoods: {
    url: '/pc/hotGoods/deleteHotGoods',
    method: 'post'
  },
  getHotGoodsShowNum: {
    url: '/pc/hotGoods/getHotGoodsShowNum',
    method: 'post'
  },
  updateHotGoods: {
    url: '/pc/hotGoods/updateHotGoods',
    method: 'post'
  },
  updateHotGoodsShowNum: {
    url: '/pc/hotGoods/updateHotGoodsShowNum',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
