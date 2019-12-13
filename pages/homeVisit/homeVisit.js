// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bnrUrl: [{
      url: '../../images/banner.jpg',

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
      url: '../signOut/signOut',
        image: '../../images/quit.png',
        title: '退出登录'
      }
    ]


  }
})