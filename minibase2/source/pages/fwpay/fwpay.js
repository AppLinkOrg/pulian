// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import {
    WechatApi
  } from "../../apis/wechat.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    var wechatApi = new WechatApi()
    var order_id=this.Base.options.id
    order_id=1;
    wechatApi.prepay2({order_id},(payret)=>{
        // alert(payret)
        console.log(payret,'支付回调');
      payret.complete = function (e) {
        if (e.errMsg == "requestPayment:ok") {
       

        }
        
      }
     
      wx.requestPayment(payret)
    })


  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
Page(body)