// pages/qrcode/qrcode.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import {
    MemberApi
  } from "../../apis/member.api.js";

  
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      type:this.Base.options.code
    })
  }
  onMyShow() {
    var that = this;
  }

  backGo(){
    wx.navigateBack({
      delta: -1,
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;


body.backGo = content.backGo;

Page(body)