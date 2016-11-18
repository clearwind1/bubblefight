/**
 * Created by pior on 16/11/17.
 */

enum DIRECTION  {UP,RIGHT,DOWN,LEFT};     //方向

class GameScene extends GameUtil.BassPanel
{
    private playerrole: RoleSprite;
    private gamecontain: egret.DisplayObjectContainer;
    public constructor(){
        super();
    }

    public init()
    {
        this.showgamebg();
    }

    private showgamebg()
    {
        var GameMap: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('map_jpg'),this.mStageW/2,this.mStageH/2);
        this.addChild(GameMap);

        this.playerrole = new RoleSprite(RES.getRes('shopself_'+GameData._i().PlayerRoleType+'_png'),this.mStageW/2,1000);
        this.addChild(this.playerrole);

        this.gamecontain = new egret.DisplayObjectContainer();
        this.addChild(this.gamecontain);

        var self: any = this;
        var bombtn: egret.Shape = GameUtil.createRect(0,0,this.mStageW,this.mStageH,0.5);

        var rolecontrolimg: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('roleControlimg_png'),this.mStageW/2,1170);
        this.addChild(rolecontrolimg);
        var dirpos: number[][] = [[367,1090],[447,1169],[369,1253],[294,1169]];
        for(var i:number=0;i < 4;i++)
        {
            var dircontrolbtn: Dircontorllayer = new Dircontorllayer(RES.getRes('helpselect_png'),dirpos[i][0],dirpos[i][1],i,this.playerrole);
            dircontrolbtn.scaleX = 3;
            dircontrolbtn.scaleY = 3;
            //dircontrolbtn.alpha = 0;
            this.addChild(dircontrolbtn);
        }

        //this.addChild(new GameOverScene(100,1,1,0));
    }

}