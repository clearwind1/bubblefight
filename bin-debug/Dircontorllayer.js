/**
 * Created by pior on 16/11/18.
 */
var Dircontorllayer = (function (_super) {
    __extends(Dircontorllayer, _super);
    function Dircontorllayer(texture, posx, posy, touchid, role) {
        _super.call(this, texture, posx, posy);
        this.initobj(touchid, role);
    }
    var d = __define,c=Dircontorllayer,p=c.prototype;
    p.initobj = function (touchid, role) {
        this.playerrole = role;
        this.touchID = touchid;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.DirTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.DirTouchEnd, this);
    };
    p.DirTouchBegin = function (evt) {
        if (this.touchID == 4) {
        }
        else {
            this.playerrole.startmove(this.touchID);
        }
    };
    p.DirTouchEnd = function (evt) {
        if (this.touchID == 4) {
            this.playerrole.putbomb();
        }
        else {
            this.playerrole.stopmove();
        }
    };
    return Dircontorllayer;
}(GameUtil.MyBitmap));
egret.registerClass(Dircontorllayer,'Dircontorllayer');
