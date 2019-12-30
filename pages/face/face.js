// pages/face/face.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:""

  },
  //上传照片
  uploadPhoto:function(){
    var that = this;
    var user = getApp().globalData.user;
    var imgurl = getApp().globalData.imgUrl;
    console.log(this.data.imgUrl);
    if (this.data.imgUrl != ''){

      wx.showModal({
        title: '确定覆盖原有照片吗',
        content: '',
        confirmText: "确定",
        cancelText: "取消",
        success: function (res) {
          if (res.confirm) {
         
            wx.chooseImage({
              count:1,
              sizeType: ['compressed'],
              success: function (res) {
                var tempFilePaths = res.tempFilePaths
                console.log(res);
                that.compressionImage(tempFilePaths)
               
              }
            })
          } else {
            
          }
        }
      })
    } else {
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        success: function (res) {
          var tempFilePaths = res.tempFilePaths
          console.log(res);
          that.compressionImage(tempFilePaths)

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
    var url = getApp().globalData.imgUrl+"/finance/upload/common/";
    var that = this;
    //加载上传照片
    wx.request({

      // url: getApp().globalData.weburl + '/api/wxRequest/approve/' +id+ '/P',
      url: getApp().globalData.weburl + '/api/wxRequest/face',

      method: 'GET',
      data: {
        openid: openid
      },

      success: function (res) {
        console.log(res.data.data[0].feature);
        //有照片直接显示
        if (res.data.data[0].feature!=""){
          console.log(res.data.data[0].feature);
          that.setData({
            imgUrl:url+res.data.data[0].feature
          })
        }
      },
      fail: function (res) {
        console.log(".....fail.....");
        wx.showModal({
          title: '加载失败',
          content: '请检查网络链接。。.',
        })
      }
    })

  },
  /**压缩图片 */
  compressionImage(tempFilePaths) {
    let that = this
    wx.getImageInfo({
      src: tempFilePaths[0],
      success: function (res) {
        var ctx = wx.createCanvasContext('photo_canvas');
        //设置canvas尺寸
        var towidth = 350; //按宽度350px的比例压缩
        var toheight = Math.trunc(350 * res.height / res.width);
        that.setData({
          canvas_h: toheight
        })
        ctx.drawImage(tempFilePaths[0], 0, 0, res.width, res.height, 0, 0, towidth, toheight)
        that.createMap(ctx);
      }
    })
  },
  /**创建画布并上传图片 */
  createMap(ctx) {
    var user = getApp().globalData.user;
    var imgurl = getApp().globalData.imgUrl + "/finance/upload/common/";
    let that = this;
    ctx.draw(true, function () {
      wx.showLoading({
        title: '压缩中',
      })
      setTimeout(() => {
        wx.canvasToTempFilePath({
          canvasId: 'photo_canvas',
          fileType: "jpg",
          quality:0.3,
          success: function (res) {
            wx.hideLoading();
            wx.showLoading({
              title: '上传中',
            })
            wx.uploadFile({
              url: getApp().globalData.weburl + '/api/wxRequest/uploadImage.do',
              filePath: res.tempFilePath,
              name: 'file',
              formData: {
                'user': user
              },
              success: function (res) {
                wx.hideLoading();
                console.log(res);
                if (JSON.parse(res.data).message=="success"){
                  console.log(JSON.parse(res.data).data);
                  that.setData({
                    imgUrl: imgurl + JSON.parse(res.data).data

                  })
                  wx.showModal({
                    title: '',
                    content: '上传成功',
                  })

                } else {
                  var returnText = JSON.parse(res.data).data.split("'")[1];
                  console.log(JSON.parse(res.data).data.split("'")[1]);
                  wx.showModal({
                    title: '',
                    content: returnText,
                  })
                }
                
               
               
              }, fail: function (err) {
                wx.hideLoading();
                console.log(err);
                wx.showModal({
                  title: '',
                  content: '上传失败',
                })
              }
            })
          },
          fail(res) {
            if (res.errMsg === "canvasToTempFilePath:fail:create bitmap failed") {
              console.log("导出map失败")
            }
            wx.showModal({
              title: '上传失败',
              content: '请检查网络链接。。.',
            })
          }
        }, this)
      }, 200);

    })
  },
})