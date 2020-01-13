// pages/Calendar/Calendar.js
//打卡日历页面
var util = require('../../utils/util.js');
//var Bmob = require('../../utils/bmob.js');
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
    count: 0,
    meets:[],
    isFile: false
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
    //this.onGetSignUp();
    this.findmeets();
    
    //console.log(this.data.days)
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
      console.log(year + "--" + month + "--" + day);
      day = parseInt(day);
      for (var j = 0; j < daysArr.length; j++) {
        //年月日相同并且已打卡
        console.log(month + '-----------' + that.data.cur_month)
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
      //this.onGetSignUp();

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
      //this.onGetSignUp();

    }

    //console.log(this.data.cur_month);
  },

  //获取当前用户该任务的签到数组
 
  confirm(){
    this.setData({
      isFile: false,
    })

  },
  findFile: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.index);
    console.log(e.currentTarget.dataset.index == null);
    if (e.currentTarget.dataset.index == null) {

    } else {
      var id = e.currentTarget.dataset.index;
      wx.request({
        // url: getApp().globalData.weburl + '/api/wxRequest/approve/' +id+ '/P',
        url: getApp().globalData.weburl + '/api/wxRequest/files',
        method: 'GET',
        data: {
          id: id
        },
        success: function (res) {
          console.log(res)

         console.log(res.data.data)
          that.setData({
            isFile: true,
            fileList:res.data.data
          })
        },
        fail: function (res) {
        }
      })

    }
   
  },
  download: function (e){
    wx.showLoading({
      title: '加载中',
    })
    wx.getSavedFileList({  // 获取文件列表
      success(res) {
        res.fileList.forEach((val, key) => { // 遍历文件列表里的数据
          // 删除存储的垃圾数据
          wx.removeSavedFile({
            filePath: val.filePath
          });
        })
      }
    })
    console.log(e);
    console.log(e.currentTarget.dataset.index);
    console.log(e.currentTarget.dataset.index == null);
    if (e.currentTarget.dataset.index == null){
      
    } else {
      var path = e.currentTarget.dataset.index;
      var url = getApp().globalData.weburl + "/upload/common/" + path
      console.log(url);
      wx.downloadFile({
        url: url,
        success: function (res) {
          console.log(res.tempFilePath)
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          if (res.statusCode === 200) {
           


            wx.openDocument({
                  filePath: res.tempFilePath,
                  success: function (res) {
                    wx.hideLoading();
                    console.log('打开文档成功')
                  },fail:function(res){
                    wx.hideLoading();
                    console.log(res)
                    wx.showModal({
                      title: '',
                      content: '文件打开失败',
                    })
                  }
                })



            // 将临时地址转存到本地缓存中
            // wx.saveFile({
            //   tempFilePath: res.tempFilePath,
            //   success: function (res) {
            //     console.log(res);
            //     var savedFilePath = res.savedFilePath;
            //     console.log('文件已下载到' + savedFilePath);
            //     // 查看下载的文件列表
            //     wx.getSavedFileList({
            //       success: function (res) {
            //         console.log(res);
            //       }
            //     })
            //     // 打开文档
            //     wx.openDocument({
            //       filePath: savedFilePath,
            //       success: function (res) {
            //         wx.hideLoading();
            //         console.log('打开文档成功')
            //       },fail:function(res){
            //         wx.hideLoading();
            //         console.log(res)
            //         wx.showModal({
            //           title: '',
            //           content: '文件打开失败',
            //         })
            //       }
            //     })
            //   },fail:function (res){
            //     wx.hideLoading();
            //     console.log("fail...........")
            //     console.log(res)
            //     wx.showModal({
            //       title: '',
            //       content: '文件加载失败',
            //     })
            //   }
            // })
          } else {
            wx.hideLoading();
            wx.showModal({
              title: '',
              content: '文件获取失败',
            })
          }
        },
        fail: function (res) {
          console.log(res);
          wx.hideLoading();
          wx.showModal({
            title: '',
            content: '文件获取失败',
          })
        }
      });
    }
  },
  findmeets:function(e){
    var that = this;
    var user = getApp().globalData.user;
    var month = this.data.cur_month;
    var day ;
    var currentdate = new Date();
    if(e == null){
      day = currentdate.getDate();
    } else {
      day = e.currentTarget.dataset.index;
    }
    
    if (month < 10) {
      console.log(month);
      month = '0' + month
    }
    if (day < 10) {
      console.log(day);
      day = '0' + day
    }
    console.log(month);
    var date = this.data.cur_year + '-' + month + '-' + day;

    wx.request({

      // url: getApp().globalData.weburl + '/api/wxRequest/approve/' +id+ '/P',
      url: getApp().globalData.weburl + '/api/wxRequest/meets',

      method: 'GET',
      data: {
        user:user,
        date:date
      
      },
      success: function (res) {
        console.log(res);

        that.setData({
          date:date,
          meets: res.data.data
        })
      },
      fail: function (res) {


      }
    })
  }
 
})
