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
      h5Data:'',
      testUrl:'',
      imageUrl:''

    })
    
  }
  onMyShow() {

    var that = this;

    //  this.Base.getMyData().timer=setInterval(function () {
    //   that.shuax()
    // },1000)
    
    var useropenid=this.Base.getMyData().useropenid
    var userunionid=this.Base.getMyData().userunionid
    console.log(useropenid,'useropenid3333');
    var useropenid=this.Base.getMyData().useropenid
    var lat=this.Base.getMyData().lat
    var lng=this.Base.getMyData().lng
    console.log(useropenid,'useropenid');
    // wx.showToast({
    //   title: 'title'+useropenid,
    // })

    
  
    // var str='http://localhost:3000/#/?openid='
// var str='https://uat20.helpfooter.com?'+"rand="+(new Date()).getTime()+'/#/?openid='

let url2 = this.Base.options.url2
// wx.showToast({
//   title: ''+url2,
// })

var str='https://app.chefuzhongxin.com?'+"rand="+(new Date()).getTime()+'/#/?openid='+userunionid
if (url2!=''&&url2!=undefined) {
  str=str+'&url2='+url2
}


console.log('寄哪里了 啊   ');
    // if (useropenid!=undefined&&useropenid!=null) {
      // str=str+userunionid+'&lng='+lng+'&lat='+lat;
var url=this.Base.getMyData().url


// wx.showToast({
//   title: ''+userunionid,
// })





      if (url=='') {
        this.Base.setMyData({url:str})
      }

     
    // }
    
  }

  handleGetMessage(){
    console.log(e.target.data,'进来了')
  }
  bindGetMsg(e){
    let obj = e.detail.data[e.detail.data.length - 1];
    this.Base.setMyData({
      testUrl: obj.wareUrl,
      imageUrl: obj.imageUrl? obj.imageUrl: ""
    })
   
  }

  
  onShareAppMessage(options){
    let that = this;
    var index=options.webViewUrl.lastIndexOf("/#/");
    console.log( index,' options.webViewUrl')
    var obj2=options.webViewUrl.substring(index+3,options.webViewUrl.length);
    console.log( obj2,' options.webViewUrl')
    console.log( options.webViewUrl,' options.webViewUrl')
        console.log( that.Base.getMyData().testUrl,' options.webViewUrl')
    return {
      title: '哈哈',
      path: '/pages/home/home?url2=' + obj2,
      success: (res) => {
       
        console.log( options.webViewUrl,' options.webViewUrl')
        console.log( obj2,' options.webViewUrl')
      }
    }
  }



 
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.handleGetMessage = content.handleGetMessage;

body.bindGetMsg = content.bindGetMsg;
body.onShareAppMessage = content.onShareAppMessage;


Page(body)