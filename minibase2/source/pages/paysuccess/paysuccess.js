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
    this.Base.setMyData({
      url:"http://applinkupload.oss-cn-shenzhen.aliyuncs.com/alucard263096/pulian/"
    })
  }
  onMyShow() {
    var that = this;
  }
  gohome(){
    wx.navigateTo({  
      url: '/pages/home/home',
    })

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
body.gohome = content.gohome;

Page(body)