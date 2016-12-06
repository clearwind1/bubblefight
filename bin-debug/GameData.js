/**
 * Created by pior on 16/11/17.
 */
var GameData = (function () {
    function GameData() {
        this.GameOver = false;
        this.isLoadingend = false;
        this.isgetInfoend = false;
        this.UserInfo = {
            'ID': '',
            'nickname': '',
            'gender': 0,
            'roletype': '',
            'rolename': 0,
            'openid': '',
            'paopaocount': 0,
            'jifen': 0,
            'killcount': 0,
            'bekillcount': 0,
            'shareopenid': '',
            'prizecount': 3 //抽奖次数
        };
        //this.init();
    }
    var d = __define,c=GameData,p=c.prototype;
    p.init = function () {
        console.log('init');
        this.PlayerRoleType = 0;
        this.PlayerToolType = 0;
        this.PlayerBubbleNumber = this.UserInfo['paopaocount'];
        //this.PlayerScore = this.UserInfo['jifen'];
        //this.PlayerKill = this.UserInfo['killcount'];
        //this.PlayerDied = this.UserInfo['bekillcount'];
        this.PlayerHadrole = [0];
        this.PlayerHadtool = [0];
        this.PlayerRoleSpeed = 20;
        this.PlayerScore = 0;
        this.PlayerKill = 0;
        this.PlayerDied = 0;
    };
    GameData._i = function () {
        return (this._inst = (this._inst == null ? new GameData() : this._inst));
    };
    GameData.AIROLENUM = 4;
    GameData._inst = null;
    return GameData;
}());
egret.registerClass(GameData,'GameData');
