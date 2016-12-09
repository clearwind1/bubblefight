/**
 * Created by pior on 16/11/17.
 */
var SoundName;
(function (SoundName) {
    SoundName[SoundName["clicksound"] = 0] = "clicksound";
    SoundName[SoundName["startsound"] = 1] = "startsound";
    SoundName[SoundName["putbombsound"] = 2] = "putbombsound";
    SoundName[SoundName["bombsound"] = 3] = "bombsound";
    SoundName[SoundName["diesound"] = 4] = "diesound";
    SoundName[SoundName["startgamebgm"] = 5] = "startgamebgm";
    SoundName[SoundName["gamebgm"] = 6] = "gamebgm";
})(SoundName || (SoundName = {}));
;
var GameData = (function () {
    function GameData() {
        this.GameOver = false;
        this.isLoadingend = false;
        this.isgetInfoend = false;
        this.isSoundOn = [true, true];
        this.gamesound = [];
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
    GameData.OBSNUM = 25;
    GameData._inst = null;
    return GameData;
}());
egret.registerClass(GameData,'GameData');
