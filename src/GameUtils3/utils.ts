/**
 * Created by yang on 15/9/20.
 */
module GameUtil
{
  //游戏配置
    export class GameConfig
    {
        public static IP:string = "api.h5.gamexun.com";        //http连接地址
        public static bRunFPS:boolean = false;              //是否显示FPS

        //场景转换
        public static NullAction:number = 0;            //无动画
        public static CrossLeft:number = 1;             //从左往右
        public static TransAlpha:number = 2;            //淡入淡出
        public static OpenDoor:number = 3;              //开门方式

        public static DesignWidth:number = 750;
        public static DesignHeight:number = 1334;

        private stagetY: number = 0;
        private stagetX: number = 0;

        public bfirstplay: boolean;
        public bgamesound: boolean;
        public bgamemusic: boolean;

        public constructor()
        {
            this.bgamemusic = true;
            this.bgamesound = true;
        }

        private static _instance: GameConfig = null;
        public static _i(): GameConfig
        {
            if(this._instance == null){
                this._instance = new GameUtil.GameConfig();
            }

            return this._instance;
        }

        public setStageHeight(stagety: number):void
        {
            this.stagetY = stagety;
        }
        public getSH():number
        {
            return this.stagetY;
        }

        public setStageWidth(stagetx: number):void
        {
            this.stagetX = stagetx;
        }
        public getWH():number
        {
            return this.stagetX;
        }

    }

    /**
     * 创建矩形实心框
     * @param x {number} x轴坐标
     * @param y {number} y轴坐标
     * @param width {number} 长度
     * @param height {number} 高度
     * @param alpha {number} 透明度
     * @param color {number} 颜色
     * @returns {egret.Shape}
     */
    export function createRect(x:number,y:number,width:number,height:number,alpha:number=1,color:number=0x000000):egret.Shape
    {
        var shp:egret.Shape = new egret.Shape();
        shp.x = x;
        shp.y = y;
        shp.graphics.beginFill(color,alpha);
        shp.graphics.drawRect(0,0,width,height);
        shp.graphics.endFill();
        return shp;
    }


    export function createCircle(x:number,y:number,r:number,alpha:number=1,color:number=0x000000):egret.Shape
    {
        var shp:egret.Shape = new egret.Shape();
        shp.x = x;
        shp.y = y;
        shp.graphics.beginFill( color, alpha);
        shp.graphics.drawCircle( 0, 0, r );
        shp.graphics.endFill();
        return shp;
    }

    /**
     * 将Object转化成 =& post字符串;
     * @param postData
     * @returns {string}
     */
    export function objectToString( postData ):string
    {
        var s = '';
        for( var key in postData )
        {
            var k_v = key + '=' + postData[key];
            s += k_v + '&';
        }
        s = s.substr( 0, s.length - 1 );
        return s;
    }

    /**
     * 正则表达式判断是否为中文
     * @param name
     * @returns {boolean}
     */
    export function isChineseName( name:string ):boolean
    {
        return /^[\u4e00-\u9fa5]+$/.test( name );
    }

    export function removeimag(name:string):string
    {

        name = name.replace(/^/, '');
        return name;
    }

    /**
     * 正则表达式判断是否为手机号码
     * @param num
     * @returns {boolean}
     */
    export function  isPhoneNum( num:string ):boolean
    {
        num = num.toUpperCase();
        return /^0\d{2,3}-?\d{7,11}$|^1\d{10}$/.test( num );
    }

    /**
     * 数字向上飘动动画（待改进，向指定地方移动）
     * @param thisObj
     * @param x
     * @param y
     * @param size
     * @param number
     * @param color
     */
    export function numberUpDisp(thisObj:any,x:number,y:number,size:number,number:string,color:number)
    {
        var textfiled:egret.TextField = new egret.TextField();
        textfiled.x = x;
        textfiled.y = y;
        textfiled.size = size;
        textfiled.textAlign = "center";
        textfiled.textColor = color;
        textfiled.text = number;

        thisObj.addChild(textfiled);

        textfiled.anchorOffsetX = 0.5*textfiled.width;
        textfiled.anchorOffsetY = 0.5*textfiled.height;

        egret.Tween.get(textfiled).to({y:y-40},700);
        egret.Tween.get(textfiled).to({alpha:0},700).call(function(){thisObj.removeChild(textfiled);},thisObj);
    }

