Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: false,
    imgurl:getApp().globalData.imgurl
  },

  onLoad: function () {
    var that = this ;
    // console.log("====="+getApp().globalData.openid);
    wx.login({
      success: res => {
        console.log(res.code);
        //that.registerFormSubmit();
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          // 这里的 url 是微信官方提供的可以在小程序中直接通过 code 来获取 openid 的
          // 根据解释，补上自己的 APPID 和 SECRET
          url: getApp().globalData.weburl + '/api/wxRequest/login.do',
          data: {
            code: res.code
          },
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: res => {

            console.log(res.data.openid);
            getApp().globalData.openid = res.data.openid;
            //console.log(getApp().globalData.openid);
          }
        })


      }
    })
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
             
              // console.log("userinfo" + res.userInfo.avatarUrl);
              // 可以将 res 发送给后台解码出 unionId
              getApp().globalData.userInfo = res.userInfo


              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (getApp().userInfoReadyCallback) {
                getApp().userInfoReadyCallback(res)
              }
            }
          })
          wx.redirectTo({
            url: '../sign/sign'
          })
        }

      }
    })
  },
  registerFormSubmit: function (e) {
    console.log(e);
    getApp().globalData.formId = e.detail.formId;

  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      //console.log("++++++" + e.detail.userInfo.avatarUrl);
      getApp().globalData.userInfo = e.detail.userInfo
      this.setData({
        hasUserInfo: true
      })

     
      wx.redirectTo({
        url: '../sign/sign'
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
 
})
