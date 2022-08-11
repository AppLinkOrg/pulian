// pages/content/content.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";
import {
  CarwashApi
} from "../../apis/carwash.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    wx.setNavigationBarTitle({
      title: '支付成功'
    })
    super.onLoad(options);
    var that = this;
    this.Base.setMyData({
      url:'',
    })
  }
  onMyShow() {
    var id=this.Base.options.id;
    console.log(this.Base.options.type, '666');
    if (this.Base.options.type == 'P') {
      var url = 'https://app.chefuzhongxin.com/#/carwashtcpaysucces?type=P'
      this.Base.setMyData({
        url
      })
    } else {
      var carwashapi = new CarwashApi();
      carwashapi.carwashdetails({
        id
      }, (e) => {
        console.log(e, 'eeee');
        if (e.orderstatus == 'B') {
          var url = 'https://app.chefuzhongxin.com/#/carwashpaysuccess?type=A'
          this.Base.setMyData({
            url
          })
        }
        if (e.orderstatus == 'C') {

          var url = 'https://app.chefuzhongxin.com/#/carwashpaysuccess?type=C'+ '&msg=' + e.fail
          this.Base.setMyData({
            url
          })
        }
      })
    }
    
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.gohome = content.gohome;

Page(body)