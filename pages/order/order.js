// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: ["男", "女"], //性别
    multiArray: [
      ['公司一', '公司二'],
      ['分公司一', '分公司二', '分公司三', '分公司四', '分公司五'],
      ['张三', '李四']
    ],
    userArray:[[]],
    userIndex:[0],
    multiIndex: [0, 0, 0],
    amount: "",
    amount1: [0],
    idcardArr: [],
    vnameArr: [],
    phoneArr:[],
    url: getApp().globalData.imgUrl + "/finance/upload/common/",
    imgUrl: [],
    forminfo:"",
    imgurl: getApp().globalData.imgUrl
  },

  initidcard: function(e) {
    console.log(e);
    var idcardArr = this.data.idcardArr;
    idcardArr[e.currentTarget.dataset.index] = e.detail.value;
    this.setData({

      idcardArr: idcardArr
    })
  },
  initvname: function(e) {
    console.log(e);
    var vnameArr = this.data.vnameArr;
    vnameArr[e.currentTarget.dataset.index] = e.detail.value;
    this.setData({

      vnameArr: vnameArr
    })
  },
  initphone: function (e) {
    console.log(e);
    var phoneArr = this.data.phoneArr;
    phoneArr[e.currentTarget.dataset.index] = e.detail.value;
    this.setData({

      phoneArr: phoneArr
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.getDepOne();
  },
  /**
   * 获取部门第一级
   */
  getDepOne: function() {
    var that = this;
    wx.request({

      url: getApp().globalData.weburl + '/api/wxRequest/getDepartment.do',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {

        console.log(res.data.data);
        var depOne = [];
        var depOneList = [];
        for (var i = 0; i < res.data.data.length; i++) {
          console.log(res.data.data[i].name);
          depOne.push(res.data.data[i].name)
          depOneList.push(res.data.data[i])
        }
        that.setData({
          multiArray: [depOne, [],
            []
          ],
          depOne,
          depOneList
        })

        var defaultCode = depOneList[0].id;
        if (defaultCode) {
          that.setData({
            currnetDepOne: defaultCode // 保存在当前的省级key
          })
          that.getDepTwo(defaultCode); // 使用第一项当作参数获取第二级数据
        }

      },
      fail: function(res) {
        console.log(".....fail.....");
      }
    })


  },
  /**
   * 获取部门第二级
   */
  getDepTwo: function(id) {
    console.log(id)
    var that = this;
    wx.request({

      url: getApp().globalData.weburl + '/api/wxRequest/getDepartmentTwo.do',
      data: {
        id: id

      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {

        //console.log(res.data.data);


        var depTwo = [];
        var depTwoList = [];
        for (var i = 0; i < res.data.data.length; i++) {
          console.log(res.data.data[i].name);
          depTwo.push(res.data.data[i].name)
          depTwoList.push(res.data.data[i])
        }
        console.log(depTwo);
        that.setData({
          multiArray: [that.data.depOne, depTwo, []],
          depTwo,
          depTwoList
        })
        if (depTwoList.length > 0){
          var defaultCode = depTwoList[0].id
          if (defaultCode) {
            that.setData({
              currnetDepTwo: defaultCode // 存下当前选择的城市key
            })
            that.getDepThree(defaultCode); // 使用第一项当作参数获取第二级数据

          }
        }
      },
      fail: function(res) {
        console.log(".....fail.....");
      }
    })


  },
  /**
     * 获取部门第三级
     */
  getDepThree: function (id) {
    console.log(id)
    var that = this;
    wx.request({

      url: getApp().globalData.weburl + '/api/wxRequest/getDepartmentThree.do',
      data: {
        id: id

      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {

        //console.log(res.data.data);


        var depThree = [];
        var depThreeList = [];
        for (var i = 0; i < res.data.data.length; i++) {
          console.log(res.data.data[i].name);
          depThree.push(res.data.data[i].name)
          depThreeList.push(res.data.data[i])
        }
        //console.log(depTwo);
        that.setData({
          multiArray: [that.data.depOne, that.data.depTwo, depThree],
          depThree,
          depThreeList
        })
        if (depThreeList.length > 0) {
          var defaultCode = depThreeList[0].id
          if (defaultCode) {
            that.setData({
              currnetDepThree: defaultCode // 存下当前选择的城市key
            })
            //that.getDepThree(defaultCode); // 使用第一项当作参数获取第二级数据

          }
        }
      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })


  },


  /**
   * 获取部门用户
   */
  getDepUser: function(id) {
    console.log("888"+id)
    var that = this;
    wx.request({

      url: getApp().globalData.weburl + '/api/wxRequest/getDepartmentUser.do',
      data: {
        id: id
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {

        console.log(res.data.data);


        var userArr = [];
        var userList = [];
        for (var i = 0; i < res.data.data.length; i++) {
          console.log(res.data.data[i].realname);
          userArr.push(res.data.data[i].realname)
          userList.push(res.data.data[i])
        }

        that.setData({
          userArray: [userArr],
          userArr,
          userList
        })

        // var defaultCode = depTwoList[0]
        // that.getDepUser(defaultCode.id);// 使用第一项当作参数获取第二级数据
      },
      fail: function(res) {
        console.log(".....fail.....");
      }
    })


  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
     
    })
  },
  bindMultiPickerChange: function(e) {
    console.log('picker发送选择--改变，携带值为', e.detail.value)
   
    this.setData({
      multiIndex: e.detail.value
    })
    console.log(this.data.multiArray[2][this.data.multiIndex[2]]);
    if (this.data.multiArray[2][this.data.multiIndex[2]]){
      console.log(this.data.multiArray[2][this.data.multiIndex[2]]);

      this.getDepUser(this.data.depThreeList[this.data.multiIndex[2]].id);
    
    } else if (this.data.multiArray[1][this.data.multiIndex[1]]) {
      console.log(this.data.multiArray[1][this.data.multiIndex[1]]);
      this.getDepUser(this.data.depTwoList[this.data.multiIndex[1]].id);
    } else if (this.data.multiArray[0][this.data.multiIndex[0]]) {
      console.log(this.data.multiArray[0][this.data.multiIndex[0]]);
     
      this.getDepUser(this.data.depOneList[this.data.multiIndex[0]].id);
    } else {
      wx.showModal({
        title: '',
        content: '未选择部门',
      })

    }
  },
  bindMultiPickerChangeUser: function (e) {
    console.log('picker发送选择--改变，携带值为', e.detail.value)

    this.setData({
      userIndex: e.detail.value
    })
    console.log(this.data.userList[this.data.userIndex[0]].user_id)

  },
  bindMultiPickerColumnChange: function(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var column = e.detail.column // 当前改变的列
    var data = {
      multiIndex: JSON.parse(JSON.stringify(this.data.multiIndex)),
      multiArray: JSON.parse(JSON.stringify(this.data.multiArray))
    }
    data.multiIndex[column] = e.detail.value;
    switch (column) {
      case 0:
        console.log("00000" + this.data.depOneList[e.detail.value]);
        var currentDepOne = this.data.depOneList[e.detail.value].id
        if (currentDepOne != this.data.currentDepOne) {
          this.getDepTwo(currentDepOne)
        }


        data.multiIndex[1] = 0
        break;
      case 1:
        console.log(this.data.depTwoList);
        // var depTwoKey = this.data.depTwoList[e.detail.value].id
        var currentDepTwo = this.data.depTwoList[e.detail.value].id
        if (currentDepTwo != this.data.currentDepTwo) {
          this.getDepThree(currentDepTwo)
        }
        //this.getDepUser(depTwoKey)
        data.multiIndex[2] = 0
        break;
    }
    console.log(data)
    this.setData(data)

  },

  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  amount: function(e) {

    //console.log(e.detail.value)
    if (e.detail.value > 10) {
      wx.showModal({
        content: '最大人数10人',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
    } else {

      this.setData({
        amount: e.detail.value
      })

      console.log(this.data.amount)
    }
  },
  back:function(e) {

    wx.redirectTo({
      url: '../homeVisit/homeVisit',
    })
  },
  upload: function(e) {

    console.log(e)

    var index = e.currentTarget.dataset.index;
    var that = this;
    var user = getApp().globalData.user;
    var imgUrlArry = this.data.imgUrl;
    console.log(user);
    wx.chooseImage({
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: getApp().globalData.weburl + '/api/wxRequest/uploadVisitorImage.do',
          filePath: tempFilePaths[0],
          name: 'file',
          success: function(res) {
            console.log(res);
            var data = res.data;
            imgUrlArry[index] = res.data;
            that.setData({
              imgUrl: imgUrlArry

            })
            console.log(that.data.imgUrl)
            wx.showModal({
              title: '',
              content: '上传成功',
            })
          },
          fail: function(err) {
            console.log(err);
            wx.showModal({
              title: '',
              content: '上传失败',
            })
          }
        })
      }
    })
  },
  formSubmit(e) {
    console.log("this.data.userList");
    console.log(this.data.userArray);

   

    if (this.data.userArray[0].length == 0) {
      wx.showModal({
        title: '',
        content: '请选择访问人',
      })
      return;

    }
  
    if (this.data.userArray.length == 0){
      wx.showModal({
        title: '',
        content: '请选择访问人',
      })
      return;

    }

    if (this.data.amount == "" || this.data.amount == 0 ) {
      wx.showModal({
        title: '',
        content: '请填写来访人数',
      })
      return;

    }
    if (this.data.vnameArr.length < this.data.amount){
      wx.showModal({
        title: '',
        content: '请输入访客姓名',
      })
      return;
    }
    if (this.data.idcardArr.length < this.data.amount) {
      wx.showModal({
        title: '',
        content: '请输入访客身份证',
      })
      return;
    }
    if (this.data.phoneArr.length < this.data.amount) {
      wx.showModal({
        title: '',
        content: '请输入访客联系方式',
      })
      return;
    }
    if (this.data.imgUrl.length < this.data.amount) {
      wx.showModal({
        title: '',
        content: '请上传访客照片',
      })
      return;
    }
    var that = this;
    var openid = getApp().globalData.openid;
    var {

      vNum,
      matter,


    } = e.detail.value;
    this.setData({

      vNum,
      matter,

    })

    wx.request({

      url: getApp().globalData.weburl + '/api/wxRequest/saveVisitors.do',
      data: {
        idcardArr: this.data.idcardArr,
        vnameArr: this.data.vnameArr,
        imgUrl: this.data.imgUrl,
        phoneArr :this.data.phoneArr,
        vNum: this.data.vNum,
        matter: this.data.matter,
        userid: this.data.userList[this.data.userIndex[0]].user_id,
        weid: openid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res) {
        console.log(res)
        if (res.data.result = 'ok') {
          wx.showModal({
            title: '',
            content: '预约成功',
          })
          that.setData({
            forminfo:"",
            imgUrl: []
          })
        
        } else{
          wx.showModal({
            title: '',
            content: '预约失败',
          })

        }


      },
      fail: function(res) {
        console.log(".....fail.....");
        wx.showModal({
          title: '预约失败',
          content: '请检查网络链接。。。',
        })
      }
    })

  }
})