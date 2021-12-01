import Config from "./Config";
import { Utils } from "./Utils";
import {
  HttpHelper
} from "./HttpHelper";



export class PageHelper {

  

  static AppInstance = null;
  static Res = null;
  static Inst = null;
  static Staff = null;
  static Store = null;
  static  iss =false;
  static Init(page, resourcecallback = undefined,instcallback = undefined,debug=false) {
    //shareaccount
    if(page.$route.query.shareaccount!=undefined){
      window.localStorage.setItem("shareaccount",page.$route.query.shareaccount);
    }
   
    

    console.log(page);
    page.api = Config.ApiUrl;
    page.uploadpath = Config.UploadPath;
    page.fileupload = Config.FileUploadAPI;
    page.inwechat=false;
    if (PageHelper.Res == null) {
      HttpHelper.Post("inst/resources", {}).then((res) => {
        page.Res = res;
        PageHelper.Res = res;
        if (resourcecallback != undefined) {
          resourcecallback(PageHelper.Res);
        }
      });
    } else {
      page.Res = PageHelper.Res;
      if (resourcecallback != undefined) {
        resourcecallback(PageHelper.Res);
      }
    }

    if (PageHelper.Inst == null) {
      HttpHelper.Post("inst/info", {}).then((res) => {
        page.Inst = res;
        PageHelper.Inst = res;
        if (instcallback != undefined) {
          instcallback(PageHelper.Inst);
        }
      });
    } else {
      page.Inst = PageHelper.Inst;
      if (instcallback != undefined) {
        instcallback(PageHelper.Inst);
      }
    }

    var store_id=window.localStorage.getItem("store_id");
    if (PageHelper.Store == null) {
      HttpHelper.Post("store/info", {id:store_id}).then((res) => {
        page.Store = res;
        PageHelper.Store = res;
      });
    } else {
      page.Store = PageHelper.Store;
    }
    console.log("pageinfo", page);

    page.home = function (event) {
      page.$router.push({
        path: "/"
      });
    };
    page.routeto = function (path, param = {}) {
      page.$router.push({
        path,
        param
      });
    }
    page.contactkefu = function () {
      window.open(page.uploadpath + "inst/" + page.Inst.qrcode)
    }
    page.goBack = function (defaultback=-1) {
      page.$router.back(defaultback);
    }
    page.showloginbox = function (event) {
      PageHelper.AppInstance.ShowLoginBox();
    }
    page.setlang = function (lang) {
      window.localStorage.setItem("lang", lang);
      //page.$i18n.locale = lang;
      //page.lang = lang;
      window.location.reload();
    }
    page.gologin = function (lang) {
      page.routeto("/login");
    }
    page.decode = function (html) {
      return Utils.HtmlDecode(html);
    }
    

    var lang = window.localStorage.getItem("lang");
    lang = lang == 'en-us' ? 'en-us' : 'zh-tc';
    page.lang = lang;

    page.copytext = function (str) {
      let copytext = this.copytext + " " + this.ip;
        this.$copyText( copytext ).then(function (e) {
          
          Notify({type: 'primary',message:page.$t("purchase.copied")});
          console.log(e)
        }, function (e) {
          alert('Can not copy')
          console.log(e)
        })

    }
    page.getFlowSize = function (size) {
      var onk = 1024;
      if (size < 1024) {
        return parseInt(size).toString() + "KB";
      }
      size = size / 1024;

      if (size < 1024) {
        return parseInt(size).toString() + "MB";
      }
      size = size / 1024;
      return parseInt(size).toString() + "GB";
    }
    var token = window.localStorage.getItem("token");
    if (token != null) {
      HttpHelper.Post("store/staffinfo", {}).then((Staff) => {
        page.Staff = Staff;
        PageHelper.Staff = Staff;
      });
    } else {
      page.Staff = null;
      PageHelper.Staff = null;
    }

  }
  
  static LoginAuth(page,callback=undefined) {

    var token = window.localStorage.getItem("token");
    if (token != null) {
      
      HttpHelper.Post("store/staffinfo", {}).then((Staff) => {
        if (Staff == null) {
          page.routeto('login');
        }else{
          if(callback!=undefined){
            callback(Staff);
          }
        }
        
      });
    } else {
      page.routeto('login');
    }
  }

}
