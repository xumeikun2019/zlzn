// pages/leaderMeets/leaderMeets.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meetList:[],
    tabs: [{ id: "0", cname: "本周" }, { id: "1", cname: "下周" }],
    tabw:5,
    activeIndex: 0,
    slideOffset: 0,
    multiIndex: [],
    multiArray: [],
    leadersList:[],
    currentTabindex:"0",
    weeks1: [{ name: '1', value: '星期一' },
    { name: '2', value: '星期二' },
    { name: '3', value: '星期三' },
    { name: '4', value: '星期四' },
    { name: '5', value: '星期五' },
    { name: '6', value: '星期六' },
    { name: '7', value: '星期天' }
    ]
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

    this.findMeets();

    this.getleaders();
  },
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
    for (var i = 0; i < e.detail.value.length; i++) {




      if (e.detail.value[i] == '1') {
        this.setData({
          one: true

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
        console.log('checkbox发生change事件，携带value值为：', e.detail.value)
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
    console.log(this.data.six);
  },
  findMeets(){
    var that = this;
    var leaderid = 0;
    console.log("that.data.leadersList");
    console.log(that.data.leadersList);
    if (that.data.leadersList.length > 0){
      leaderid = that.data.leadersList[that.data.multiIndex].id
    } else {
      leaderid ="";
    } if (leaderid == "-1") {
      leaderid = "";
    }
    wx.request({

      // url: getApp().globalData.weburl + '/api/wxRequest/approve/' +id+ '/P',
      url: getApp().globalData.weburl + '/api/wxRequest/leaderMeets',
      data:{
        leaderid: leaderid
      },
      method: 'GET',

      success: function (res) {
        that.setData({
          date11 : false,
          date12 : false,
          date21 : false,
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
        for (var i = 0; i < meets.length ; i++){
          console.log(meets[i].date);
          if (meets[i].date == '11'){
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
        //that.getleaders();
      },
      fail: function (res) {

      }
    })
  },
  findMeetsNext(){
  var that = this;
    console.log(that.data.leadersList);
    var leaderid = 0;
    if (that.data.leadersList.length>0){
      leaderid = that.data.leadersList[that.data.multiIndex].id
    } else {
      leaderid ="";
    }
    if (leaderid == "-1"){
      leaderid = "";
    }
    wx.request({

      // url: getApp().globalData.weburl + '/api/wxRequest/approve/' +id+ '/P',
      url: getApp().globalData.weburl + '/api/wxRequest/nextLeaderMeets',
      data: {
        leaderid: leaderid
      },
      method: 'GET',

      success: function (res) {
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
        console.log(res);

      
         that.setData({
          meetList: res.data.data

        })
        //that.getleaders();
      },
      fail: function (res) {

      }
    })

  },
  tabClick: function (e) {
  
    var that = this;
    that.setData({
      hidden: false
    });
    var idIndex = e.currentTarget.id;
    var offsetW = e.currentTarget.offsetLeft; //2种方法获取距离文档左边有多少距离
    console.log(idIndex+'asdasdasd');
    this.setData({
      activeIndex: idIndex,
      slideOffset: offsetW
    });
    if (idIndex == 1 ){
     //清空查询信息
      that.setData({
        //leadersList:"",
        multiIndex: 0,
        currentTabindex :"1"
      })
      
      this.findMeetsNext();
    }else{
      that.setData({
        //leadersList: "",
        multiIndex: 0 ,
        currentTabindex: "0"
      })
      this.findMeets();
    }
    

  },
  /**
   * 获取公司领导
   */
  getleaders: function () {
    var that = this;
    wx.request({

      url: getApp().globalData.weburl + '/api/wxRequest/leaders.do',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {

        console.log(res.data.data);
         var leaders = [];
        var leadersList = [];
        leaders.push("全部");
        leadersList.push({ id: "-1", realname: "全部" });
        for (var i = 0; i < res.data.data.length; i++) {
          console.log(res.data.data[i].realname);
          leaders.push(res.data.data[i].realname)
          leadersList.push(res.data.data[i])
        }
        console.log("leaders")
        console.log(leaders)
        that.setData({
          multiArray: [leaders],
          leaders,
          leadersList
        })

        console.log(that.data.multiArray)

      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })
  },
  bindMultiPickerChange:function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
    console.log("multiIndex");
    console.log(this.data.multiArray);
    console.log(this.data.multiArray[this.data.multiIndex]);
    if (this.data.currentTabindex =="0"){
      this.findMeets();
    }else{
      this.findMeetsNext();
    }
  }
})