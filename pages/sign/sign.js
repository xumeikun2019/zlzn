// pages/sign/sign.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pwd:"",
    user:"",
    redirect: "",
    imgurl: getApp().globalData.imgUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     console.log(getApp().globalData.openid+"----")
    var openid = getApp().globalData.openid;
    wx.request({

      url: getApp().globalData.weburl + '/api/wxRequest/sign/'+openid,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
       
        console.log(res);
        if(res.data.data.length > 0){
          getApp().globalData.user = res.data.data[0].username;
          getApp().globalData.userid = res.data.data[0].id;
          getApp().globalData.role = res.data.data[0].role;
          wx.reLaunch({
            url: '../home/home',
          })
        }
      },
      fail: function (res) {
        console.log(".....fail.....");
        wx.showModal({
          title: '登录失败',
          content: '请检查网络链接。。。',
        })
      }
    })

  },

  
  sign:function(e){
    
  
    var that = this ;
    console.log(this.data.redirect)

    if(this.data.redirect == ''){
      console.log(getApp().globalData.openid);
      console.log(this.data.pwd);
      var openid = getApp().globalData.openid;
      wx.request({

        url: getApp().globalData.weburl + '/api/wxRequest/sign.do',
        data: {
          openId: openid,
          pwd: this.data.pwd,
          user: this.data.user
        },
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log("+++++++++++")
          console.log(res)
         
          if (res.data.result != "fail"){
            if(res.data.message == "signed"){
              wx.showModal({
                title: '登录失败',
                content: '账号已经登录',
              })
              return;
            }
            getApp().globalData.userid = res.data.data.id;
            getApp().globalData.user = that.data.user;
            getApp().globalData.role = res.data.data.role;
            wx.reLaunch({
              url: '../home/home',
            })
          } else {
            wx.showModal({
              title: '登录失败',
              content: '账号或密码输入错误',
            })
          }
        },
        fail: function (res) {
          console.log(".....fail.....");
          wx.showModal({
            title: '登录失败',
            content: '请检查网络链接。。。',
          })
        }
      })
    } 


  },

  signVisit: function(e){

    wx.reLaunch({
      url: '../homeVisit/homeVisit',
    })
  },
  initpwd: function (e) {
    console.log(e);
    var pwd = this.data.pwd;
    pwd = e.detail.value;
    this.setData({

      pwd: pwd
    })
  },
  inituser: function (e) {
    
    var user = this.data.user;
    user = e.detail.value;
    this.setData({

      user: user
    })


  },
  initcheck: function(e) {
    console.log(e.detail.value)
    if (e.detail.value == ''){
      this.setData({
        redirect :'1'

      })

    } else {

      this.setData({
        redirect: '0'

      })
    }
  }
})