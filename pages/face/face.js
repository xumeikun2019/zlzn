// pages/face/face.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:""

  },
  uploadPhoto:function(){
    var that = this;
    var user = getApp().globalData.user;
    console.log(user);
    if (this.data.imgUrl != ''){

      wx.showModal({
        title: '确定覆盖原有照片吗',
        content: '',
        confirmText: "确定",
        cancelText: "取消",
        success: function (res) {
          if (res.confirm) {
         
            wx.chooseImage({
              success: function (res) {
                var tempFilePaths = res.tempFilePaths
                wx.uploadFile({
                  url: getApp().globalData.weburl + '/api/wxRequest/uploadImage.do',
                  filePath: tempFilePaths[0],
                  name: 'file',
                  formData: {
                    'user': user
                  },
                  success: function (res) {
                    console.log(res);
                    var data = res.data;
                    that.setData({
                      imgUrl: "http://127.0.0.1:8080" + res.data

                    })
                    wx.showModal({
                      title: '',
                      content: '上传成功',
                    })
                  }, fail: function (err) {
                    console.log(err);
                    wx.showModal({
                      title: '',
                      content: '上传失败',
                    })
                  }
                })
              }
            })
          } else {
            
          }
        }
      })
    }
    
     
    
  },
  takePhoto:function() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })

        wx.uploadFile({
          url: 'http://www.anweimin.top/miniprgram-php/server/index.php/home/index/login',
          filePath: this.data.src,
          name: 'file',
          success: (res) => {
            var data = res.data;
            console.log(data);

          }
        })
      }
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var openid = getApp().globalData.openid;
    var url = getApp().globalData.imgUrl;
    var that = this;
    wx.request({

      // url: getApp().globalData.weburl + '/api/wxRequest/approve/' +id+ '/P',
      url: getApp().globalData.weburl + '/api/wxRequest/face',

      method: 'GET',
      data: {
        openid: openid
      },

      success: function (res) {
        console.log(res);
        that.setData({
          imgUrl:url+res.data.data[0].feature


        })
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

  }
})