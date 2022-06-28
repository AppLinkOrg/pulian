// pages/qrcode/qrcode.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { LandApi } from "../../apis/land.api.js";
import {
    MemberApi
  } from "../../apis/member.api.js";

  
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    super.onLoad(options);
    this.Base.setMyData({
      
    })
  }
  onMyShow() {
    var landapi = new LandApi()
    landapi.landdetail({
      id:"1"
    },(res)=>{
      this.Base.setMyData({
        land:res
      })
    })
    var that = this;
    
  }



}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;


body.saoma = content.saoma;
body.backGo = content.backGo;

Page(body)