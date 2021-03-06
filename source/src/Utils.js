export class Utils{
    static _throttle (fn,interval,type) {
      if(type === 1){
        let previous = 0;
      }else if(type === 2){
        let timeout;
      }
      var interval = interval || 200;
      return function () {
        var th = this;
        var args = arguments;
        if(type === 1){
          let now = Date.now();
          if (now - previous > interval){
            fn.apply(th,args);
            previous = now;
          }
        }else if(type === 2){
          if(!timeout){
            timeout = setTimeout(()=> {
              timeout = null;
              fn.apply(th,args)
            }, interval);
          }
        }
      }
    }
    static ContentToHtml(str){
        if (str == null) {
            return "";
        }
        var reg = new RegExp("\n", "g"); //创建正则RegExp对象   
        str = str.replace(reg, "<br />");
        return str;
    }
    static HtmlDecode(str) {
        if (str == null) {
            return "";
        }
       
        var s = "";
        if (str.length == 0) return "";
        s = str.replace(/&amp;/g, "&");
        s = s.replace(/&lt;/g, "<");
        s = s.replace(/&gt;/g, ">");
        s = s.replace(/&nbsp;/g, " ");
        s = s.replace(/&#39;/g, "\'");
        s = s.replace(/&quot;/g, "\"");

        //s = s.replace(new RegExp("</p>", "gm"), "</p><br />");

        var reg = new RegExp("\"/alucard263096/pulian/upload/", "g"); //创建正则RegExp对象   
        s = s.replace(reg, "\"https://cmsdev.app-link.org/alucard263096/pulian/upload/");


        var reg = new RegExp("\"/upload/", "g"); //创建正则RegExp对象   
        // s = s.replace(reg, "\"https://api.kalianworld.cn/upload/");

        s = s.replace(reg, "\"https://appwx.chefuzhongxin.com/upload/");
        
        return s;
    }
    static IsMobile(mobile){
        return Number(mobile).toString().length == 11 && mobile[0] == "1";;
    }
    static UUID(){
            var s = [];
            var hexDigits = "0123456789ABCDEF";
            for (var i = 0; i < 32; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23];
            var uuid = s.join("");
            return uuid;
    }
    static GetIDString(arr){
        var arrstr=[];
        for(var i=0;i<arr.length;i++){
            arrstr.push(arr[i].id);
        }
        return arrstr.join(",");
    }
    static GetMileTxt(mile) {
        console.log(mile);
        if (mile > 10000) {
          return + (mile / 1000.0).toFixed(0) + "km";
        }
        if (mile > 1000 && mile<10000) {
          return + (mile / 1000.0).toFixed(1) + "km";
        } else if (mile < 100) {
          return "100米内";
        } else {
          return "" + mile + "m";
        }
      }
      static GetTime(second){
        // const days = Math.floor(second / 86400);
    const hours = Math.floor(second  / 3600);
    const minutes = Math.floor((second  % 3600) / 60);
    const seconds = Math.floor((second % 3600) % 60);

    var  duration='';

    if (hours>0) {
          duration = duration + hours + "小时" ;
    }

    if (minutes>0) {
      if (seconds>0) {
        var minutesss=minutes+1
        duration = duration + minutesss+ "分钟" ;
      }else{
         duration = duration + minutes + "分钟" ;
      }


     
    }

  

  

 
    return duration;



      }
}