// pages/sign/sign.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pwd:"",
    user:"",
    redirect:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     console.log(getApp().globalData.openid)
    var openid = getApp().globalData.openid;
    wx.request({

      url: getApp().globalData.weburl + '/api/wxRequest/sign/'+openid,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if(res.data.data.length > 0){
          getApp().globalData.user = res.data.data[0].username;
          wx.reLaunch({
            url: '../home/home',
          })
        }
      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })

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
  sign:function(e){
    
  
    var that = this ;
    console.log(this.data.redirect)

    if(this.data.redirect == ''){

   
      console.log(getApp().globalData.openid);
      console.log(this.data.pwd);
      var openid = getApp().globalData.openid;
      wx.request({

        url: getApp().globalData.weburl + '/api/wxRequest/sign.do',
        data: {
          openId: openid,
          pwd: this.data.pwd,
          user: this.data.user
        },
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          
          if (res.data == true){
            console.log(res.data)
            getApp().globalData.user = that.data.user;
            wx.reLaunch({
              url: '../home/home',
            })
          } else {
            wx.showModal({
              title: '登录失败',
              content: '账号或密码输入错误',
            })
          }
        },
        fail: function (res) {
          console.log(".....fail.....");
        }
      })
    } 


  },

  signVisit: function(e){

    wx.reLaunch({
      url: '../homeVisit/homeVisit',
    })
  },
  initpwd: function (e) {
    console.log(e);
    var pwd = this.data.pwd;
    pwd = e.detail.value;
    this.setData({

      pwd: pwd
    })
  },
  inituser: function (e) {
    
    var user = this.data.user;
    user = e.detail.value;
    this.setData({

      user: user
    })


  },
  initcheck: function(e) {
    console.log(e.detail.value)
    if (e.detail.value == ''){
      this.setData({
        redirect :'1'

      })

    } else {

      this.setData({
        redirect: '0'

      })
    }
  }
})