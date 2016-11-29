/**
 * Created by pior on 16/11/17.
 */
var DIRECTION;
(function (DIRECTION) {
    DIRECTION[DIRECTION["UP"] = 0] = "UP";
    DIRECTION[DIRECTION["RIGHT"] = 1] = "RIGHT";
    DIRECTION[DIRECTION["DOWN"] = 2] = "DOWN";
    DIRECTION[DIRECTION["LEFT"] = 3] = "LEFT";
})(DIRECTION || (DIRECTION = {}));
; //方向
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.init = function () {
        this.rolearr = [];
        this.showgamebg();
    };
    p.showgamebg = function () {
        this.GameMapContain = new egret.DisplayObjectContainer();
        this.addChild(this.GameMapContain);
        var GameMap = new GameUtil.MyBitmap(RES.getRes('mapblue_png'), this.mStageW / 2, this.mStageH / 2);
        this.GameMapContain.addChild(GameMap);
        // this.playerrole = new RoleSprite(RES.getRes('shopself_'+GameData._i().PlayerRoleType+'_png'),this.mStageW/2,this.mStageH/2);
        this.playerrole = new RoleSprite('roletype' + GameData._i().PlayerRoleType, 4, 80, this.mStageW / 2, this.mStageH / 2, false);
        this.GameMapContain.addChild(this.playerrole);
        this.playerrole.setLoop(-1);
        this.playerrole.play();
        this.playerrole.pause();
        this.playerrole.speed = GameData._i().PlayerRoleSpeed;
        this.rolearr.push(this.playerrole);
        for (var i = 0; i < 2; i++) {
            var airole = new RoleSprite('roletype' + GameData._i().PlayerRoleType, 4, 80, 100 + i * 2000, 100);
            this.GameMapContain.addChild(airole);
            airole.setLoop(-1);
            airole.play();
            airole.pause();
            airole.speed = 20;
            this.rolearr.push(airole);
        }
        this.obscontain = new egret.DisplayObjectContainer();
        this.GameMapContain.addChild(this.obscontain);
        //var self: any = this;
        //var bombtn: egret.Shape = GameUtil.createRect(0,0,this.mStageW,this.mStageH,0.5);
        var rolecontrolimg = new GameUtil.MyBitmap(RES.getRes('roleControlimg_png'), this.mStageW / 2, 1170);
        this.addChild(rolecontrolimg);
        var dirpos = [[367, 1090], [447, 1169], [369, 1253], [294, 1169], [375, 1170]];
        for (var i = 0; i < 5; i++) {
            var dircontrolbtn = new Dircontorllayer(RES.getRes('helpselect_png'), dirpos[i][0], dirpos[i][1], i, this.playerrole);
            dircontrolbtn.scaleX = 3;
            dircontrolbtn.scaleY = 3;
            dircontrolbtn.alpha = 0;
            this.addChild(dircontrolbtn);
        }
        this.increateobstag = egret.setInterval(this.createobs, this, 1000);
    };
    p.createobs = function () {
        if (this.obscontain.numChildren >= 20) {
            return;
        }
        console.log('createobs');
        var obstype = Math.floor(Math.random() * 100) % 12;
        var obsposx = 60 + Math.floor(Math.random() * 100000) % 2548;
        var obsposy = 60 + Math.floor(Math.random() * 100000) % 1380;
        var obs = new Obstrution(RES.getRes('obstrution' + obstype + '_png'), obsposx, obsposy);
        this.obscontain.addChild(obs);
    };
    p.gameover = function () {
        egret.clearInterval(this.increateobstag);
        this.addChild(new GameOverScene(100, 1, 1, 0));
    };
    p.reset = function () {
        this.increateobstag = egret.setInterval(this.createobs, this, 3000);
    };
    return GameScene;
}(GameUtil.BassPanel));
egret.registerClass(GameScene,'GameScene');
