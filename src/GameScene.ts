/**
 * Created by pior on 16/11/17.
 */

enum DIRECTION  {UP,RIGHT,DOWN,LEFT};     //方向

class GameScene extends GameUtil.BassPanel
{
    private playerrole: RoleSprite;
    public GameMapContain: egret.DisplayObjectContainer;

    public constructor(){
        super();
    }

    public init()
    {
        this.showgamebg();
    }

    private showgamebg()
    {
        this.GameMapContain = new egret.DisplayObjectContainer();
        this.addChild(this.GameMapContain);
        var GameMap: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('mapblue_png'),this.mStageW/2,this.mStageH/2);
        this.GameMapContain.addChild(GameMap);

       // this.playerrole = new RoleSprite(RES.getRes('shopself_'+GameData._i().PlayerRoleType+'_png'),this.mStageW/2,this.mStageH/2);
        this.playerrole =  new RoleSprite('roletype'+GameData._i().PlayerRoleType,4,80,this.mStageW/2,this.mStageH/2);
        this.GameMapContain.addChild(this.playerrole);
        this.playerrole.setLoop(-1);
        this.playerrole.play();
        this.playerrole.pause();
        this.playerrole.speed = GameData._i().PlayerRoleSpeed;

        //var self: any = this;
        //var bombtn: egret.Shape = GameUtil.createRect(0,0,this.mStageW,this.mStageH,0.5);

        var rolecontrolimg: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('roleControlimg_png'),this.mStageW/2,1170);
        this.addChild(rolecontrolimg);
        var dirpos: number[][] = [[367,1090],[447,1169],[369,1253],[294,1169],[375,1170]];
        for(var i:number=0;i < 5;i++)
        {
            var dircontrolbtn: Dircontorllayer = new Dircontorllayer(RES.getRes('helpselect_png'),dirpos[i][0],dirpos[i][1],i,this.playerrole);
            dircontrolbtn.scaleX = 3;
            dircontrolbtn.scaleY = 3;
            dircontrolbtn.alpha = 0;
            this.addChild(dircontrolbtn);
        }

        //this.addChild(new GameOverScene(100,1,1,0));
    }

}