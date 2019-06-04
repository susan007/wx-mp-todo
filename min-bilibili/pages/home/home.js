// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    navList: [],
    currentIndex: 0,
    videoList: [] // 获取视频列表
  },

// 点击nav
  activeNav(e) {
    console.log(e)
    this.setData({
      currentIndex: e.target.dataset.index
    })
  },

// 获取视频列表
  getVideoList() {
    let self = this
    wx.request({
      url: 'https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/videosList',
      success(res) {
        console.log(res)
        self.setData({
          videoList: res.data.data.videosList
        })
      },
      fail(error) {
        console.log(error)
      }
    })
  },

// 获取nav列表
getNavList() {
  let self = this
  wx.request({
    url: 'https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/navList',
    success(res) {
      console.log(res)
      self.setData({
        navList: res.data.data.navList
      })
    },
    fail(error) {
      console.log(error)
    }
  })
},

// 获取swiper列表
  getSwiperList() {
    let self = this
    wx.request({
      url: 'https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/swiperList',
      success(res) {
        console.log(res)
        self.setData({
          swiperList: res.data.data.swiperList
        })
      },
      fail(error) {
        console.log(error)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList()
    this.getNavList()
    this.getVideoList()
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