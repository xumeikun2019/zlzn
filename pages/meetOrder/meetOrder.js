// pages/meetOrder/meetOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: getApp().globalData.imgUrl,
    multiIndex: [0, 0, 0],//当前选择部门
    multiArray: [['公司一', '公司二'],
    ['分公司一', '分公司二', '分公司三', '分公司四', '分公司五'],
    ['张三', '李四']],//部门列表
    currnetDepTwo: "-1",//当前选择部门id
    checkboxArr: [
      {
        checked: false,//是否选中
        id: "1",//部门能id
        name: "部门1",
      },
      {
        checked: false,//是否选中
        id: "2",//部门能id
        name: "部门2",
      }
    ],//部门列表
    personnelArr: null,//人员列表
    checkValue: [],//部门
    depValue: [],//部门
    isDep: false,//部门显隐
    isPer: false,//成员显隐
    isMeet: false,//会议室状态显隐
    d_id: [],//部门id集合
    u_id: [],//人员集合
    words: null,//成员名称的手写字母
    forminfo:"",
    meetStates:[]
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    //获取当前时间
    var n = timestamp *1000;
    var date = new Date(n);
    var Y = date.getFullYear();
    //月
    var M = (date.getMonth()+ 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日
    var D = date.getDate() < 10 ? '0' + date.getDate() :date.getDate();
    //时
    var h =date.getHours();
    //分
    var m = date.getMinutes();
    this.setData({
      today: Y + "-" + M + "-" + D,
      now: h + ":" + m
    })
    console.log(this.data.meetStates.length)

    this.getDepOne();//加载部门
    this.getleaders();//加载领导
    this.getMeetRoom();//加载会议室
    var that = this;
   
  },
  //查看会议室状态
  meetState(){

    this.setData({

      isMeet:true
    })
  },
  confirmMeet(){
    this.setData({

      isMeet: false
    })

  },
  checkPer: function (e) {
    var index = e.currentTarget.dataset.index;//获取当前点击的下标
    var ind = e.currentTarget.dataset.itemnameind;//获取当前点击的下标
    var personnelArr = this.data.personnelArr;//选项集合
    personnelArr[ind].a[index].checked = !personnelArr[ind].a[index].checked;//改变当前选中的checked值

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
  checkBoxPer: function (e) {
    console.log(e)
    var depValue = e.detail.value;
    this.setData({
      depValue: depValue
    });
    console.log(depValue);
  },
  confirmPer: function () {// 提交

  console.log(this.data.depValue)
    this.setData({
      isPer: false,
    })
  },

  // 整合人员字母
  integration: function (list) {
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

  bindDateChange: function(e) {
    var user = getApp().globalData.userid;
    var that = this ;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
    wx.request({

      url: getApp().globalData.weburl + '/api/wxRequest/meetRoomState.do',
      data: { 
        user: user ,
        date: e.detail.value
      
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data.data.length);

        that.setData({
          meetStates: res.data.data


        })
        console.log(that.data.meetStates.length)
      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })
  },
  bindTimeChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time1: e.detail.value
    })
  },
   bindTimeChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
     
    this.setData({
      time2: e.detail.value
    })
  },
  //查询会议室
  getMeetRoom(){
    var user = getApp().globalData.userid;
    var that = this;
    wx.request({

      url: getApp().globalData.weburl + '/api/wxRequest/meetRooms.do',
      data:{ user : user },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("res.data.data");
        console.log(res.data.data);
        var meetRoomArr = [];
        var meetRoomList = [];
        for (var i = 0; i < res.data.data.length; i++) {
          console.log(res.data.data[i].pname);
          meetRoomArr.push(res.data.data[i].pname)
          meetRoomList.push(res.data.data[i])
        }

        that.setData({
          meetRoomArray: [meetRoomArr],
          meetRoomArr,
          meetRoomList
        })

      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })

  },
  //选择会议室
  bindMultiPickerChangeMeet: function (e) {
    console.log('picker发送选择--改变，携带值为', e.detail.value)

    this.setData({
      meetRoomIndex: e.detail.value
    })
    console.log(this.data.meetRoomList[this.data.meetRoomIndex[0]].id)

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
  * 获取公司领导
  */
  getleaders: function () {
    var that = this;
    wx.request({

      url: getApp().globalData.weburl + '/api/wxRequest/leadersAndFirst.do',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("res.data");
        console.log(res);
        that.setData({
          leaderArr : res.data.data
        })
        var arr = {
          data: that.data.leaderArr,//成员数组
          words: ["a", "b", "c", "d", "e",
            "f", "g", "h", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
            "t", "w", "x", "y", "z"],//成员字母集合
        };
        that.setData({
          words: arr.words,
        })

        console.log(arr)
        that.integration(arr);
      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })
  },
  //控制人员显隐
  isPer: function () {
    this.setData({
      isPer: true,
    })
  },
  //取消按钮
  cancel: function () {
    this.setData({
      isDep: false,
      isPer: false
    })
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      leaderIndex: e.detail.value
    })
    console.log("leaderIndex");
    console.log(this.data.leaderArray);
    console.log(this.data.leaderArray[this.data.leaderIndex]);
  },
  /**
  * 获取部门第一级
  */
  getDepOne: function () {
    var that = this;
    wx.request({

      url: getApp().globalData.weburl + '/api/wxRequest/getDepartment.do',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {

        console.log(res.data.data);
        var depOne = ["全部"];
        var depOneList = [{ level: 3, parent_id: "-1", last_time: 1572487795000, name: "全部", id: "-1" }];
        for (var i = 0; i < res.data.data.length; i++) {
          console.log(res.data.data[i].name);
          depOne.push(res.data.data[i].name)
          depOneList.push(res.data.data[i])

        }
        that.setData({
          multiArray: [depOne, [], []

          ],
          depOne,
          depOneList
        })

        var defaultCode = depOneList[0].id;
        var parentid = depOneList[0].parent_id;
        if (defaultCode) {
          that.setData({
            currnetDepOne: defaultCode // 保存在当前的省级key
          })
          that.getDepTwo(defaultCode, parentid); // 使用第一项当作参数获取第二级数据
        }

      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })
  },
  /**
   * 获取部门第二级
   */
  getDepTwo: function (id, parentid) {
    console.log(id)
    var queryid = id
    var depTwo = []
    var depTwoList = []
    if (parentid == -1) {
      queryid = parentid

    } else {
      depTwo = ["-"];
      depTwoList = [{ level: 3, parent_id: "-1", last_time: 1572487795000, name: "-", id: "" + id + "" }];

    }
    var that = this;
    wx.request({

      url: getApp().globalData.weburl + '/api/wxRequest/getDepartmentTwo.do',
      data: {
        id: queryid

      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {

        console.log(res.data.data);
        var depTwoIndexList = [];
        for (var i = 0; i < res.data.data.length; i++) {
          console.log(res.data.data[i].name);
          depTwo.push(res.data.data[i].name)
          depTwoList.push(res.data.data[i])
          depTwoIndexList.push(res.data.data[i].id)
        }
        console.log("======");
        console.log(depTwo);
        that.setData({
          multiArray: [that.data.depOne, depTwo, []],
          depTwo,
          depTwoList,
          depTwoIndexList
        })
        if (depTwoList.length > 0) {
          var defaultCode = depTwoList[0].id
          var parentid = depTwoList[0].parent_id;
          if (defaultCode) {
            that.setData({
              currnetDepTwo: defaultCode // 存下当前选择的部门key
            })
            that.getDepThree(defaultCode, parentid); // 使用第一项当作参数获取第二级数据
          }
        }

      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })


  },
  /**
     * 获取部门第三级
     */
  getDepThree: function (id, parentid) {
   // console.log("parentid" + parentid);
    var depThree = [];
    var depThreeList = [];
    var queryid = id
    if (parentid == -1) {
      queryid = parentid
    } else {

      depThree = ["-"];
      depThreeList = [{ level: 3, parent_id: "-1", last_time: 1572487795000, name: "-", id: "" + id + "" }];
    }
    console.log(id)
    var that = this;
    wx.request({
      url: getApp().globalData.weburl + '/api/wxRequest/getDepartmentThree.do',
      data: {
        id: queryid
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {

        //console.log(res.data.data);
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
  bindMultiPickerColumnChange: function (e) {
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
        var parentid = this.data.depOneList[e.detail.value].parent_id
        if (currentDepOne != this.data.currentDepOne) {
          this.getDepTwo(currentDepOne, parentid)
        }


        data.multiIndex[1] = 0
        break;
      case 1:
        console.log(this.data.depTwoList);
        if (this.data.depTwoList.length > 0) {
          // var depTwoKey = this.data.depTwoList[e.detail.value].id
          var currentDepTwo = this.data.depTwoList[e.detail.value].id
          var parentid = this.data.depTwoList[e.detail.value].parent_id
        }
        if (currentDepTwo != this.data.currentDepTwo) {
          this.getDepThree(currentDepTwo, parentid)
        }
        data.multiIndex[2] = 0
        break;
    }
    console.log(data)
    this.setData(data)
  },
  bindDepPickerChange: function (e) {
    //清空选择部门
    this.setData({
      currnetDepTwo: "-1",
      checkValue: ""
    })
    
    if (this.data.multiArray[2][this.data.multiIndex[2]]) {
      console.log(this.data.multiArray[2][this.data.multiIndex[2]]);
      this.setData({
        multiIndex: e.detail.value,
        currnetDepTwo: this.data.depThreeList[this.data.multiIndex[2]].id
      })
      this.getDep(this.data.depThreeList[this.data.multiIndex[2]].id);

    } else if (this.data.multiArray[1][this.data.multiIndex[1]]) {
      console.log(this.data.multiArray[1][this.data.multiIndex[1]]);
      this.setData({
        multiIndex: e.detail.value,
        currnetDepTwo: this.data.depTwoList[this.data.multiIndex[1]].id

      })
      this.getDep(this.data.depTwoList[this.data.multiIndex[1]].id);
    } else if (this.data.multiArray[0][this.data.multiIndex[0]]) {
      this.setData({
        multiIndex: e.detail.value,
        currnetDepTwo: this.data.depOneList[this.data.multiIndex[0]].id

      })
      this.getDep(this.data.depOneList[this.data.multiIndex[0]].id);
    }
    console.log("id"+this.data.currnetDepTwo)
  },

  getDep(depId){

    console.log("888" + depId)
    var that = this;
    wx.request({

      url: getApp().globalData.weburl + '/api/wxRequest/departments.do',
      data: {
        depId: depId
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {

        console.log(res.data.data);
        that.setData({
          checkboxArr: res.data.data
        })

        // var defaultCode = depTwoList[0]
        // that.getDepUser(defaultCode.id);// 使用第一项当作参数获取第二级数据
      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })
  },
  //部门
  checkbox: function (e) {
    var index = e.currentTarget.dataset.index;//获取当前点击的下标
    var checkboxArr = this.data.checkboxArr;//选项集合
    checkboxArr[index].checked = !checkboxArr[index].checked;//改变当前选中的checked值

    //如果需要部门联动成员
    // var d_id = this.data.d_id;//获取data中的部门id集合
    // var id = checkboxArr[index].id;//获取选中的部门id
    // //判断，当前选中的这个值的checked是不是已经选中，如果是则将id放入选中部门id集合，反之则移除
    // if (checkboxArr[index].checked) {
    //   d_id.push(id);
    // } else {
    //   this.removeByValue(d_id, id);
    // }

    this.setData({
      checkboxArr: checkboxArr
    });
  },
  checkboxChange: function (e) {
    var checkValue = e.detail.value;
    this.setData({
      checkValue: checkValue
    });
  },
  confirm: function () {// 确定
    this.setData({
      isDep: false,
      // depValue: []如果是联动，选中部门后需要清除选中的成员
    })
    // this.getUser();//通过选中部门来获取不通的部门成员，将获取到的数据存入checkboxArr中
  },//控制部门的显隐
  isDep: function () {
    this.setData({
      isDep: true,
    })
  },
  //提交
  formSubmit(e) {
    var that = this;
    var checkboxArr = this.data.checkboxArr;
    var personnelArr = this.data.personnelArr;
    var depArr = [];
    var leaderArr = [];
    var user = getApp().globalData.userid;
    for (var i = 0; i < checkboxArr.length; i++) {
      if (checkboxArr[i].checked) {
        depArr.push(checkboxArr[i].id)
      }
    }
    for (var i = 0; i < personnelArr.length; i++) {
      for (var j = 0; j < personnelArr[i].a.length; j++) {

        if (personnelArr[i].a[j].checked) {
          leaderArr.push(personnelArr[i].a[j].id)
        }
      }
    }
    console.log(depArr);
    if (depArr.length == 0) {
      wx.showModal({
        title: '',
        content: '请选择参会部门！',
      })
      return

    }
    if (leaderArr.length == 0) {
      wx.showModal({
        title: '',
        content: '请选择参会领导！',
      })
      return

    }

    if (e.detail.value.phone.length == 0 || e.detail.value.amount.length == 0 || e.detail.value.host.length == 0 || e.detail.value.meetName.length == 0) {
      wx.showModal({
        title: '',
        content: '请填写完整！',
      })
      return
    }
    if (this.data.date == null) {
      wx.showModal({
        title: '',
        content: '请选择预约日期！',
      })
      return
    }

    if (this.data.time1 == null) {
      wx.showModal({
        title: '',
        content: '请选择会议开始时间！',
      })
      return
    }
    if (this.data.time2 == null) {
      wx.showModal({
        title: '',
        content: '请选择会议结束时间！',
      })
      return
    }
    if (this.data.time2 < this.data.time1) {

      wx.showModal({
        title: '',
        content: '请选择正确的会议时间！',
      })
      return
    }

    console.log(depArr);
    wx.request({

      url: getApp().globalData.weburl + '/api/wxRequest/meeting.do',
      data: {
        phone: e.detail.value.phone,
        amount: e.detail.value.amount,
        host: e.detail.value.host,
        date: that.data.date,
        meetRoom: that.data.meetRoomList[this.data.meetRoomIndex[0]].id,
        timeStart: that.data.time1,
        timeEnd: that.data.time2,
        leader: leaderArr,
        dep: depArr,
        meetName: e.detail.value.meetName,
        remark: e.detail.value.remark,
        user: user
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {

        console.log(res);
        if (res.data.message == "ok") {

          wx.showModal({
            title: '',
            content: '预约成功！',
          })
          //清空
          that.setData({
            forminfo: "",
            date: "",
            time1: "",
            time2: "",
            leader: [],
            dep: [],
          })
        } else {

          wx.showModal({
            title: '',
            content: '预约失败！请检查预约时间是否空闲',
          })
        }
      },
      fail: function (res) {
        console.log(".....fail.....");
        wx.showModal({
          title: '',
          content: '请检查网络链接！',
        })
      }
    })

  }
})