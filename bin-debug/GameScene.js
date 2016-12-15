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
        GameData._i().gamesound[SoundName.gamebgm].play(0, -1);
        var volume = GameUtil.GameConfig._i().bgamemusic ? 1 : 0;
        GameData._i().gamesound[SoundName.gamebgm].setvolume(volume);
        this.GameMapContain = new egret.DisplayObjectContainer();
        this.addChild(this.GameMapContain);
        var GameMap = new GameUtil.MyBitmap(RES.getRes('mapblue_png'), 0, 0);
        GameMap.setanchorOff(0, 0);
        GameMap.width *= GameUtil.getscalex();
        GameMap.height *= GameUtil.getscaley();
        this.GameMapContain.addChild(GameMap);
        this.GameMapContain.$setWidth(GameMap.width);
        this.GameMapContain.$setHeight(GameMap.height);
        // this.playerrole = new RoleSprite(RES.getRes('shopself_'+GameData._i().PlayerRoleType+'_png'),this.mStageW/2,this.mStageH/2);
        this.playerrole = new RoleSprite('roletype' + GameData._i().PlayerRoleType, 4, 80, this.mStageW / 2, this.mStageH / 2, false);
        this.GameMapContain.addChild(this.playerrole);
        this.playerrole.setSuperstate();
        this.playerrole.initgamecontain();
        this.playerrole.setLoop(-1);
        this.playerrole.play();
        this.playerrole.pause();
        this.playerrole.speed = GameData._i().PlayerRoleSpeed;
        this.playerrole.bompower = 1;
        this.rolearr.push(this.playerrole);
        this.playeridtext = new GameUtil.MyTextField(this.playerrole.x - this.playerrole.width / 2, this.playerrole.y - this.playerrole.height / 2 - 30, 30);
        //this.playeridtext.$setTextAlign(egret.HorizontalAlign.CENTER);
        this.playeridtext.textColor = 0xffffff;
        this.playeridtext.text = '' + GameData._i().UserInfo['ID'];
        this.GameMapContain.addChild(this.playeridtext);
        for (var i = 0; i < GameData.AIROLENUM; i++) {
            this.createrole();
        }
        this.obscontain = new egret.DisplayObjectContainer();
        this.GameMapContain.addChild(this.obscontain);
        this.toolcontain = new egret.DisplayObjectContainer();
        this.GameMapContain.addChild(this.toolcontain);
        var dirlay = new egret.DisplayObjectContainer();
        dirlay.width = this.mStageW;
        dirlay.height = this.mStageH;
        this.addChild(dirlay);
        var rolecontrolimg = new Dircontorllayer(RES.getRes('roleControlimg_png'), this.mStageW / 2, this.mStageH - 214, -1, this.playerrole);
        dirlay.addChild(rolecontrolimg);
        rolecontrolimg.initobj(-1, this.playerrole);
        var dirpos = [[179, 181], [185, 50], [303, 170], [185, 300], [60, 175]];
        for (var i = 0; i < 5; i++) {
            var sc = 4;
            var dircontrolbtn = new GameUtil.MyBitmap(RES.getRes('helpselect_png'), dirpos[i][0], dirpos[i][1]);
            if (i == 0) {
                sc = 14;
            }
            dircontrolbtn.scaleX = sc;
            dircontrolbtn.scaleY = sc;
            dircontrolbtn.alpha = 0;
            this.addChild(dircontrolbtn);
            dircontrolbtn.name = '' + (i - 1);
            this.controldirarr.push(dircontrolbtn);
            GameUtil.relativepos(dircontrolbtn, rolecontrolimg, dirpos[i][0], dirpos[i][1]);
        }
        var putbombtn = new GameUtil.Menu(this, 'putbombtn_png', 'putbombtn_png', this.putbomb);
        putbombtn.x = this.mStageW / 2;
        putbombtn.y = this.mStageH - 214;
        this.addChild(putbombtn);
        this.increateobstag = egret.setInterval(this.createobs, this, 3000);
        this.increatetooltag = egret.setInterval(this.createtool, this, 5000);
    };
    p.putbomb = function () {
        this.playerrole.putbomb();
    };
    p.createrole = function () {
        var posx = [100, 500, 1000, 2000];
        var posy = [100, 400, 200, 300];
        var roletype = Math.floor(Math.random() * 100) % 5;
        var rolex = Math.floor(Math.random() * 100) % 4;
        var roley = Math.floor(Math.random() * 100) % 4;
        var airole = new RoleSprite('roletype' + roletype, 4, 80, posx[rolex], posy[roley]);
        airole.bompower = 1;
        this.GameMapContain.addChild(airole);
        airole.initgamecontain();
        airole.setLoop(-1);
        airole.play();
        airole.pause();
        airole.speed = 20;
        this.rolearr.push(airole);
    };
    p.createobs = function () {
        if (this.obscontain.numChildren >= GameData.OBSNUM) {
            return;
        }
        //console.log('createobs');
        var obstype = Math.floor(Math.random() * 100) % 12;
        var obsposx = 100 + Math.floor(Math.random() * 100000) % (this.GameMapContain.width - 100);
        var obsposy = 100 + Math.floor(Math.random() * 100000) % (this.GameMapContain.height - 100);
        var obs = new Obstrution(RES.getRes('obstrution' + obstype + '_png'), obsposx, obsposy);
        this.obscontain.addChild(obs);
        this.chekcobspos(obs);
    };
    p.createtool = function () {
        if (this.toolcontain.numChildren >= 4) {
            return;
        }
        var obstype = Math.floor(Math.random() * 100) % 2;
        //obstype = 0;
        var obsposx = 60 + Math.floor(Math.random() * 100000) % (this.GameMapContain.width - 100);
        var obsposy = 60 + Math.floor(Math.random() * 100000) % (this.GameMapContain.height - 100);
        var obs = new Obstrution(RES.getRes('tool' + obstype + '_png'), obsposx, obsposy);
        obs.tooltype = obstype;
        this.toolcontain.addChild(obs);
        this.chekcobspos(obs);
    };
    p.chekcobspos = function (obs) {
        var istouch = true;
        while (istouch) {
            var isenter = false;
            for (var i = 0; i < this.obscontain.numChildren - 1; i++) {
                var othobs = this.obscontain.getChildAt(i);
                var rect1 = this.getrect(othobs);
                var rect2 = this.getrect(obs);
                if (rect1.intersects(rect2)) {
                    obs.x += 200;
                    isenter = true;
                    break;
                }
            }
            if (!isenter) {
                istouch = false;
            }
        }
    };
    p.setPlayerIDpos = function (x, y) {
        this.playeridtext.x = x - this.playerrole.width / 2;
        this.playeridtext.y = y;
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
    p.getrect = function (obj) {
        var rect = obj.getBounds();
        rect.x = obj.x - obj.width / 2;
        rect.y = obj.y - obj.height / 2;
        return rect;
    };
    return GameScene;
}(GameUtil.BassPanel));
egret.registerClass(GameScene,'GameScene');
