/**
 * Created by pior on 16/11/28.
 */
var BombSprite = (function (_super) {
    __extends(BombSprite, _super);
    function BombSprite(texture, posx, posy) {
        _super.call(this, texture, posx, posy);
        this.start();
    }
    var d = __define,c=BombSprite,p=c.prototype;
    p.start = function () {
        var self = this;
        this.tw = egret.Tween.get(this, { loop: true }).to({ scaleX: 0.9, scaleY: 0.9 }).to({ scaleX: 1, scaleY: 1 }, 400);
        egret.setTimeout(self.bomb, this, 3000);
    };
    p.bomb = function () {
        //console.log('bomb====',this.tw);
        this.tw.loop = false;
        egret.Tween.removeTweens(this.tw);
        this.visible = false;
        var gamecontain = this.parent;
        this.bombefl = new GameUtil.MyBitmap(RES.getRes('bombeffectl_png'), this.x, this.y);
        this.bombefl.$setScaleX(0);
        gamecontain.addChild(this.bombefl);
        this.bombefp = new GameUtil.MyBitmap(RES.getRes('bombeffectp_png'), this.x, this.y);
        this.bombefp.$setScaleY(0);
        gamecontain.addChild(this.bombefp);
        egret.Tween.get(this.bombefl).to({ scaleX: 1 }, 200);
        egret.Tween.get(this.bombefp).to({ scaleY: 1 }, 200).call(this.checkhit, this);
    };
    p.checkhit = function () {
        var gamecontain = this.parent.parent;
        for (var i = 0; i < gamecontain.rolearr.length; i++) {
            var rect1 = this.getrect(gamecontain.rolearr[i]);
            var rect2 = this.getrect(this.bombefl);
            var rect3 = this.getrect(this.bombefp);
            if (rect1.intersects(rect2) || rect1.intersects(rect3)) {
                gamecontain.rolearr[i].die();
            }
        }
        this.parent.removeChild(this.bombefl);
        this.parent.removeChild(this.bombefp);
        this.parent.removeChild(this);
    };
    p.getrect = function (obj) {
        var rect = obj.getBounds();
        rect.x = obj.x - obj.width / 2;
        rect.y = obj.y - obj.height / 2;
        return rect;
    };
    return BombSprite;
}(GameUtil.MyBitmap));
egret.registerClass(BombSprite,'BombSprite');
