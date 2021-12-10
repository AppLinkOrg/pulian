import Config from "./Config";
import {
    HttpHelper
} from "./HttpHelper";
import { Utils } from "./Utils";

export class PageHelper {

    static Res = null;
    static Inst = null;
    static Text=null;
    static Init(page) {
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


        // if (PageHelper.Text == null) {
        //     HttpHelper.Post("inst/text", {}).then((res) => {
        //         page.value.Text = res;
        //         PageHelper.Text = res;
        //     });
        // } else {
        //     page.value.Text = PageHelper.Text;
        // }
    }

}