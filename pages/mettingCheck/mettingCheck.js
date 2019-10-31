// pages/mettingCheck/mettingCheck.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }, 
  scan: function () {
    var that = this;
    var openid = getApp().globalData.openid;
    var show;
    wx.scanCode({
      success: (res) => {
        this.show = "结果:" + res.result + "二维码类型:" + res.scanType + "字符集:" + res.charSet + "路径:" + res.path;
        console.log(res);
        that.setData({
          show: this.show
        })
        wx.request({
          url: res.result +'&wechatId='+openid,
          method:'GET',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res);
            if (res.data.result == 'ok') {
              wx.showToast({
                title: '签到成功',
                icon: 'success',
                duration: 2000
              })
            } else {
              wx.showModal({
                title: '签到失败',
                content: '请重新签到',
              })
            }
          },
          fail: function (res) {
            console.log(".....fail.....");
          }
          
        })


      },
      fail: (res) => {
        wx.showToast({
          title: '扫描失败',
          icon: 'success',
          duration: 2000
        })
      },
      complete: (res) => {
      }
    })
  }

  
})