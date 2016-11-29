/**
 * Created by pior on 16/11/17.
 */
var RoleSprite = (function (_super) {
    __extends(RoleSprite, _super);
    function RoleSprite(textureName, totalNumber, frameRate, posx, posy, isai) {
        if (isai === void 0) { isai = true; }
        _super.call(this, textureName, totalNumber, frameRate, posx, posy);
        this.isAI = isai;
        if (isai) {
            this.aiIntag = egret.setInterval(this.aiRun, this, 1000);
        }
    }
    var d = __define,c=RoleSprite,p=c.prototype;
    p.aiRun = function () {
        var self = this;
        var movedir = Math.floor(Math.random() * 100) % 5;
        this.startmove(movedir);
        egret.setTimeout(function () {
            self.stopmove();
        }, this, 999);
    };
    p.startmove = function (dir) {
        this.rolemovedir = dir;
        this.intage = egret.setInterval(this.moving, this, 100);
        this.resume();
    };
    p.moving = function () {
        var gamecontain = this.parent;
        var obscontain = gamecontain.parent.obscontain;
        var dirbool = [false, false, false, false];
        for (var i = 0; i < obscontain.numChildren; i++) {
            //console.log('obschild=====',obscontain.getChildAt(i));
            var obs = obscontain.getChildAt(i);
            var rect1 = this.getrect(obs);
            var rect2 = this.getrect(this);
            if (rect1.intersects(rect2)) {
                if (obs.y > this.y) {
                    dirbool[DIRECTION.DOWN] = true;
                }
                else if (obs.y < this.y) {
                    dirbool[DIRECTION.UP] = true;
                }
                if (obs.x < this.x) {
                    dirbool[DIRECTION.LEFT] = true;
                }
                else if (obs.x > this.x) {
                    dirbool[DIRECTION.RIGHT] = true;
                }
            }
        }
        var speed = this.speed;
        switch (this.rolemovedir) {
            case DIRECTION.UP:
                if (dirbool[DIRECTION.UP]) {
                    return;
                }
                if (this.isAI) {
                    this.y = (this.y - speed <= 0) ? 0 : (this.y - speed);
                }
                else {
                    if (gamecontain.y == 83) {
                        this.y = (this.y - speed <= 0) ? 0 : (this.y - speed);
                    }
                    else {
                        gamecontain.y = (gamecontain.y + speed >= 83) ? 83 : (gamecontain.y + speed);
                        this.y -= speed;
                    }
                }
                break;
            case DIRECTION.RIGHT:
                if (dirbool[DIRECTION.RIGHT]) {
                    return;
                }
                this.$setScaleX(1);
                if (this.isAI) {
                    this.x = (this.x + speed >= 1720 - this.width) ? 1720 - this.width : (this.x + speed);
                }
                else {
                    if (gamecontain.x == -959) {
                        this.x = (this.x + speed >= 1720 - this.width) ? 1720 - this.width : (this.x + speed);
                    }
                    else {
                        gamecontain.x = (gamecontain.x - speed <= -959) ? -959 : (gamecontain.x - speed);
                        this.x += speed;
                    }
                }
                break;
            case DIRECTION.DOWN:
                if (dirbool[DIRECTION.DOWN]) {
                    return;
                }
                if (this.isAI) {
                    this.y = (this.y + speed >= (1500 - this.height - 74)) ? (1500 - this.height - 74) : (this.y + speed);
                }
                else {
                    if (gamecontain.y == -83) {
                        this.y = (this.y + speed >= (1500 - this.height - 74)) ? (1500 - this.height - 74) : (this.y + speed);
                    }
                    else {
                        gamecontain.y = (gamecontain.y - speed <= -83) ? -83 : (gamecontain.y - speed);
                        this.y += speed;
                    }
                }
                break;
            case DIRECTION.LEFT:
                this.$setScaleX(-1);
                if (dirbool[DIRECTION.LEFT]) {
                    return;
                }
                if (this.isAI) {
                    this.x = (this.x - speed <= (-980 + this.width)) ? -980 + this.width : (this.x - speed);
                }
                else {
                    if (gamecontain.x == 959) {
                        this.x = (this.x - speed <= (-980 + this.width)) ? -980 + this.width : (this.x - speed);
                    }
                    else {
                        gamecontain.x = (gamecontain.x + speed >= 959) ? 959 : (gamecontain.x + speed);
                        this.x -= speed;
                    }
                }
                break;
        }
    };
    p.stopmove = function () {
        this.pause();
        egret.clearInterval(this.intage);
    };
    p.putbomb = function () {
        //console.log('putbomb');
        var gamecontain = this.parent;
        var bomb = new BombSprite(RES.getRes('shopselftool_' + GameData._i().PlayerToolType + '_png'), this.x, this.y);
        gamecontain.addChild(bomb);
        gamecontain.swapChildren(this, bomb);
    };
    p.die = function () {
        console.log('die====');
        if (!this.isAI) {
            var gamecontain = this.parent.parent;
            gamecontain.gameover();
        }
        else {
            var gamecontain = this.parent.parent;
            egret.clearInterval(this.intage);
            this.parent.removeChild(this);
            var index = gamecontain.rolearr.indexOf(this);
            gamecontain.rolearr.splice(index, 0);
        }
    };
    p.getrect = function (obj) {
        var rect = obj.getBounds();
        rect.x = obj.x - obj.width / 2;
        rect.y = obj.y - obj.height / 2;
        return rect;
    };
    return RoleSprite;
}(GameUtil.Animation));
egret.registerClass(RoleSprite,'RoleSprite');
