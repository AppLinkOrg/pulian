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
    
  }
  onMyShow() {
    var landapi = new LandApi()
    landapi.landdetail({
      id:"1"
    },(res)=>{
      let str = res.lianjie
     
      let userunionid=this.Base.getMyData().userunionid
      
      str=str.split('?')[0]+"?rand="+(new Date()).getTime()+str.split('?')[1]+'?openid='+userunionid
      console.log(str,'sss');
      this.Base.setMyData({
        land:"https://uat20.helpfooter.com/#/land?rand=1667899434024id=1?openid=ojmtq5rYGCUvstLuKRkaMZdCpBPA"
      })
    })
    
    var that = this;
    
  }
  bindGetMsg(e){
    let obj = e.detail.data[e.detail.data.length - 1];
    this.Base.setMyData({
      testUrl: obj.wareUrl,
      imageUrl: obj.imageUrl? obj.imageUrl: ""
    })
   
  }
  // onShareAppMessage(options){
  //   let that = this;
  //   var index=options.webViewUrl.lastIndexOf("/#/");
  //   console.log( index,' options.webViewUrl')
  //   var obj2=options.webViewUrl.substring(index+3,options.webViewUrl.length);
    
  //   console.log( obj2,' options.webViewUrl9999')
  //   console.log( options.webViewUrl,' options.webViewUrl')
  //       console.log( that.Base.getMyData().testUrl,' options.webViewUrl')
  //   return {
  //     title: '',
  //     path: '/pages/home/home?url2=' + obj2,
  //     success: (res) => {
  //       console.log( options.webViewUrl,' options.webViewUrl')
  //       console.log( obj2,' options.webViewUrl')
  //     }
  //   }
  // }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.handleGetMessage = content.handleGetMessage;
body.goland=content.goland;
body.bindGetMsg = content.bindGetMsg;
body.onShareAppMessage = content.onShareAppMessage;


Page(body)