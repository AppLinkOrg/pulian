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
  }
  onMyShow() {
    var that = this;
    this.Base.setMyData({
      url:'https://uat20.helpfooter.com/#/carwashpaysuccess?type=' + this.options.type
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
body.gohome = content.gohome;

Page(body)