// pages/news/news.js
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
    var that = this;
    var openid = getApp().globalData.openid;
    wx.request({
      url: getApp().globalData.weburl + '/api/wxRequest/messages/'+openid+'',
      method: 'get',
    
      success: function (res) {
        console.log(res);

        var message = [];
        var messagelist = [];
        for (var i = 0; i < res.data.data.length; i++){
          message[i] = res.data.data[i].content
          messagelist[i] = message[i].split(";");
          messagelist[i].push("消息时间："+res.data.data[i].date);

        }
        console.log(messagelist);
        that.setData({
          messageList: messagelist,
          messages: res.data.data

        })
        console.log(that.data.messages);

      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })


  }
 
})