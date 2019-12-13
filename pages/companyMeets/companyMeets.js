// pages/leaderMeets/leaderMeets.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meetList: [],//会议列表
    tabs: [{
      id: "0",
      cname: "本周"
    }, {
      id: "1",
      cname: "下周"
    }],
    tabw: 5,
    activeIndex: 0,
    slideOffset: 0,
    multiIndex: [0, 0, 0],//当前选择部门
    multiArray: [['公司一', '公司二'],
      ['分公司一', '分公司二', '分公司三', '分公司四', '分公司五'],
      ['张三', '李四']],//部门列表
    leadersList: [],
    currentTabindex: 0,//当前选择页签
    currnetDepTwo:"-1",//当前选择部门id
    weeks1: [{ name: '1', value: '星期一'},
      { name: '2', value: '星期二' },
       { name: '3', value: '星期三' }, 
      { name: '4', value: '星期四' }, 
      { name: '5', value: '星期五' },
      { name: '6', value: '星期六' },
      { name: '7', value: '星期天' }
      ]//多选框
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var today = new Date().getDay(); 

    if (today == '1') {
      this.setData({
        one: true

      })
    }
    if (today == '2') {
      this.setData({
        two: true

      })
    }

    if (today == '3') {
      this.setData({
        three: true

      })
    }
    if (today == '4') {
      this.setData({
        four: true

      })
    }
    if (today == '5') {
      this.setData({
        five: true

      })
    }
    if (today == '5') {
      this.setData({
        five: true

      })
    }
    if (today == '6') {
      this.setData({
        six: true

      })
    }
    if (today == '7') {
      this.setData({
        seven: true

      })
    }

    console.log(today);
   
    this.findMeets();
    this.getDepOne();
    console.log(this.data.multiArray)
  },
  //查询本周会议
  findMeets() {
   
    var that = this;
    var companyid = 0;//部门id
    if (that.data.currnetDepTwo != "") {
      companyid = that.data.currnetDepTwo
    } else {
      companyid = "";
    } if (companyid == '-1'){
      companyid = "";

    }
    wx.request({

      // url: getApp().globalData.weburl + '/api/wxRequest/approve/' +id+ '/P',
      url: getApp().globalData.weburl + '/api/wxRequest/CompanyMeets',
      data: {
        companyid: companyid
      },
      method: 'GET',

      success: function(res) {
        that.setData({
          date11: false,
          date12: false,
          date21: false,
          date22: false,
          date31: false,
          date32: false,
          date41: false,
          date42: false,
          date51: false,
          date52: false,
          date61: false,
          date62: false,
          date71: false,
          date72: false
        })
        var meets = res.data.data
        console.log("meets");
        console.log(meets);
        for (var i = 0; i < meets.length; i++) {
          console.log(meets[i].date);
          if (meets[i].date == '11') {
            that.setData({
              date11: true
            })
          }
          if (meets[i].date == '12') {
            that.setData({
              date12: true
            })
          }
          if (meets[i].date == '21') {
            that.setData({
              date21: true
            })
          }
          if (meets[i].date == '22') {
            that.setData({
              date22: true
            })
          }
          if (meets[i].date == '31') {
            that.setData({
              date31: true
            })
          }
          if (meets[i].date == '32') {
            that.setData({
              date32: true
            })
          }
          if (meets[i].date == '41') {
            that.setData({
              date41: true
            })
          }
          if (meets[i].date == '42') {
            that.setData({
              date42: true
            })
          }
          if (meets[i].date == '51') {
            that.setData({
              date51: true
            })
          }
          if (meets[i].date == '52') {
            that.setData({
              date52: true
            })
          }
          if (meets[i].date == '61') {
            that.setData({
              date61: true
            })
          }
          if (meets[i].date == '62') {
            that.setData({
              date62: true
            })
          }
          if (meets[i].date == '71') {
            that.setData({
              date71: true
            })
          }
          if (meets[i].date == '72') {
            that.setData({
              date72: true
            })
          }

        }
      
        that.setData({
          meetList: res.data.data

        })
      },
      fail: function(res) {

      }
    })
  },
  //查询下周会议
  findMeetsNext() {
    var that = this;
    var companyid = 0;
    if (that.data.currnetDepTwo != "") {
      companyid = that.data.currnetDepTwo
    } else {
      companyid = "";
    } if (companyid == '-1') {
      companyid = "";

    }
    wx.request({

      url: getApp().globalData.weburl + '/api/wxRequest/nextCompanyMeets',
      data: {
        companyid: companyid
      },
      method: 'GET',

      success: function(res) {

        that.setData({
          date11: false,
          date12: false,
          date21: false,
          date22: false,
          date31: false,
          date32: false,
          date41: false,
          date42: false,
          date51: false,
          date52: false,
          date61: false,
          date62: false,
          date71: false,
          date72: false
        })
        var meets = res.data.data
        console.log(meets);
        for (var i = 0; i < meets.length; i++) {
          console.log(meets[i].date);
          if (meets[i].date == '11') {
            that.setData({
              date11: true
            })
          }
          if (meets[i].date == '12') {
            that.setData({
              date12: true
            })
          }
          if (meets[i].date == '21') {
            that.setData({
              date21: true
            })
          }
          if (meets[i].date == '22') {
            that.setData({
              date22: true
            })
          }
          if (meets[i].date == '31') {
            that.setData({
              date31: true
            })
          }
          if (meets[i].date == '32') {
            that.setData({
              date32: true
            })
          }
          if (meets[i].date == '41') {
            that.setData({
              date41: true
            })
          }
          if (meets[i].date == '42') {
            that.setData({
              date42: true
            })
          }
          if (meets[i].date == '51') {
            that.setData({
              date51: true
            })
          }
          if (meets[i].date == '52') {
            that.setData({
              date52: true
            })
          }
          if (meets[i].date == '61') {
            that.setData({
              date61: true
            })
          }
          if (meets[i].date == '62') {
            that.setData({
              date62: true
            })
          }
          if (meets[i].date == '71') {
            that.setData({
              date71: true
            })
          }
          if (meets[i].date == '72') {
            that.setData({
              date72: true
            })
          }

        }

       console.log(res)
        that.setData({
          meetList: res.data.data

        })
        // that.getDepOne();
      },
      fail: function(res) {

      }
    })

  },
  //页签切换
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
    if (idIndex == 1) {
      //清空查询信息
      that.setData({
        //leadersList: "",
        multiIndex: [],
        currentTabindex: "1",
        currnetDepTwo:"-1"
      })

      this.findMeetsNext();
    } else {
      that.setData({
        //leadersList: "",
        multiIndex: [],
        currentTabindex: "0",
        currnetDepTwo: "-1"
      })
      this.findMeets();
    }


  },
  //多选框选中事件
  checkboxChange: function (e) {
    this.setData({
      one: false,
      two: false,
      three: false,
      four: false,
      five: false,
      six: false,
      seven: false

    })
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    for (var i = 0; i < e.detail.value.length; i++ ){


     
      //如果选择周一
      if (e.detail.value[i] == '1'){
        this.setData({
            one:true

        })
      }
      if (e.detail.value[i] == '2') {
        this.setData({
          two: true

        })
      }
      
      if (e.detail.value[i] == '3') {
        this.setData({
          three: true

        })
      }
      if (e.detail.value[i] == '4') {
        this.setData({
          four: true

        })
      }
      if (e.detail.value[i] == '5') {
        this.setData({
          five: true

        })
      }
      if (e.detail.value[i] == '5') {
        this.setData({
          five: true

        })
      }
      if (e.detail.value[i] == '6') {
        this.setData({
          six: true

        })
      }
      if (e.detail.value[i] == '7') {
        this.setData({
          seven: true

        })
      }
    }
    
  },
  bindMultiPickerChange: function(e) {

    this.setData({

      currnetDepTwo: "-1"

    })
    if (this.data.multiArray[2][this.data.multiIndex[2]]) {
      console.log(this.data.multiArray[2][this.data.multiIndex[2]]);

      this.setData({
        multiIndex: e.detail.value,
        currnetDepTwo: this.data.depThreeList[this.data.multiIndex[2]].id

      })
      //this.getDepUser(this.data.depThreeList[this.data.multiIndex[2]].id);

    } else if (this.data.multiArray[1][this.data.multiIndex[1]]) {
      console.log(this.data.multiArray[1][this.data.multiIndex[1]]);
      this.setData({
        multiIndex: e.detail.value,
        currnetDepTwo: this.data.depTwoList[this.data.multiIndex[1]].id

      })
      //this.getDepUser(this.data.depTwoList[this.data.multiIndex[1]].id);
    } else if (this.data.multiArray[0][this.data.multiIndex[0]]) {
      console.log(this.data.multiArray[0][this.data.multiIndex[0]]);

      this.setData({
        multiIndex: e.detail.value,
        currnetDepTwo: this.data.depOneList[this.data.multiIndex[0]].id

      })
    }

    
    // console.log('picker发送选择--改变，携带值为', e.detail.value[1])
    // console.log("this.data.depTwoList")
    // console.log(this.data.depTwoList)
    // if (this.data.depTwoList.length > 0){
    //   this.setData({
    //     multiIndex: e.detail.value,
    //     currnetDepTwo: this.data.depTwoList[e.detail.value[1]].id
        
    //   })
    // }
    // var multiArray = this.data.multiArray;
    // var multiIndex = this.data.multiIndex;
    // console.log("this.data.multiArray")
    // console.log(this.data.multiArray)
    //选择部门后重新加载
    if (this.data.currentTabindex == "0") {

      this.findMeets();
    } else {
      this.findMeetsNext();
    }
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
        var depOne = ["全部"];
        var depOneList = [{ level: 3, parent_id: "-1", last_time: 1572487795000, name: "全部", id: "-1"}];
        for (var i = 0; i < res.data.data.length; i++) {
          console.log(res.data.data[i].name);
          depOne.push(res.data.data[i].name)
          depOneList.push(res.data.data[i])

        }
        that.setData({
          multiArray: [depOne, [],[]

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
      fail: function(res) {
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
    var depTwo =[]
    var depTwoList=[]
    if (parentid == -1){
      queryid = parentid 
      
    } else{
      depTwo  = ["-"];
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
      success: function(res) {

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
          multiArray: [that.data.depOne, depTwo,[]],
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
      fail: function(res) {
        console.log(".....fail.....");
      }
    })


  },
  /**
     * 获取部门第三级
     */
  getDepThree: function (id, parentid) {
    console.log("parentid" + parentid);
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
        var parentid = this.data.depOneList[e.detail.value].parent_id
        if (currentDepOne != this.data.currentDepOne) {
          this.getDepTwo(currentDepOne,parentid)
        }


        data.multiIndex[1] = 0
        break;
      case 1:
        console.log(this.data.depTwoList);
        if (this.data.depTwoList.length > 0){
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

  }
})