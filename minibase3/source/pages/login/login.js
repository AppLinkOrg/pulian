// pages/content/content.js
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
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      type:this.Base.options.type
    })
  }
  onMyShow() {
    var that = this;

    if(this.Base.options.type=='A'){
      // 头像未授权

    }

    if(this.Base.options.type=='B'){
      // 手机号未授权

    }


  }
  getUserInfo2(e) {
    console.log('getUserInfo2')

    var that = this;
    var memberapi = new MemberApi();
    console.log('getUserInfodddd2')
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: userres => {
        console.log('getUserIddnfodddd3')
        var openid = AppBase.UserInfo.openid;
        var session_key = AppBase.UserInfo.session_key;
        AppBase.UserInfo = userres.userInfo;
        AppBase.UserInfo.openid = openid;
        AppBase.UserInfo.session_key = session_key;
        console.log("loginres4", userres);

        // this.denglu2(2);
        var memberinfo = this.Base.getMyData().memberinfo;
        var json = null;
        json = AppBase.UserInfo;
        json.mobile = this.Base.getMyData().mobile


        //   memberapi.register2(json, (register) => {
        //     console.log('denglu', 333+ register.return)
        //     wx.setStorageSync('token', register.return);
        //     console.log(AppBase.UserInfo);
        //     that.Base.setMyData({
        //       UserInfo: AppBase.UserInfo
        //     });

         
        //     that.checkPermission();
    

        //   });


      },
      fail: userloginres => {
        console.log("auth fail");
        console.log(userloginres);
        console.log('denglu', 444)


      }
    })
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

body.getUserInfo2 = content.getUserInfo2;
body.backGo = content.backGo;

Page(body)