/**
 * Created by pior on 16/11/18.
 */
var Dircontorllayer = (function (_super) {
    __extends(Dircontorllayer, _super);
    function Dircontorllayer(texture, posx, posy, touchid, role) {
        _super.call(this, texture, posx, posy);
    }
    var d = __define,c=Dircontorllayer,p=c.prototype;
    p.initobj = function (touchid, role) {
        var dirlay = this.parent;
        this.playerrole = role;
        this.touchID = touchid;
        this.touchEnabled = true;
        this.active = false;
        dirlay.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.DirTouchBegin, this);
        dirlay.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.DirTouchMove, this);
        dirlay.addEventListener(egret.TouchEvent.TOUCH_END, this.DirTouchEnd, this);
        dirlay.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.DirTouchCancel, this);
    };
    p.DirTouchBegin = function (evt) {
        if (this.active) {
            return;
        }
        this.active = true;
        if (this.touchID == 4) {
        }
        else {
            var gamecon = (this.parent.parent);
            for (var i = 0; i < gamecon.controldirarr.length; i++) {
                var dircontrolbtn = gamecon.controldirarr[i];
                var dir = parseInt(dircontrolbtn.name);
                if (dir == -1) {
                    continue;
                }
                //console.log('evtstagex=====',evt.stageX,'evtstagey=====',evt.stageY);
                if (dircontrolbtn.hitTestPoint(evt.$stageX, evt.stageY)) {
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
        if (!this.active) {
            return;
        }
        if (this.touchID == 4) {
        }
        else {
            var dirlay = this.parent;
            //console.log('hitpoint=====',this.hitTestPoint(evt.stageX,evt.stageY));
            //if(!this.hitTestPoint(evt.$stageX,evt.$stageY))
            //{
            //    console.log('moveout');
            //    dirlay.dispatchEventWith(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE);
            //    return;
            //}
            var gamecon = dirlay.parent;
            for (var i = 0; i < gamecon.controldirarr.length; i++) {
                var dircontrolbtn = gamecon.controldirarr[i];
                var dir = parseInt(dircontrolbtn.name);
                if (dir == -1) {
                    if (!dircontrolbtn.hitTestPoint(evt.stageX, evt.stageY)) {
                    }
                    continue;
                }
                //console.log('evtstagex=====',evt.stageX,'evtstagey=====',evt.stageY);
                if (dircontrolbtn.hitTestPoint(evt.$stageX, evt.stageY)) {
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
        if (!this.active) {
            return;
        }
        this.active = false;
        if (this.touchID == 4) {
            this.playerrole.putbomb();
        }
        else {
            this.playerrole.stopmove();
            this.touchID = -1;
        }
    };
    p.DirTouchCancel = function (evt) {
        if (!this.active) {
            return;
        }
        this.active = false;
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
