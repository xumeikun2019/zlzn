
Page({
  data: {
    listData: [
     
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