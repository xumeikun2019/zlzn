
Page({
  data: {
    listData: [
      // { "date": "2019/01/01 08:00:00", "time": "张三", "content": "审核中" },
      // { "date": "2019/01/01 08:00:00", "time": "李四", "content": "审核中" },
      // { "date": "2019/01/01 08:00:00", "time": "王五", "content": "审核通过" }
    ]
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this 
    var openid = getApp().globalData.openid;
    wx.request({
      url: getApp().globalData.weburl + '/api/wxRequest/findVisits.do',
      data: {
        weid: openid
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {

        console.log(".....success.....");
        console.log(res.data.data);
        that.setData({

          listData: res.data.data
          

        })

        console.log(that.data.listData)
      }, 
      fail: function (res) {
        console.log(".....fail.....");
      }
    
    })
  }
})