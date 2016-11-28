/**
 * Created by pior on 16/11/17.
 */
var GameData = (function () {
    function GameData() {
        this.init();
    }
    var d = __define,c=GameData,p=c.prototype;
    p.init = function () {
        console.log('init');
        this.PlayerRoleType = 0;
        this.PlayerToolType = 0;
        this.PlayerBubbleNumber = 10;
        this.PlayerScore = 0;
        this.PlayerKill = 0;
        this.PlayerDied = 0;
        this.PlayerHadrole = [0, 1];
        this.PlayerHadtool = [0, 1, 2, 3, 4, 5];
        this.PlayerRoleSpeed = 20;
    };
    GameData._i = function () {
        return (this._inst = (this._inst == null ? new GameData() : this._inst));
    };
    GameData._inst = null;
    return GameData;
}());
egret.registerClass(GameData,'GameData');
