/**
 * Created by pior on 16/11/17.
 */

enum DIRECTION  {UP,RIGHT,DOWN,LEFT};     //方向

class GameScene extends GameUtil.BassPanel
{
    private playerrole: RoleSprite;
    public GameMapContain: egret.DisplayObjectContainer;

    public rolearr: RoleSprite[];

    private increateobstag: number;
    public obscontain: egret.DisplayObjectContainer;

    public constructor(){
        super();
    }

    public init()
    {
        this.rolearr = [];
        this.showgamebg();
    }

    private showgamebg()
    {
        this.GameMapContain = new egret.DisplayObjectContainer();
        this.addChild(this.GameMapContain);
        var GameMap: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('mapblue_png'),this.mStageW/2,this.mStageH/2);
        this.GameMapContain.addChild(GameMap);

       // this.playerrole = new RoleSprite(RES.getRes('shopself_'+GameData._i().PlayerRoleType+'_png'),this.mStageW/2,this.mStageH/2);
        this.playerrole =  new RoleSprite('roletype'+GameData._i().PlayerRoleType,4,80,this.mStageW/2,this.mStageH/2,false);
        this.GameMapContain.addChild(this.playerrole);
        this.playerrole.setLoop(-1);
        this.playerrole.play();
        this.playerrole.pause();
        this.playerrole.speed = GameData._i().PlayerRoleSpeed;
        this.rolearr.push(this.playerrole);

        for(var i: number=0;i < 2;i++)
        {
            var airole: RoleSprite = new RoleSprite('roletype'+GameData._i().PlayerRoleType,4,80,100+i*2000,100);
            this.GameMapContain.addChild(airole);
            airole.setLoop(-1);
            airole.play();
            airole.pause();
            airole.speed = 20;
            this.rolearr.push(airole);
        }
        this.obscontain = new egret.DisplayObjectContainer();
        this.GameMapContain.addChild(this.obscontain);

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

        this.increateobstag = egret.setInterval(this.createobs,this,1000);

    }

    private createobs()
    {
        if(this.obscontain.numChildren >= 20)
        {
            return;
        }
        console.log('createobs');
        var obstype: number = Math.floor(Math.random()*100)%12;
        var obsposx: number = 60 + Math.floor(Math.random()*100000)%2548;
        var obsposy: number = 60 + Math.floor(Math.random()*100000)%1380;
        var obs: Obstrution = new Obstrution(RES.getRes('obstrution'+obstype+'_png'),obsposx,obsposy);
        this.obscontain.addChild(obs);
    }

    public gameover()
    {
        egret.clearInterval(this.increateobstag);
        this.addChild(new GameOverScene(100,1,1,0));
    }

    public reset()
    {
        this.increateobstag = egret.setInterval(this.createobs,this,3000);
    }

}