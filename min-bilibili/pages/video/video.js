// pages/video/video.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoInfo: '',
    otherVideoList: [],
    commentList: []
  },

  // 获取评论列表
  getCommentList(videoId) {
    let self = this
    wx.request({
      url: 'https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/commentsList?id=' + videoId,
      success(res) {
        console.log(res)
        self.setData({
          commentList: res.data.data.commentData
        })
      }
    })
  },

// 获取相关视频列表
getOtherVideoList(videoId) {
  const self = this
  wx.request({
    url: 'https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/othersList?id=' + videoId,
    success(res) {
      console.log(res)
      self.setData({
        otherVideoList: res.data.data.othersList
      })
    },
    fail(error) {
      console.log(error)
    }
  })
},

  // 获取视频细节
  getCurrentVideo(videoId) {
    const self = this
    wx.request({
      url: 'https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/videoDetail?id=' + videoId,
      success(res) {
        console.log(res)
        self.setData({
          videoInfo: res.data.data.videoInfo
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
    this.getCurrentVideo(options.id)
    this.getOtherVideoList(options.id)
    this.getCommentList(options.id)
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