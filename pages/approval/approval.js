// pages/approval/approval.js
Page({
  //事件处理函数
  approval: function (e) {
    var that = this;
    
    var id = e.currentTarget.dataset.index;
    wx.showModal({
      title: '审批',
      content: '',
      confirmText: "通过",
      cancelText: "不通过",
      success: function (res) {
        console.log(e.currentTarget.dataset.index);
        if (res.confirm) {
          console.log('用户点击主操作')
          wx.request({

           // url: getApp().globalData.weburl + '/api/wxRequest/approve/' +id+ '/P',
            url: getApp().globalData.weburl + '/api/wxRequest/approve',

            method: 'PUT',
            data :{
              state : 'P',
              id : id
            },
            
            success: function (res) {

              wx.showModal({
                title: '审批通过',
                content: '成功',
              })
              that.onLoad();
            },
            fail: function (res) {
              console.log(".....fail.....");
            }
          })

        } else {
          console.log('用户点击辅助操作')

          wx.request({

            // url: getApp().globalData.weburl + '/api/wxRequest/approve/' +id+ '/P',
            url: getApp().globalData.weburl + '/api/wxRequest/approve',

            method: 'PUT',
            data: {
              state: 'N',
              id: id
            },

            success: function (res) {
              wx.showModal({
                title: '审批不通过',
                content: '成功',
              })
              that.onLoad();
            },
            fail: function (res) {
              console.log(".....fail.....");
            }
          })
        }
      }
    });
  },
  /**
   * 页面的初始数据
   */
  data: {
    approvalList:[]


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this ;
    var user = getApp().globalData.user;

    console.log(user)
    wx.request({

      url: getApp().globalData.weburl + '/api/wxRequest/approve/' + user +'',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {

        that.setData({

         approvalList: res.data.data
       })
        console.log(that.data.approvalList)
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
  send:function(){
    var that = this ;
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxf6895363b78538f5&secret=309e638b48c60d5a886d5ee2a33e7398'
      ,header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          token: res.data.access_token
        })
      }
  
    })

    var _access_token = that.data.token;
     let url = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + _access_token
      ; let _jsonData = {
          access_token: _access_token,
          touser: openid,
          template_id: '_CfGS7SqVyNPg9Op8OXzMp6aOl7X9rCkrRfiMcccms8',
          form_id: e.detail.formId,
          page: "pages/index/index",
          data: {
            "keyword1": { "value": "测试数据一", "color": "#173177" },
            "keyword2": { "value": "测试数据二", "color": "#173177" },
            "keyword3": { "value": "测试数据三", "color": "#173177" },
            "keyword4": { "value": "测试数据四", "color": "#173177" },
          }
       }
     wx.request({
        url: url,
        data: data,
        method: method,
        success: function (res) {
           console.log(res)
        },
        fail: function (err) {
           console.log('request fail ', err);
        },
        complete: function (res) {
           console.log("request completed!");
        }
     })

  }
})