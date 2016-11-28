/**
 * Created by pior on 16/11/17.
 */

class GameData {

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
        this.init();
    }

    private init()
    {
        console.log('init');
        this.PlayerRoleType = 0;
        this.PlayerToolType = 0;
        this.PlayerBubbleNumber = 10;
        this.PlayerScore = 0;
        this.PlayerKill = 0;
        this.PlayerDied = 0;
        this.PlayerHadrole = [0,1];
        this.PlayerHadtool = [0,1,2,3,4,5];
        this.PlayerRoleSpeed = 20;
    }

    private static _inst:GameData = null;

    public static _i():GameData
    {
        return (this._inst = (this._inst==null ? new GameData():this._inst));
    }
}