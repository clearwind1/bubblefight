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
        this.showgamebg();
    };
    p.showgamebg = function () {
        var GameMap = new GameUtil.MyBitmap(RES.getRes('map_jpg'), this.mStageW / 2, this.mStageH / 2);
        this.addChild(GameMap);
        this.playerrole = new RoleSprite(RES.getRes('shopself_' + GameData._i().PlayerRoleType + '_png'), this.mStageW / 2, 1000);
        this.addChild(this.playerrole);
        this.gamecontain = new egret.DisplayObjectContainer();
        this.addChild(this.gamecontain);
        var rolecontrolimg = new GameUtil.MyBitmap(RES.getRes('roleControlimg_png'), this.mStageW / 2, 1170);
        this.addChild(rolecontrolimg);
        var dirpos = [[367, 1090], [447, 1169], [369, 1253], [294, 1169]];
        for (var i = 0; i < 4; i++) {
            var dircontrolbtn = new Dircontorllayer(RES.getRes('helpselect_png'), dirpos[i][0], dirpos[i][1], i, this.playerrole);
            dircontrolbtn.scaleX = 3;
            dircontrolbtn.scaleY = 3;
            //dircontrolbtn.alpha = 0;
            this.addChild(dircontrolbtn);
        }
        //this.addChild(new GameOverScene(100,1,1,0));
    };
    return GameScene;
}(GameUtil.BassPanel));
egret.registerClass(GameScene,'GameScene');
