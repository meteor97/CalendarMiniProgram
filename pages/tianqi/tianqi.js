// pages/tianqi/tianqi.js
var app = getApp()
var day = ["今天", "明天", "后天"];
Page({
  data: {
    day: day,
    weather:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    var that=this;
    that.getLocation();
  },
  getLocation: function () {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log("lat:" + latitude + " lon:" + longitude);

        that.getCity(latitude, longitude);
      }
    })
  },
  

  getCity: function (latitude, longitude){
    var that = this
    var url = "https://api.map.baidu.com/geocoder/v2/";
    var params = {
      ak: "1G50Crx5QIKWy5o4R5Q1ONFSgmFIxfIR",
      output: "json",
      location: latitude + "," + longitude
    }


/**发起请求 */
    wx.request({
      url: url,
      data: params,
      success: function (res) {
        var city = res.data.result.addressComponent.city;
        var district = res.data.result.addressComponent.district;
        var street = res.data.result.addressComponent.street;

        that.setData({
          city: city,
          district: district,
          street: street,
        })

        var descCity = city.substring(0, city.length - 1);
        that.getWeahter(descCity);
      },
      fail: function (res) { },
      complete: function (res) { },
    })

  },


  /**获取天气 */
  getWeahter: function () {
    var that = this
    wx.request({
      url: 'http://v.juhe.cn/weather/index',
      data: {
        key: '1eec4c9f55ddc8aaf41423fa879101fc',
        cityname: '广州'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        var tmp = res.data.result.sk.temp;     
        var txt = res.data.result.today.weather;
        var dir = res.data.result.sk.wind_direction;
        var sc = res.data.result.sk.wind_strength;    /**风级 */
        var qlty = res.data.result.today.uv_index;    /**紫外 */
        var hum = res.data.result.sk.humidity;        /**湿度 */
        var fl = res.data.result.today.dressing_index;   /**体感 */
        var daily_forecast = res.data.result.future;

      
        that.setData({
          tmp: tmp,
          txt: txt,
          sc:sc,
          qlty:qlty,
          hum:hum,
          dir: dir,
          fl: fl,
          daily_forecast: daily_forecast
       
        
        });
      }
    })
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