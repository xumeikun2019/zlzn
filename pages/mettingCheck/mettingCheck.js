// pages/mettingCheck/mettingCheck.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifName:false //是否显示密码输入框

  },
  //获取密码输入框的值
  setValue:function(e){
    console.log(e)
    this.setData({
      pwd: e.detail.value

    })

  },
  //输入密码后确认
  confirm:function(e){
    var openid = getApp().globalData.openid;
    var pwd = this.data.pwd
    console.log(this.data.url + '&wechatId=' + openid+ '&yzm=' +pwd);
    this.setData({
      ifName: false,
      pwd: ""
    })
    wx.request({
      url: this.data.url + '&wechatId=' + openid + '&yzm=' +pwd,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //console.log(res);
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
        wx.showModal({
          title: '签到失败',
          content: '请检查网络链接。。。',
        })
      }

    })


  },
  cancel: function () {
    this.setData({
      ifName: false, 
      pwd: ""
    })
  },
  //扫描二维码
  scan: function () {
    var that = this;
    var openid = getApp().globalData.openid;
    var show;
    wx.scanCode({
      success: (res) => {
        console.log(res);
        this.show = "结果:" + res.result + "二维码类型:" + res.scanType + "字符集:" + res.charSet + "路径:" + res.path;
        that.setData({
          show: this.show,
          //扫描结果url
          url: res.result
        })
        //查询是否为领导
        wx.request({
          url: getApp().globalData.weburl + '/api/wxRequest/leader.do',
          method: 'GET',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            user: getApp().globalData.user
          },
          success: function (res) {
           //是领导直接签到
           // if (res.data == 'true') {
            console.log(that.data.url + '&wechatId=' + openid + '&yzm= ');
              wx.request({
                url: that.data.url + '&wechatId=' + openid + '&yzm= ' ,
                method: 'GET',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                  //console.log(res);
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
                  wx.showModal({
                    title: '签到失败',
                    content: '请检查网络链接。。。',
                  })
                }

              })

             
            // } else {
            //   //不是领导显示密码框
            //   that.setData({

            //     ifName:true
            //   })

            // }
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