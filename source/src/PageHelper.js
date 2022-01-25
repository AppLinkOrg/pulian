import Config from "./Config";
import {
  HttpHelper
} from "./HttpHelper";
import { Utils } from "./Utils";
import { useRoute } from "vue-router";
import { Toast } from "vant";
import wx from "weixin-jsapi";






export class PageHelper {
  static InWechat = false;
  static Res = null;
  static Inst = null;
  static Text = null;
  static Memberinfo = null;
  static kk = "";
  // static getCodeApi=null;


  static kk(page) {

    PageHelper.kk = res;
  }

  static Init(page) {
    let route = useRoute();
    if (route.query.openid != undefined && route.query.openid != '') {
      window.localStorage.setItem("token", route.query.openid);
    }

    if (route.query.lng != undefined && route.query.lng != '') {
      window.localStorage.setItem("lng", route.query.lng);
    }
    if (route.query.lat != undefined && route.query.lat != '') {
      window.localStorage.setItem("lat", route.query.lat);
    }



    console.log(page, 'page---');

    page.value.api = Config.ApiUrl;
    page.value.uploadpath = Config.UploadPath;
    page.value.fileupload = Config.FileUploadAPI;
    page.value.domain = window.location.protocol + "//" + window.location.host
    if (PageHelper.Res == null) {
      HttpHelper.Post("inst/resources", {}).then((res) => {
        page.value.Res = res;
        PageHelper.Res = res;
      });
    } else {
      page.value.Res = PageHelper.Res;
    }

    if (PageHelper.Inst == null) {
      HttpHelper.Post("inst/instinfo", {}).then((res) => {
        res.footerstate = Utils.HtmlDecode(res.footerstate);
        page.value.Inst = res;
        PageHelper.Inst = res;

        if (page.value.Memberinfo==null) {
          PageHelper.loadwechat()
        }
        
      });
    } else {
      page.value.Inst = PageHelper.Inst;
    }
    //

    // if (PageHelper.Text == null) {
    //     HttpHelper.Post("inst/text", {}).then((res) => {
    //         page.value.Text = res;
    //         PageHelper.Text = res;
    //     });
    // } else {
    //     page.value.Text = PageHelper.Text;
    // }


  }

  static LoginAuth(page, callback) {
    console.log('resddddd1');
    var token = window.localStorage.getItem("token");
    console.log(token, 'resddddd1');
    if (token != null) {
      // alert(token+'token')

      HttpHelper.Post("member/info", {}).then((res) => {
        console.log(res, 'resddddd');
        if (res == null) {
          page.value.Memberinfo = null;
          callback(null);
        } else {
          page.value.Memberinfo = res;
          callback(null);
          // if(callback!=undefined){
          //   page.value.Memberinfo = res;


          //   callback(memberinfo);
          // }

          // callback(memberinfo);



        }

      });



    }
    //  else {
    //   page.routeto('login');
    // }

  }
  static wechatconfig = null;
  static loadwechatconfig(wxcallback) {
    // alert(location.href.split('#')[0])
    HttpHelper.Post("wechat/gensign", {
      url: location.href.split('#')[0]
    }).then((config) => {

      var json = {
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: config.appid, // 必填，公众号的唯一标识
        timestamp: config.timestamp, // 必填，生成签名的时间戳
        nonceStr: config.nonceStr, // 必填，生成签名的随机串
        signature: config.signature, // 必填，签名，见附录1
        jsApiList: ['getLocation', 'openLocation', 'chooseImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      };
      // alert(JSON.stringify(config))
      console.log("wxconfig", config, json);
      wx.config(json);
      PageHelper.wechatconfig = json;

      wx.ready(function () {
        if (wxcallback != undefined) {
          wxcallback();
        }
      });


    });
  }






  static getUrlKey(name) { //获取url 参数
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
  }


  static loadwechat() {
    let viewer = window.navigator.userAgent.toLowerCase();

    console.log(viewer, '内容是什么', name)

    if (viewer.match(/MicroMessenger/i) == "micromessenger") {
      wx.miniProgram.getEnv((res) => {
        // alert(JSON.stringify(res))
        if (res.miniprogram) {
          console.log('小程序内', res);
          // Toast('小程序内')


          return

        } else {
          console.log('在微信内，但是不在小程序内');

          // Toast("这里走不走啊");
          // page.inwechat = true;
          PageHelper.inwechat = true
          //Toast("这里走不走啊");

          console.log("这里走不走啊啊嗷嗷啊a")
          //直接调用微信支付
          let code = PageHelper.getUrlKey("code"); //获取url参数code
          //Toast(code+"进这里没");

          // Toast(code + "进这里没");

          console.log(code, 'cccccccccccccc')
          if (code) { //拿到code， code传递给后台接口换取opend
            // Toast("进这里没222");
            HttpHelper.Post("member/getwechatinfo", {
              code,
              ismp: '1'
            }).then((res) => {

              if (res.errcode == undefined) {

                // localStorage.setItem("openid", res.openid);
                // PageHelper.loadwechatconfig(page);


                localStorage.setItem("token", res.unionid);

// var json={}
// json.unionid:res.unionid
// json.avatarUrl:res.avatarUrl
// json.nickName=res.nickName
// json.appid2=res.openid
// json.type='B'


// var json2=JSON.stringify(json)

//                 // 跟新用户信息


if (res.unionid!='') {
   HttpHelper.Post("member/update",{
                  unionid:res.unionid,
                  avatarUrl:res.avatarUrl,
                  nickName:res.nickName,
                  appid2:res.openid,
                  type:'B'
                }).then((res)=>{
                  PageHelper.LoginAuth();
                })
}

               


// HttpHelper.Post("inst/resources", {}).then((res) => {
//   page.value.Res = res;
//   PageHelper.Res = res;
// });
               

                console.log(res, 'tttttttttttttttttttt')

                 


              }
            });
          } else {
            console.log(PageHelper.Inst);
            PageHelper.getCodeApi(PageHelper.Inst.mpappid);
          }

        }


      })
    }
  }


  // else{
  //   console.log('在微信外');
  //   return 
  // }



  static Copy(str) {
    var _input = document.createElement("input"); // 直接构建input
    _input.value = str; // 设置内容
    document.body.appendChild(_input); // 添加临时实例
    _input.select(); // 选择实例内容
    document.execCommand("Copy"); // 执行复制
    document.body.removeChild(_input); // 删除临时实例
    Toast("复制成功");
  }

  static getCodeApi(appid) { //获取code   
    let urlNow = encodeURIComponent(window.location.href);
    let scope = 'snsapi_base'; //snsapi_userinfo   //静默授权 用户无感知
    //let appid='wx4cc5d5c123123123';
    let state = "123";
    let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${urlNow}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`;

    window.location.href = url;
  }

  static getCodeApi(appid) { //获取code   
    let urlNow = encodeURIComponent(window.location.href);
    let scope = 'snsapi_userinfo'; //snsapi_userinfo   //静默授权 用户无感知
    //let appid='wx4cc5d5c123123123';
    let state = "123";
    let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${urlNow}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`;
    //alert(url);
    window.location.href = url;
  }



}