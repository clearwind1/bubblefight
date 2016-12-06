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
        this.bombarr = [];
        this.readybomarr = [];
        this.bomeffectarr = [];
        this.controldirarr = [];
        GameData._i().GameOver = false;
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
        this.playerrole.setSuperstate();
        this.playerrole.initgamecontain();
        this.playerrole.setLoop(-1);
        this.playerrole.play();
        this.playerrole.pause();
        this.playerrole.speed = GameData._i().PlayerRoleSpeed;
        this.rolearr.push(this.playerrole);
        for (var i = 0; i < GameData.AIROLENUM; i++) {
            this.createrole();
        }
        this.obscontain = new egret.DisplayObjectContainer();
        this.GameMapContain.addChild(this.obscontain);
        this.toolcontain = new egret.DisplayObjectContainer();
        this.GameMapContain.addChild(this.toolcontain);
        var rolecontrolimg = new Dircontorllayer(RES.getRes('roleControlimg_png'), this.mStageW / 2, 1120, -1, this.playerrole);
        this.addChild(rolecontrolimg);
        var dirpos = [[375, 1000], [500, 1120], [375, 1240], [254, 1120], [375, 1120]];
        for (var i = 0; i < 4; i++) {
            var dircontrolbtn = new GameUtil.MyBitmap(RES.getRes('helpselect_png'), dirpos[i][0], dirpos[i][1]);
            dircontrolbtn.scaleX = 4;
            dircontrolbtn.scaleY = 4;
            dircontrolbtn.alpha = 0;
            this.addChild(dircontrolbtn);
            dircontrolbtn.name = '' + i;
            this.controldirarr.push(dircontrolbtn);
        }
        var putbombtn = new Dircontorllayer(RES.getRes('putbombtn_png'), this.mStageW / 2, 1120, 4, this.playerrole);
        this.addChild(putbombtn);
        this.increateobstag = egret.setInterval(this.createobs, this, 3000);
        this.increatetooltag = egret.setInterval(this.createtool, this, 5000);
    };
    p.createrole = function () {
        var posx = [100, 500, 1000, 2000];
        var posy = [100, 400, 200, 300];
        var roletype = Math.floor(Math.random() * 100) % 5;
        var rolex = Math.floor(Math.random() * 100) % 4;
        var roley = Math.floor(Math.random() * 100) % 4;
        var airole = new RoleSprite('roletype' + roletype, 4, 80, posx[rolex], posy[roley]);
        this.GameMapContain.addChild(airole);
        airole.initgamecontain();
        airole.setLoop(-1);
        airole.play();
        airole.pause();
        airole.speed = 20;
        this.rolearr.push(airole);
    };
    p.createobs = function () {
        if (this.obscontain.numChildren >= 20) {
            return;
        }
        //console.log('createobs');
        var obstype = Math.floor(Math.random() * 100) % 12;
        var obsposx = 60 + Math.floor(Math.random() * 100000) % 2548;
        var obsposy = 60 + Math.floor(Math.random() * 100000) % 1380;
        var obs = new Obstrution(RES.getRes('obstrution' + obstype + '_png'), obsposx, obsposy);
        this.obscontain.addChild(obs);
    };
    p.createtool = function () {
        if (this.toolcontain.numChildren >= 4) {
            return;
        }
        var obstype = Math.floor(Math.random() * 100) % 1;
        var obsposx = 60 + Math.floor(Math.random() * 100000) % 2548;
        var obsposy = 60 + Math.floor(Math.random() * 100000) % 1380;
        var obs = new Obstrution(RES.getRes('tool' + obstype + '_png'), obsposx, obsposy);
        this.toolcontain.addChild(obs);
    };
    p.gameover = function () {
        GameData._i().GameOver = true;
        egret.clearInterval(this.increateobstag);
        egret.clearInterval(this.increatetooltag);
        this.addChild(new GameOverScene(100, 1, 1, 0));
    };
    p.reset = function () {
        GameData._i().GameOver = false;
        this.increateobstag = egret.setInterval(this.createobs, this, 3000);
        this.increatetooltag = egret.setInterval(this.createtool, this, 5000);
    };
    return GameScene;
}(GameUtil.BassPanel));
egret.registerClass(GameScene,'GameScene');
