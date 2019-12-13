// pages/endMeets/endMeets.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    ifName: false


  },

  later:function(){
    this.setData({

      ifName: true
    })

  },

  setValue: function (e) {
    console.log(e)
    this.setData({
      time: e.detail.value

    })

  },

  setValueReason: function (e) {
    console.log(e)
    this.setData({
      reason: e.detail.value

    })

  },
  cancel: function () {
    this.setData({
      ifName: false,
      time: ""
    })
  },
  //输入密码后确认
  confirm: function (e) {
    //var openid = getApp().globalData.openid;
    var time = this.data.time
    var reason = this.data.reason
    var id = 'fb1091c9118211ea87e700e081bbbd32';
    //console.log(this.data.url + '&wechatId=' + openid + '&yzm=' + pwd);
   var that = this ;
    wx.request({
      url: getApp().globalData.weburl + '/api/wxRequest/delay.do'+ '?id=' + id + '&data=' + reason + '&date=' + time,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //console.log(res);
        if (res.data.result == 'ok') {
          wx.showToast({
            title: '延时成功',
            icon: 'success',
            duration: 2000
          })
        } else {
          wx.showModal({
            title: '延时成功',
            content: '请重新操作',
          })
        }
        that.setData({
          ifName: false,
          time: "",
          reason:""
        })
      },
      fail: function (res) {
        console.log(res);
        console.log(".....fail.....");
        that.setData({
          ifName: false,
          time: "",
          reason: ""
        })
      }

    })


  },
  end:function(){
    var that = this;
    wx.request({
      url: getApp().globalData.weburl +'/api/wxRequest/end',
      method: 'get',
      data: {
        id: 'fb1091c9118211ea87e700e081bbbd32',
       
      },

      success: function (res) {
        console.log(res);
        if(res.data == 'OK'){
          wx.showModal({
            title: '会议结束',
            content: '成功',
          })
        } else{
          wx.showModal({
            title: '会议结束',
            content: '失败',
          })

        }

      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })

  },
  onLoad: function (options){
    var that = this ;
    wx.request({
      url: getApp().globalData.weburl + '/api/wxRequest/meets/fb1091c9118211ea87e700e081bbbd32',
      method: 'get',
      // data: {
      //   id: 'fb1091c9118211ea87e700e081bbbd32',
      // },
      success: function (res) {
        console.log(res.data.data);
        that.setData({

          meet: res.data.data[0]

        })
        console.log(that.data.meet);

      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })
  }
})