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
        showDialog:true
    })
  }
  onMyShow() {
    var that = this;

    // wx.showModal({
    //     title: '温馨提示',
    //     content: '点击确定跳转到微信客服',
    //     success(res){
    //         if (res.confirm) {
    //             console.log('用户点击确定')

    //           } else if (res.cancel) {
    //             console.log('用户点击取消')
    //             wx.navigateBack({
    //               delta: -1,
    //             })
    //           }
    //     }
    // })
  }

  queding(){

  }
  quxiao(){
    wx.navigateBack({
      delta: -1,
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;

body.queding = content.queding;
body.quxiao = content.quxiao;
Page(body)