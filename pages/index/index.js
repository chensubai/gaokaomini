// pages/start/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },
  onLoad(e) {
    var that = this;
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    that.setData({
      userInfo:wx.getStorageSync('userInfo')
    })
  },
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于完善会员资料', 
      success: (res) => {
        wx.login({
          success (res) {
            console.log(res.code)
            if (res.code) {
              //发起网络请求
              wx.request({
                url: 'http://hengchuang.test/v1/test/ping',
                data: {
                  code: res.code
                },
                success(res1){
                  console.log(res1.data.data)
                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
        console.log( res.userInfo);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  goSign() {
    wx.reLaunch({
      url: '/pages/select/index',
    })
  },
})