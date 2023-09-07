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
      type:this.Base.options.type,
      temp:this.Base.options.temp,
      avatarUrl:'https://appwx.chefuzhongxin.com/Users/upload/resource/cd6f9fd63aafa84713fc1a3cec265040_220716160219_1112122816.jpg'
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
  wxname(e){
    console.log(e.detail.value);
    this.Base.setMyData({
      vname:e.detail.value,
    })
  }
  onChooseAvatar(e) {
    console.log(e,'666');
    const { avatarUrl } = e.detail 
    this.setData({
      avatarUrl,
    })
  }
  getUserInfo2(e) {
    var that = this;
    var memberapi = new MemberApi();
    var openid = AppBase.UserInfo.openid;
    var session_key = AppBase.UserInfo.session_key;
    var nickName = this.Base.getMyData().vname;
    console.log(nickName)
    if(!nickName){
      console.log('nickName666')
      return;
    }
    var avatarUrl = this.Base.getMyData().avatarUrl;
    if(! avatarUrl){
      console.log('avatarUrl')
      return;
    }
    AppBase.UserInfo.nickName = nickName;
    AppBase.UserInfo.avatarUrl = avatarUrl;
    AppBase.UserInfo.openid = openid;
    AppBase.UserInfo.session_key = session_key;
    
    AppBase.UserInfo.touxiang = 'B'
    AppBase.UserInfo.type = 'A'
    AppBase.UserInfo.language = 'zh_CN'
    var json=AppBase.UserInfo
    console.log(json,'openid');
    memberapi.update(json, () => {
      console.log(AppBase.UserInfo,'666');
      that.Base.setMyData({
        UserInfo: AppBase.UserInfo,
        memberinfo: []
      });
      memberapi.info({}, (info) => {
      if(info == null || info == ''){
        wx.showToast({
          title: '获取用户信息失败！',
          icon: 'none'
        })
      }
      that.Base.setMyData({
        memberinfo: info
      });
      })
    });
  }

  backGo(){
    wx.navigateBack({
      delta: -1,
    })
  }

  saoma() {
    // wx.navigateTo({
    //   url: '/pages/zulin/zulin',
    // })
    // return;
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res,'respppp')
        if(res.errMsg=='scanCode:ok')
        { 
          console.log(res,'res.path');
          // wx.navigateTo({
          //   url: res.path,
          // })
        }
      }
    })
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
body.wxname=content.wxname;
body.onChooseAvatar=content.onChooseAvatar;
body.saoma = content.saoma;
body.getUserInfo2 = content.getUserInfo2;
body.backGo = content.backGo;

Page(body)