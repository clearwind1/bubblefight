/**
 * Created by pior on 16/11/17.
 */

enum SoundName{clicksound,startsound,putbombsound,bombsound,diesound,startgamebgm,gamebgm,end};

class GameData {

    public static AIROLENUM: number = 4;
    public static OBSNUM: number = 25;
    public GameOver: boolean = false;
    public isLoadingend: boolean = false;
    public isgetInfoend: boolean = false;
    public isSoundOn: boolean[] = [true,true];

    public gamesound: MySound[] = [];

    public UserInfo:Object = {
        'ID':'',
        'nickname':'',
        'gender':0,         //性别
        'roletype':'',      //角色类型
        'rolename':0,       //角色名称
        'openid':'',
        'paopaocount':0,    //泡泡数
        'jifen':0,          //积分
        'killcount':0,      //击杀数
        'bekillcount':0,     //被击杀数
        'shareopenid':'',    //分享者的openid
        'prizecount':3       //抽奖次数
    };

    public PlayerRoleType: number;          //玩家角色类型
    public PlayerToolType: number;          //玩家道具类型
    public PlayerBubbleNumber: number;      //玩家泡泡数
    public PlayerScore: number;             //玩家积分
    public PlayerKill: number;              //玩家击杀次数
    public PlayerDied: number;              //玩家被杀次数
    public PlayerHadrole: number[];         //玩家拥有的角色
    public PlayerHadtool: number[];         //玩家拥有的道具
    public PlayerRoleSpeed: number;         //玩家速度

    public constructor() {
        //this.init();
    }

    public init()
    {
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
    }

    private static _inst:GameData = null;

    public static _i():GameData
    {
        return (this._inst = (this._inst==null ? new GameData():this._inst));
    }
}