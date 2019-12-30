// pages/myMeetOrder/myMeetOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.findMeetList();

  },
  findMeetList: function() {
    var that = this;
    var userId = getApp().globalData.userid;
    wx.request({

      url: getApp().globalData.weburl + '/api/wxRequest/myOrder',
      method: 'GET',
      data: {
        userId: userId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res);
        that.setData({

          meetList: res.data.data
        })
        console.log(that.data.meetList)
      },
      fail: function(res) {
        console.log(".....fail.....");
        wx.showModal({
          title: '查询失败',
          content: '请检查网络链接。。。',
        })
      }
    })

  },
  cancleMeet(e) {
    var that = this;
    var id = e.currentTarget.dataset.index
    wx.request({
      url: getApp().globalData.weburl + '/api/wxRequest/cancleMeet',
      method: 'GET',
      data: {
        id: id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
       if(res.data.result == "ok"){
         wx.showModal({
           title: '',
           content: '取消成功。',
         })
         that.findMeetList();
       }else{
         wx.showModal({
           title: '',
           content: '取消失败。',
         })

       }
      },
      fail: function(res) {
        console.log(".....fail.....");
        wx.showModal({
          title: '查询失败',
          content: '请检查网络链接。。。',
        })
      }
    })
  }
})