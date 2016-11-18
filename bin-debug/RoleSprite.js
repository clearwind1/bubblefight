/**
 * Created by pior on 16/11/17.
 */
var RoleSprite = (function (_super) {
    __extends(RoleSprite, _super);
    function RoleSprite(texture, posx, posy) {
        _super.call(this, texture, posx, posy);
    }
    var d = __define,c=RoleSprite,p=c.prototype;
    p.startmove = function (dir) {
        this.rolemovedir = dir;
        this.intage = egret.setInterval(this.moving, this, 100);
    };
    p.moving = function () {
        switch (this.rolemovedir) {
            case DIRECTION.UP:
                this.y -= 5;
                break;
            case DIRECTION.RIGHT:
                this.x += 5;
                break;
            case DIRECTION.DOWN:
                this.y += 5;
                break;
            case DIRECTION.LEFT:
                this.x -= 5;
                break;
        }
    };
    p.stopmove = function () {
        egret.clearInterval(this.intage);
    };
    return RoleSprite;
}(GameUtil.MyBitmap));
egret.registerClass(RoleSprite,'RoleSprite');
