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
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.DirTouchMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.DirTouchEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.DirTouchCancel, this);
    };
    p.DirTouchBegin = function (evt) {
        if (this.touchID == 4) {
        }
        else {
            var gamecon = this.parent;
            for (var i = 0; i < gamecon.controldirarr.length; i++) {
                var dircontrolbtn = gamecon.controldirarr[i];
                //console.log('evtstagex=====',evt.stageX,'evtstagey=====',evt.stageY);
                if (dircontrolbtn.hitTestPoint(evt.$stageX, evt.stageY)) {
                    var dir = parseInt(dircontrolbtn.name);
                    this.touchID = dir;
                    //console.log('touchid=====',this.touchID);
                    this.playerrole.startmove(this.touchID);
                    break;
                }
            }
        }
    };
    p.DirTouchMove = function (evt) {
        //console.log('id======',evt);
        if (this.touchID == 4) {
        }
        else {
            var gamecon = this.parent;
            for (var i = 0; i < gamecon.controldirarr.length; i++) {
                var dircontrolbtn = gamecon.controldirarr[i];
                //console.log('evtstagex=====',evt.stageX,'evtstagey=====',evt.stageY);
                if (dircontrolbtn.hitTestPoint(evt.$stageX, evt.stageY)) {
                    var dir = parseInt(dircontrolbtn.name);
                    if (this.touchID != dir) {
                        this.touchID = dir;
                        //console.log('touchid=====',this.touchID);
                        this.playerrole.stopmove();
                        this.playerrole.startmove(this.touchID);
                        break;
                    }
                }
            }
        }
    };
    p.DirTouchEnd = function (evt) {
        if (this.touchID == 4) {
            this.playerrole.putbomb();
        }
        else {
            this.playerrole.stopmove();
            this.touchID = -1;
        }
    };
    p.DirTouchCancel = function (evt) {
        //console.log('cancel');
        if (this.touchID == 4) {
        }
        else {
            this.playerrole.stopmove();
            this.touchID = -1;
        }
    };
    return Dircontorllayer;
}(GameUtil.MyBitmap));
egret.registerClass(Dircontorllayer,'Dircontorllayer');
