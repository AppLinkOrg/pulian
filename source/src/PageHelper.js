import Config from "./Config";
import {
    HttpHelper
} from "./HttpHelper";
import { Utils } from "./Utils";
import { useRoute } from "vue-router";






export class PageHelper {

    static Res = null;
    static Inst = null;
    static Text=null;
    static Memberinfo = null;


    static Init(page) {
      let route = useRoute();
      if (route.query.openid!=undefined && route.query.openid!='') {
        window.localStorage.setItem("token",route.query.openid);
     }

     if (route.query.lng!=undefined && route.query.lng!='') {
      window.localStorage.setItem("lng",route.query.lng);
   }
   if (route.query.lat!=undefined && route.query.lat!='') {
    window.localStorage.setItem("lat",route.query.lat);
 }
    
    
    
      console.log(page,'page---');
     
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
                res.footerstate=Utils.HtmlDecode(res.footerstate);
                page.value.Inst = res;
                PageHelper.Inst = res;
            });
        } else {
            page.value.Inst = PageHelper.Inst;
        }
        //PageHelper.loadwechatconfig()


        // if (PageHelper.Text == null) {
        //     HttpHelper.Post("inst/text", {}).then((res) => {
        //         page.value.Text = res;
        //         PageHelper.Text = res;
        //     });
        // } else {
        //     page.value.Text = PageHelper.Text;
        // }
    }

    static LoginAuth(page,callback=undefined) {

        var token = window.localStorage.getItem("token");
    
        if (token != null ) {
    // alert(token+'token')
      
              HttpHelper.Post("member/info", {}).then((res) => {
            if (res == null ) {
              page.value.Memberinfo = null;
              callback(null);
            }else{
              page.value.Memberinfo = res;
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
      static loadwechatconfig(page) {
        HttpHelper.Post("wechat/gensign", {
          url: location.href.split('#')[0]
        }).then((config) => {
          // alert(JSON.stringify(config))
          var json = {
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wxe976c5a333249854', // 必填，公众号的唯一标识
            timestamp: config.timestamp, // 必填，生成签名的时间戳
            nonceStr: config.nonceStr, // 必填，生成签名的随机串
            signature: config.signature, // 必填，签名，见附录1
            jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          };
          console.log("wxconfig", config, json);
          wx.config(json);
    
          wx.ready(function () {
            //分享到朋友圈
            
            //alert("succss");
          })
    
    
        });
      }

}