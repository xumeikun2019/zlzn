// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bnrUrl:[{
      url: '../../images/banner.jpg',
      
    },{

        url: '../../images/banner2.png',
    }
    ],
    plateArray: [{
      url: '../news/news',
      image: '../../images/news.jpg',
      title: '消息通知'
    },
    {
      url: '../approval/approval',
      image: '../../images/approve.jpg',
      title: '代办审批'
    },
    {
      url: '../myCheck/myCheck',
      image: '../../images/check.jpg',
      title: '打卡记录'
    },
    {
      url: '../face/face',
      image: '../../images/face.jpg',
      title: '人脸采集'
    },
      {
        url: '../mettingCheck/mettingCheck',
        image: '../../images/check.png',
        title: '会议室签到'    
      }
      ,
      {
        url: '../signOut/signOut',
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

  },
  send:function(e){
    console.log(e)
    var a = wx.canIUse('requestSubscribeMessage');
    console.log(a);

    if (typeof wx.requestSubscribeMessage === 'function') {

      console.log("true");
    }

    console.log(wx.getSystemInfoSync().SDKVersion);
    wx.getSystemInfo({
      success: function (res) { console.log(res.version) },
    })
    const id = '1I8ayk8MwBSSqsvJ7b6AChxsk65fiTqy2wCWPqvrjc0'
    console.log(e);

    wx.requestSubscribeMessage({
      tmplIds: [id],

      success(res) {
        console.log(res)
        if (res[id] == 'accept') {
          //用户同意了订阅
          wx.showToast({
            title: '订阅成功'
          })
        } else {
          //用户拒绝了订阅或当前游戏被禁用订阅消息
          wx.showToast({
            title: '订阅失败'
          })
        }
      }
    })

   
  },message:function(e){

    var a = wx.canIUse('requestSubscribeMessage');
    console.log(a);

    if(typeof wx.requestSubscribeMessage === 'function') {

      console.log("true");
    }

    console.log(wx.getSystemInfoSync().SDKVersion);
    wx.getSystemInfo({
      success: function(res) {console.log(res.version)},
    })
    const id = '1I8ayk8MwBSSqsvJ7b6ACmBT9chNNs-PqaqdJ2xj7F4'
    console.log(e);
  
      wx.requestSubscribeMessage({
        tmplIds: [id],

        success(res) {
          console.log(res)
          if (res[id] == 'accept') {
            //用户同意了订阅
            wx.showToast({
              title: '订阅成功'
            })
          } else {
            //用户拒绝了订阅或当前游戏被禁用订阅消息
            wx.showToast({
              title: '订阅失败'
            })
          }
        }
      })

   
    
    
  }
})