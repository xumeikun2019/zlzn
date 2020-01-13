// pages/meettingAssign/meettingAssign.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: getApp().globalData.imgUrl,
    meetsList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // var userid = getApp().globalData.userid;

    var that = this;
    if (getApp().globalData.role.indexOf("6178ed4bee1e11e9833900e081bbbd32") == '-1') {
      wx.showModal({
        title: '',
        content: '无管理员权限！',
        showCancel: false, //是否显示取消按钮
        success: function(res) {
          wx.reLaunch({
            url: '../home/home',
          })
        },

      })

    } else {

      //查詢部門人遠
      that.getAttendees();
      //查詢待指派會議
      that.getMeetting();
    }
  },

  getMeetting() {
    var that = this;
    var userid = getApp().globalData.userid;
    wx.request({

      url: getApp().globalData.weburl + '/api/wxRequest/meets/tba.do',
      data: {
        userid: userid
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log("res8888888");
        console.log(res);
        that.setData({
          meetsList: res.data.data

        })
      },
      fail: function(res) {
        console.log(".....fail.....");
      }
    })
  },
  //控制人员显隐
  assign: function(e) {
    var that = this;
    var personnelArr = that.data.personnelArr
    console.log(e.currentTarget.dataset.index);
    this.setData({
      isPer: true,
      meetid: e.currentTarget.dataset.index
    })
    //查询已指派人员
    wx.request({

      url: getApp().globalData.weburl + '/api/wxRequest/meets/assignpersons.do',
      data: {
        meetid: that.data.meetid
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log("131231231232123");
        console.log(res);
        for (var ii = 0; ii < res.data.data.length; ii++) {
          for (var i = 0; i < personnelArr.length; i++) {
            for (var j = 0; j < personnelArr[i].a.length; j++) {
              console.log(personnelArr[i].a[j].id);
              console.log(res.data.data[ii].userid);
              if (personnelArr[i].a[j].id == res.data.data[ii].userid) {
                personnelArr[i].a[j].checked = true;
              }
            }
          }
        }
        console.log(personnelArr);
        that.setData({
          personnelArr: personnelArr
        })

      },
      fail: function(res) {
        console.log(".....fail.....");
      }
    })

  },
  //取消按钮
  cancel: function() {
    var personnelArr = this.data.personnelArr
    for (var i = 0; i < personnelArr.length; i++) {
      for (var j = 0; j < personnelArr[i].a.length; j++) {
        if (personnelArr[i].a[j].checked) {
          personnelArr[i].a[j].checked = false;
        }
      }
    }
    this.setData({
      isPer: false,
      depValue: [],
      personnelArr: personnelArr
    })

  },
  //定位字母锚点
  jumpTo(e) {
    console.log(e);
    var opt = e.currentTarget.dataset.opt;
    this.setData({
      toView: opt
    })
  },
  /**
   * 获取部门人员
   */
  getAttendees: function() {
    var that = this;
    var userid = getApp().globalData.userid;
    wx.request({

      url: getApp().globalData.weburl + '/api/wxRequest/departmentUser.do',
      method: 'GET',
      data: {
        userid: userid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log("res.data");
        console.log(res);
        that.setData({
          leaderArr: res.data.data
        })
        var arr = {
          data: that.data.leaderArr, //成员数组
          words: ["a", "b", "c", "d", "e",
            "f", "g", "h", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
            "t", "w", "x", "y", "z"
          ], //成员字母集合
        };
        that.setData({
          words: arr.words,
        })

        console.log(arr)
        that.integration(arr);
      },
      fail: function(res) {
        console.log(".....fail.....");
      }
    })
  }, // 整合人员字母
  integration: function(list) {
    // console.log(list)
    var arr = [];
    for (var j = 0; j < list.words.length; j++) {
      var aa = {
        name: null,
        a: []
      };
      aa.name = list.words[j];
      for (var k = 0; k < list.data.length; k++) {
        if (list.words[j] == list.data[k].word) {
          aa.a.push(list.data[k]);
        }
      }
      arr.push(aa)
    }
    this.setData({
      personnelArr: arr,
    })
    // console.log(arr)
  },
  checkPer: function(e) {
    var index = e.currentTarget.dataset.index; //获取当前点击的下标
    var ind = e.currentTarget.dataset.itemnameind; //获取当前点击的下标
    var personnelArr = this.data.personnelArr; //选项集合
    personnelArr[ind].a[index].checked = !personnelArr[ind].a[index].checked; //改变当前选中的checked值

    // var u_id = this.data.u_id;//获取data中的成员id集合
    // var id = personnelArr[ind].a[index].id;//获取选中的成员id
    //  //判断，当前选中的这个值的checked是不是已经选中，如果是则将id放入选中成员id集合，反之则移除
    // if (personnelArr[ind].a[index].checked) {
    //   u_id.push(id);
    // } else {
    //   this.removeByValue(u_id, id);
    // }

    this.setData({
      personnelArr: personnelArr
    });
  },
  checkBoxPer: function(e) {
    console.log(e)
    var depValue = e.detail.value;
    this.setData({
      depValue: depValue
    });
    console.log(this.data.personnelArr);
  },
  confirmPer: function(e) {
    var userid = getApp().globalData.userid;
    var that = this;
    var meetid = that.data.meetid;
    var personnelArr = that.data.personnelArr;
    console.log(personnelArr);



    var userArr = [];
    for (var i = 0; i < personnelArr.length; i++) {
      for (var j = 0; j < personnelArr[i].a.length; j++) {

        if (personnelArr[i].a[j].checked) {
          userArr.push(personnelArr[i].a[j].id)
        }
      }
    }

    console.log("userArr");
    console.log(JSON.stringify(userArr));

    wx.request({

      url: getApp().globalData.weburl + '/api/wxRequest/meets/assign.do',
      data: {
        meetid: meetid,
        userArr: userArr,
        userid: userid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
       console.log(res);
        if (res.data.result == 'ok'){
          wx.showModal({
            title: '',
            content: '指派成功',
          })
          that.getMeetting();
        } else {
          wx.showModal({
            title: '',
            content: '指派失败请重试',
          })

        }
      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })



    for (var i = 0; i < personnelArr.length; i++) {
      for (var j = 0; j < personnelArr[i].a.length; j++) {
        if (personnelArr[i].a[j].checked) {
          personnelArr[i].a[j].checked = false;
        }
      }
    }
    this.setData({
      isPer: false,
      depValue: [],
      personnelArr: personnelArr
    })
  }
})