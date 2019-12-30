// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bnrUrl:[
    ]


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("role"+getApp().globalData.role);
    
    if (getApp().globalData.role.indexOf("c88fcb9800fa11ea875400e081bbbd32") != '-1') {

      this.setData({

        bnrUrl: [{
          url: '../../images/banner.jpg',

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
            url: '../meetOrder/meetOrder',
            image: '../../images/order.png',
            title: '会议预约'
          },
          {
            url: '../myMeetOrder/myMeetOrder',
            image: '../../images/myOrder.png',
            title: '我的预约'
          },
          {
            url: '../meets/meets',
            image: '../../images/news.jpg',
            title: '我的会议'
          },
        {
          url: '../leaderMeets/leaderMeets',
          image: '../../images/leader.png',
          title: '领导会议'
        },

        {
          url: '../companyMeets/companyMeets',
          image: '../../images/company.png',
          title: '公司会议'
        }
          ,
        {
          url: '../face/face',
          image: '../../images/face.jpg',
          title: '人脸采集'
        },
        {
          url: '../mettingCheck/mettingCheck',
          image: '../../images/check.png',
          title: '会议签到'
        },
        {
          url: '../myCheck/myCheck',
          image: '../../images/check.jpg',
          title: '打卡记录'
        }
      
          ,
        {
          url: '../signOut/signOut',
          image: '../../images/quit.png',
          title: '退出登录'
        }

        ]

      })

    } else {
      this.setData({

        bnrUrl: [{
          url: '../../images/banner.jpg',

        }],
        plateArray: [{
          url: '../news/news',
          image: '../../images/news.jpg',
          title: '消息通知'
        },
        {
          url: '../meetOrder/meetOrder',
          image: '../../images/order.png',
            title: '会议预约'
          },
          {
            url: '../myMeetOrder/myMeetOrder',
            image: '../../images/myOrder.png',
            title: '我的预约'
          },
          {
            url: '../meets/meets',
            image: '../../images/news.jpg',
            title: '我的会议'
          },
        {
          url: '../approval/approval',
          image: '../../images/approve.jpg',
          title: '待办审批'
        },
        // {
        //   url: '../leaderMeets/leaderMeets',
        //   image: '../../images/leader.png',
        //   title: '领导会议'
        // },

        // {
        //   url: '../companyMeets/companyMeets',
        //   image: '../../images/company.png',
        //   title: '公司会议'
        // }
        //   ,
        {
          url: '../face/face',
          image: '../../images/face.jpg',
          title: '人脸采集'
        },
        {
          url: '../mettingCheck/mettingCheck',
          image: '../../images/check.png',
          title: '会议签到'
        },
        {
          url: '../myCheck/myCheck',
          image: '../../images/check.jpg',
          title: '打卡记录'
        }
          // ,
          // {
          //   url: '../meets/meets',
          //   image: '../../images/check.jpg',
          //   title: '会议记录'
          // }
          ,
        {
          url: '../signOut/signOut',
          image: '../../images/quit.png',
          title: '退出登录'
        }

        ]
      })

    }

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