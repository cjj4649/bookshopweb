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
//   getTableData: {
//     url: '/pc/goods/listGoods',
//     method: 'post'
//   },
//   updateGoods: {
//     url: '/pc/goods/updateGoods',
//     method: 'post'
//   },
//   saveGoods: {
//     url: '/pc/goods/saveGoods',
//     method: 'post'
//   },
//   deleteGoods: {
//     url: '/pc/goods/deleteGoods',
//     method: 'post'
//   },
//   searchGoods: {
//     url: '/pc/goods/getGoodsByGoodsCode',
//     method: 'post'
//   },
//   upDownGoods: {
//     url: '/pc/goods/upDownGoods',
//     method: 'post'
//   },
  listGoodsClass: {
    url: '/pc/goodsClass/listGoodsClass',
    method: 'post'
  },
  listAllGoodsClassify: {
    url: '/pc/goodsClassify/listAllGoodsClassify',
    method: 'post'
  },
  addGoodsClassify: {
    url: '/pc/goodsClassify/addGoodsClassify',
    method: 'post'
  },
  getGoodsClassify: {
    url: '/pc/goodsClassify/getGoodsClassify',
    method: 'post'
  },
  updateGoodsClassify: {
    url: '/pc/goodsClassify/updateGoodsClassify',
    method: 'post'
  },
  deleteGoodsClassify: {
    url: '/pc/goodsClassify/deleteGoodsClassify',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
