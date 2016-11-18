/**
 * Created by pior on 16/11/17.
 */
var GameOverScene = (function (_super) {
    __extends(GameOverScene, _super);
    function GameOverScene(score, kill, died, rekill) {
        _super.call(this);
        this.initdata(score, kill, died, rekill);
    }
    var d = __define,c=GameOverScene,p=c.prototype;
    p.initdata = function (score, kill, died, rekill) {
        this.showgameoverbg(score, kill, died, rekill);
    };
    p.showgameoverbg = function (score, kill, died, rekill) {
        this.touchEnabled = true;
        var shap = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 0.6);
        this.addChild(shap);
        var gameoverbg = new GameUtil.MyBitmap(RES.getRes('gameoverbg_png'), this.mStageW / 2, this.mStageH / 2);
        this.addChild(gameoverbg);
        var gameovertext = new GameUtil.MyBitmap(RES.getRes('gameovertext_png'), this.mStageW / 2, 512);
        this.addChild(gameovertext);
        var btname = ['gameovershare_png', 'gameoverturnback_png', 'gameoverrelife_png'];
        var btnfun = [this.share, this.turnback, this.relife];
        for (var i = 0; i < 3; i++) {
            var btn = new GameUtil.Menu(this, btname[i], btname[i], btnfun[i]);
            btn.x = 215 + i * 160;
            btn.y = 965;
            this.addChild(btn);
        }
        var infotext = ['得分:', '击杀:', '被杀:', '反杀:'];
        var infoData = [score, kill, died, rekill];
        for (var i = 0; i < 4; i++) {
            var infoT = new GameUtil.MyTextField(253, 588 + 60 * i, 50, 0, 0);
            infoT.setText(infotext[i]);
            infoT.textColor = 0xffffff;
            this.addChild(infoT);
            var infoTD = new GameUtil.MyTextField(378, 588 + 60 * i, 50, 0, 0);
            infoTD.setText('' + infoData[i]);
            infoTD.textColor = 0xf5eb4b;
            this.addChild(infoTD);
        }
    };
    p.share = function () {
        var discont = new egret.DisplayObjectContainer();
        this.addChild(discont);
        var self = this;
        var discover = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 0.6);
        discont.addChild(discover);
        discover.touchEnabled = true;
        discover.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            self.removeChild(discont);
        }, this);
        var sharetip = new GameUtil.MyBitmap(RES.getRes('sharetip_png'), this.mStageW, 0);
        sharetip.setanchorOff(1, 0);
        discont.addChild(sharetip);
        /*
         if(this.havename)
         {
         SharePage._i().setdesctext('我的成绩入选名人堂第'+this.myrank+'，敢应战不？');
         }
         else
         {
         var totalsec = Math.floor(TimePanel._i().curtime/1000);
         var min = (Math.floor(totalsec/60)>9)?Math.floor(totalsec/60):('0'+Math.floor(totalsec/60));
         var sec = (totalsec%60)>9?totalsec%60:('0'+totalsec%60);
         SharePage._i().setdesctext('我可以连续跑步'+min+':'+sec+'不休息，你来试试');
         }
         */
    };
    p.turnback = function () {
        this.parent.removeChild(this);
        GameUtil.GameScene.runscene(new StartGameScene());
    };
    p.relife = function () {
        this.parent.removeChild(this);
    };
    return GameOverScene;
}(GameUtil.BassPanel));
egret.registerClass(GameOverScene,'GameOverScene');
