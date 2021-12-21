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
    super.onLoad(options);
    this.Base.setMyData({
      token:'',
      url:'',
      timer:0,

    })
    
  }
  onMyShow() {

    var that = this;

    //  this.Base.getMyData().timer=setInterval(function () {
    //   that.shuax()
    // },1000)

    var useropenid=this.Base.getMyData().useropenid
    console.log(useropenid,'useropenid3333');
    var useropenid=this.Base.getMyData().useropenid
    var lat=this.Base.getMyData().lat
    var lng=this.Base.getMyData().lng
    console.log(useropenid,'useropenid');
  
var str='http://localhost:3000/#/?openid='
// var str='https://uat20.helpfooter.com?'+"rand="+(new Date()).getTime()+'/#/?openid='
console.log('寄哪里了 啊   ');
    if (useropenid!=undefined&&useropenid!=null) {
      str=str+useropenid+'&lng='+lng+'&lat='+lat;
var url=this.Base.getMyData().url
      if (url=='') {
        this.Base.setMyData({url:str})
      }
     
    }

    
  }
 
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

Page(body)