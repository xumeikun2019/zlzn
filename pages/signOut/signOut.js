// pages/signOut/signOut.js
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
    var openId = getApp().globalData.openid;
    wx.showModal({
      title: '退出登录',
      content: '确定退出？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击主操作')
          wx.request({

            // url: getApp().globalData.weburl + '/api/wxRequest/approve/' +id+ '/P',
            url: getApp().globalData.weburl + '/api/wxRequest/users/'+openId,
            method: 'PUT',
            success: function (res) {
              wx.showToast({
                title: '解除成功',
                icon: 'success',
                duration: 20000
              })
              wx.reLaunch({
                url: '../login/login',
              })
            },
            fail: function (res) {
              console.log(".....fail.....");
            }
          })

        } else {
          wx.reLaunch({
            url: '../home/home',
          })
       
        }
      }
    })

  }
})