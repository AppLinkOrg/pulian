// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
        latstor:0,
        longitude:0,
        num:0
    })
  }
  onMyShow() {
    var that = this;

    var latstor=this.Base.options.latstor*1
    var lngstor=this.Base.options.lngstor*1
    var name=this.Base.options.name
    wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success (res) {
          const latitude = res.latitude
          const longitude = res.longitude
          wx.openLocation({
            latitude,
            longitude,
            scale: 18,
            name

          })
        }
       })


    // wx.openLocation({
    //     latitude: latstor,//要去的纬度-地址
    //     longitude:lngstor,//要去的经度-地址
    //     })
var num =this.Base.getMyData().num
        // if (num*1>1) {
        //     wx.navigateBack({
        //       delta: -1,
        //     })
        // }else{
        //     num=num+1
        //     this.Base.setMyData({num})
        // }
        console.log('dddfff',num);

  }
  onUnload(e){
    console.log("返回fffff",'e')
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;

body.onUnload = content.onUnload;
Page(body)