    /**
     * 本地文件操作
     * @param key {string} 文件的关键字
     * @param data {string} 文件内容
     */
    export function saveLocalData(key:string,data:string)
    {
        egret.localStorage.setItem(key,data);
    }
    export function readLocalData(key:string)
    {
        egret.localStorage.getItem(key);
    }
    export function clearLocalData(key:string) {
        if (key != null) {
            egret.localStorage.removeItem(key);
        }
        else {
            egret.localStorage.clear();
        }

    }

    /**
     * 获取当前链接参数
     * @param name 参数名
     */
    export function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]); return null;
    }

    export function setscreenY(y:number):number{
        if(y >= GameUtil.GameConfig.DesignHeight/2){
            return GameConfig._i().getSH() - (GameUtil.GameConfig.DesignHeight-y);
        }else
        {
            return y;
        }
    }

    export function getRandom(): number
    {
        var rd: number = Math.floor(Math.random()*100);
        return rd;
    }

    export function getredPack(money:number,openid:any,nickNm:string,backfun:Function,cont:any,url:string=GameUtil.GameConfig.IP)
    {
        var ipstr:string = window['getIP'];

        console.log('ipstr======',ipstr);
        //alert('ipstr====='+ipstr);

        var ipstrspl: string;
        for(var i: number=0;i < ipstr.split('|').length;i++)
        {
            if(ipstr.split('|')[i].length > 6)
            {
                ipstrspl = ipstr.split('|')[i];
                break;
            }
        }

        //alert('ipstrspl======'+ipstrspl);
        console.log('ipstrspl====',ipstrspl);

        console.log("money======", money);

        var param:Object = {
            openId: openid,
            amount: money,
            ip: ipstrspl,
            nickname: nickNm,
            gameid: 0
        }
        GameUtil.Http.getinstance().send(param, "/weixinpay/pay", backfun, cont,url);
    }

    //决断是否微信
    export function isWeiXin():boolean
    {
        var ua = window.navigator.userAgent.toLowerCase();
       // alert('isweixin:'+ua.indexOf('micromessenger'));
        if(ua.indexOf('micromessenger') != -1){
            return true;
        }else{
            return false;
        }
    }

    //决断是否安卓
    export function isAndroid():boolean
    {
        var ua = window.navigator.userAgent.toLowerCase();
       // alert('isAndroid:'+ua.indexOf('android'));
        if(ua.indexOf('android') != -1){
            return true;
        }else{
            return false;
        }
    }

    //变灰滤镜
    export function changeGray(obj)
    {
        //颜色矩阵数组
        var colorMatrix = [
            0.3,0.6,0,0,0,
            0.3,0.6,0,0,0,
            0.3,0.6,0,0,0,
            0,0,0,1,0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        obj.filters = [colorFlilter];
    }
    //发光滤镜
    export function changeLight(): any
    {
        var color:number = 0x2655ed;        /// 光晕的颜色，十六进制，不包含透明度
        var alpha:number = 0.8;             /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
        var blurX:number = 60;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
        var blurY:number = 35;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        var strength:number = 2;            /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
        var quality:number = egret.BitmapFilterQuality.HIGH;        /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
        var inner:boolean = false;            /// 指定发光是否为内侧发光，暂未实现
        var knockout:boolean = false;            /// 指定对象是否具有挖空效果，暂未实现
        var glowFilter:egret.GlowFilter = new egret.GlowFilter( color, alpha, blurX, blurY,
            strength, quality, inner, knockout );

        return [glowFilter];
    }

    /**
     * 设置缩放大小
     * @param obj
     */
    export function getscalex(): number
    {
        var scale: number = 1;
        if(GameConfig._i().getWH() > GameConfig.DesignWidth)
        {
            scale = GameConfig._i().getWH()/GameConfig.DesignWidth;
        }

        return scale;
    }
    export function getscaley(): number
    {
        var scale: number = 1;
        if(GameConfig._i().getSH() > GameConfig.DesignHeight)
        {
            scale = GameConfig._i().getSH()/GameConfig.DesignHeight;
        }

        return scale;
    }

    export function relativepos(obj1:any,obj2:any,posx:number,posy:number,anx:boolean = false)
    {
        if(!anx)
        {
            obj1.x = obj2.x-obj2.width/2 + posx;
            obj1.y = obj2.y-obj2.height/2 + posy;
        }

    }

}