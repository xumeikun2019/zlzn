// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bnrUrl: [{
      url: '../../images/banner.jpg',

    }, {

      url: '../../images/banner2.png',
    }
    ],
    plateArray: [{
      url: '../order/order',
      image: '../../images/order.png',
      title: '访客预约'
    },
    {
      url: '../myOrder/myOrder',
      image: '../../images/myorder.png',
      title: '访客记录'
    }
    ,{
      url: '../login/login',
        image: '../../images/quit.png',
        title: '退出登录'
      }
    ]


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

  }
})