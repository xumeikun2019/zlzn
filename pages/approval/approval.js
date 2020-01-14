// pages/approval/approval.js
Page({
  //事件处理函数
  approval: function(e) {
    var that = this;

    var id = e.currentTarget.dataset.index;
    wx.showModal({
      title: '审批',
      content: '',
      confirmText: "通过",
      cancelText: "不通过",
      success: function(res) {
        console.log(e.currentTarget.dataset.index);
        if (res.confirm) {
          console.log('用户点击主操作')
          wx.request({

            // url: getApp().globalData.weburl + '/api/wxRequest/approve/' +id+ '/P',
            url: getApp().globalData.weburl + '/api/wxRequest/approve',

            method: 'PUT',
            data: {
              state: 'P',
              id: id
            },

            success: function(res) {
              console.log(res);
              if (res.data.result == 'ok'){
                wx.showModal({
                  title: '审批通过',
                  content: '成功',
                })
              } else {
                wx.showModal({
                  title: '审批失败',
                  content: '请重试',
                })
                return;
              }
              that.findVisiterList()
            },
            fail: function(res) {
              console.log(".....fail.....");
              wx.showModal({
                title: '审批失败',
                content: '请检查网络链接。。。',
              })
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

            success: function(res) {

              if (res.data.result == 'ok') {
                wx.showModal({
                  title: '审批不通过',
                  content: '成功',
                })
              } else {
                wx.showModal({
                  title: '审批失败',
                  content: '请重试',
                })
                return;
              }
             
              that.onLoad();
            },
            fail: function(res) {
              console.log(".....fail.....");
              wx.showModal({
                title: '审批失败',
                content: '请检查网络链接。。。',
              })
            }
          })
        }
      }
    });
  },
  approvalMeet: function(e) {
    var that = this;
    var user = getApp().globalData.user;
    var id = e.currentTarget.dataset.index;
    console.log(id);
    wx.showModal({
      title: '审批',
      content: '',
      confirmText: "通过",
      cancelText: "不通过",
      success: function(res) {
        console.log(e.currentTarget.dataset.index);
        if (res.confirm) {
          console.log('用户点击主操作')
          wx.request({

            // url: getApp().globalData.weburl + '/api/wxRequest/approve/' +id+ '/P',
            url: getApp().globalData.weburl + '/api/wxRequest/approve/3/' + user + '/' + id,
            method: 'PUT',
            success: function(res) {

              wx.showModal({
                title: '审批通过',
                content: '成功',
              })
              that.findMeetList()
            },
            fail: function(res) {
              console.log(".....fail.....");
              wx.showModal({
                title: '审批失败',
                content: '请检查网络链接。。。',
              })
            }
          })

        } else {
          console.log('用户点击辅助操作')

          wx.request({

            // url: getApp().globalData.weburl + '/api/wxRequest/approve/' +id+ '/P',
            url: getApp().globalData.weburl + '/api/wxRequest/approve/0/' + user + '/' + id,
            method: 'PUT',
            success: function(res) {
              wx.showModal({
                title: '审批不通过',
                content: '成功',
              })
              that.onLoad();
            },
            fail: function(res) {
              console.log(".....fail.....");
              wx.showModal({
                title: '审批失败',
                content: '请检查网络链接。。。',
              })
            }
          })
        }
      }
    });
  },
  tabClick: function(e) {

    var that = this;
    that.setData({
      hidden: false
    });
    var idIndex = e.currentTarget.id;
    var offsetW = e.currentTarget.offsetLeft; //2种方法获取距离文档左边有多少距离
    console.log(idIndex + 'asdasdasd');
    this.setData({
      activeIndex: idIndex,
      slideOffset: offsetW
    });
    if (idIndex == 0) {

      that.setData({
        visitor: true,
        meeting: false
      })

    } else {
      that.setData({
        meeting: true,
        visitor: false,
      })
    }


  },
  /**
   * 页面的初始数据
   */
  data: {
    approvalList: [],
    activeIndex: 0,
    slideOffset: 0,
    tabs: [{
      id: "0",
      cname: "访客审批"
    }, {
      id: "1",
      cname: "会议审批"
    }],
    visitor: true,
    meeting: false,
    imgurl: getApp().globalData.imgUrl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log("123123123123123");
    // console.log(getApp().globalData.role);
    // console.log(getApp().globalData.role.indexOf("758e47ccee1e11e9833900e081bbbd32"));
    if (getApp().globalData.role.indexOf("c88fcb9800fa11ea875400e081bbbd32") != '-1') {

      this.setData({

        tabs: [{
          id: "0",
          cname: "访客审批"
        }, {
          id: "1",
          cname: "会议审批"
        }]
      })

    } else {
      this.setData({

        tabs: [{
          id: "0",
          cname: "访客审批"
        }]
      })

    }
    this.findMeetList(),
      this.findVisiterList()

  },

  findVisiterList: function() {
    var user = getApp().globalData.user;

    var that = this;
    wx.request({

      url: getApp().globalData.weburl + '/api/wxRequest/approve/' + user + '',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {

        that.setData({

          approvalList: res.data.data
        })
        console.log(that.data.approvalList)
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

  findMeetList: function() {
    var that = this;
    wx.request({

      url: getApp().globalData.weburl + '/api/wxRequest/approveMeet',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res);
        that.setData({

          approvalMeetList: res.data.data
        })
        console.log(that.data.approvalMeetList)
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