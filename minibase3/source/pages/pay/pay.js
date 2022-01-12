// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import {
  WechatApi
} from "../../apis/wechat.api.js";
import {
  MemberApi
} from "../../apis/member.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      type:''
    })

    if (this.Base.options.type=='A') {
     this.pay2()
    }else
    if (this.Base.options.type=='B') {
      this.pay3()
     }
    
    else{
      this.pay();
    }
    
    
    
  }
  onMyShow() {


    
  }

  pay(){
    var that =this;
    var wechatapi=new WechatApi(); 
    var memberapi=new MemberApi(); 
    wechatapi.prepay({id:this.Base.options.id},(payret)=>{
      console.log(payret,'支付回调');

      payret.complete = function (e) {
        if (e.errMsg == "requestPayment:ok") { 

          that.Base.toast("支付成功");

          // memberapi.addpointsrecord({
          //   totle:1000
          // },(ret)=>{ 
           
          // })

          wx.navigateBack({
            delta: 0,
          })
           
        }else{
          that.Base.toast("支付失败");
          wx.navigateBack({
            delta: 0,
          })
        }
      }
 
      wx.requestPayment(payret)
    })
  }
  pay3(){
    // 优惠券支付
    var that =this;
    var wechatapi=new WechatApi(); 
    var memberapi=new MemberApi(); 
    wechatapi.prepay3({id:this.Base.options.id},(payret)=>{
      console.log(payret,'支付回调');

      payret.complete = function (e) {
        if (e.errMsg == "requestPayment:ok") { 

          that.Base.toast("支付成功");
          wx.navigateBack({
            delta: 0,
          })
         
           
        }else{
          that.Base.toast("支付失败");
          wx.navigateBack({
            delta: 0,
          })
        }
      }
 
      wx.requestPayment(payret)
    })
  }
  pay2(){
    // 服务支付
    var that =this;
    var wechatapi=new WechatApi(); 
    var memberapi=new MemberApi(); 
    wechatapi.prepay2({id:this.Base.options.id},(payret)=>{
      console.log(payret,'支付回调');

      payret.complete = function (e) {
        if (e.errMsg == "requestPayment:ok") { 

          that.Base.toast("支付成功");
          wx.navigateBack({
            delta: 0,
          })
         
           
        }else{
          that.Base.toast("支付失败");
          wx.navigateBack({
            delta: 0,
          })
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

body.pay = content.pay;
body.pay2 = content.pay2;
body.pay3 = content.pay3;
Page(body)