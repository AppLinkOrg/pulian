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
    wx.setNavigationBarTitle({
      title: '支付成功'
    })
    super.onLoad(options);
    // var that = this;
    // console.log(this.Base.options.type,'666');
    // if(this.Base.options.type == 'P'){
    //   var url = 'https://app.chefuzhongxin.com/#/carwashtcpaysucces?type=P'
    // }else{
    //   var url = 'https://app.chefuzhongxin.com/#/carwashpaysuccess?type=' + this.Base.options.type + '&msg=' + this.Base.options.msg
    // }
    // this.Base.setMyData({ 
    //   url
    // })
  }
  onMyShow() { 
   
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
body.gohome = content.gohome;

Page(body)