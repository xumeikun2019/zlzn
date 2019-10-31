// pages/Calendar/Calendar.js
//打卡日历页面
var util = require('../../utils/util.js');
var Bmob = require('../../utils/bmob.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //objectId: '',
    days: [],
    signUp: [],
    cur_year: 0,
    cur_month: 0,
    count: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   // this.setData({ objectId: options.objectId });
    //获取当前年月  
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);
    //获取当前用户当前任务的签到状态
    this.setData({
      cur_year,
      cur_month,
      weeks_ch
    })
    this.onGetSignUp();

    //console.log(this.data.days)
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

  },
  // 获取当月共多少天
  getThisMonthDays: function (year, month) {
    return new Date(year, month, 0).getDate()
  },

  // 获取当月第一天星期几
  getFirstDayOfWeek: function (year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },

  // 计算当月1号前空了几个格子，把它填充在days数组的前面
  calculateEmptyGrids: function (year, month) {
    var that = this;
    //计算每个月时要清零
    that.setData({ days: [] });
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        var obj = {
          date: null,
          isSign: false
        }
        that.data.days.push(obj);
      }
      this.setData({
        days: that.data.days
      });
      //清空
    } else {
      this.setData({
        days: []
      });
    }
  },

  // 绘制当月天数占的格子，并把它放到days数组中
  calculateDays: function (year, month) {
    var that = this;
    const thisMonthDays = this.getThisMonthDays(year, month);
    for (let i = 1; i <= thisMonthDays; i++) {
      var obj = {
        date: i,
        isSign: false
      }
      that.data.days.push(obj);
    }
    this.setData({
      days: that.data.days
    });
    //console.log(that.data.days);
  },

  //匹配判断当月与当月哪些日子签到打卡
  onJudgeSign: function () {
    var that = this;
    var signs = that.data.signUp;
    var daysArr = that.data.days;
    console.log(signs);
    for (var i = 0; i < signs.length; i++) {
      var current = new Date(signs[i].date);
      var year = current.getFullYear();
      var month = current.getMonth() + 1;
      var day = current.getDate();
      console.log(year + "--" + month + "--"+day);
      day = parseInt(day);
      for (var j = 0; j < daysArr.length; j++) {
        //年月日相同并且已打卡
        console.log(month +'-----------'+that.data.cur_month)
        console.log(year == that.data.cur_year && month == that.data.cur_month && daysArr[j].date == day && signs[i].isSign == true)
        if (year == that.data.cur_year && month == that.data.cur_month && daysArr[j].date == day && signs[i].isSign == 'true') {
          console.log("已经打卡")
          daysArr[j].isSign = 'true';
        }
        if (year == that.data.cur_year && month == that.data.cur_month && daysArr[j].date == day && signs[i].isSign == 'late') {
          console.log("迟到")
          daysArr[j].isSign = 'late';
        }
      }
    }
    that.setData({ days: daysArr });
    console.log(that.data.days)
  },

  // 切换控制年月，上一个月，下一个月
  handleCalendar: function (e) {
    const handle = e.currentTarget.dataset.handle;
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    if (handle === 'prev') {
      let newMonth = cur_month - 1;
      let newYear = cur_year;
      if (newMonth < 1) {
        newYear = cur_year - 1;
        newMonth = 12;
      }
      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })
      this.calculateEmptyGrids(newYear, newMonth);
      this.calculateDays(newYear, newMonth);
      this.onGetSignUp();
    
    } else {
      let newMonth = cur_month + 1;
      let newYear = cur_year;
      if (newMonth > 12) {
        newYear = cur_year + 1;
        newMonth = 1;
      }
      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })
      this.calculateEmptyGrids(newYear, newMonth);
      this.calculateDays(newYear, newMonth);
      this.onGetSignUp();
     
    }

    //console.log(this.data.cur_month);
  },

  //获取当前用户该任务的签到数组
  onGetSignUp: function () {

    // this.setData({
    //   // signUp: [{ date: '2019 / 10 / 31', isSign: true }, { date: '2019 / 10 / 02', isSign: true }, { date: '2019 / 10 / 01', isSign: true }, { date: '2019 / 10 / 03', isSign: true }] ,
    //   //      count: 0
    //   //    });
    var that = this;
    var month = that.data.cur_month;
  
    if (month < 10){
      console.log(month);
      month = '0' + month
    }
    console.log(month);
    var date = that.data.cur_year + '-' + month
    var user = getApp().globalData.user;
    wx.request({

      // url: getApp().globalData.weburl + '/api/wxRequest/approve/' +id+ '/P',
      url: getApp().globalData.weburl + '/api/wxRequest/record',

      method: 'GET',
      data: {
        date : date,
        user: user
      },

      success: function (res) {
        console.log(res);

         that.setData({
            signUp: res.data.data,
           count: res.data.data.length
        })
         //获取后就判断签到情况
         that.onJudgeSign();
      },
      fail: function (res) {
       

      }
    })



    this.onJudgeSign();
    // var that = this;
    // var Task_User = Bmob.Object.extend("task_user");
    // var q = new Bmob.Query(Task_User);
    // q.get(that.data.objectId, {
    //   success: function (result) {
    //     that.setData({
    //       signUp: result.get("signUp"),
    //       count: result.get("score")
    //     });
    //     //获取后就判断签到情况
    //     that.onJudgeSign();
    //   },
    //   error: function (object, error) {
    //   }
    // });
  }
})
