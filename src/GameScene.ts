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
    private increatetooltag: number;
    public obscontain: egret.DisplayObjectContainer;
    public toolcontain: egret.DisplayObjectContainer;
    public bombarr: BombSprite[];
    public readybomarr: BombSprite[];
    public bomeffectarr: GameUtil.MyBitmap[];

    public controldirarr: GameUtil.MyBitmap[];

    public constructor(){
        super();
    }

    public init()
    {
        this.rolearr = [];
        this.bombarr = [];
        this.readybomarr = [];
        this.bomeffectarr = [];
        this.controldirarr = [];
        GameData._i().GameOver = false;
        this.showgamebg();
    }

    private showgamebg()
    {

        GameData._i().gamesound[SoundName.gamebgm].play(0,-1);
        var volume = GameUtil.GameConfig._i().bgamemusic ? 1:0;
        GameData._i().gamesound[SoundName.gamebgm].setvolume(volume);

        this.GameMapContain = new egret.DisplayObjectContainer();
        this.addChild(this.GameMapContain);
        var GameMap: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('mapblue_png'),0,0);
        GameMap.setanchorOff(0,0);
        GameMap.width *= GameUtil.getscalex();
        GameMap.height *= GameUtil.getscaley();
        this.GameMapContain.addChild(GameMap);
        this.GameMapContain.$setWidth(GameMap.width);
        this.GameMapContain.$setHeight(GameMap.height);

       // this.playerrole = new RoleSprite(RES.getRes('shopself_'+GameData._i().PlayerRoleType+'_png'),this.mStageW/2,this.mStageH/2);
        this.playerrole =  new RoleSprite('roletype'+GameData._i().PlayerRoleType,4,80,this.mStageW/2,this.mStageH/2,false);
        this.GameMapContain.addChild(this.playerrole);
        this.playerrole.setSuperstate();
        this.playerrole.initgamecontain();
        this.playerrole.setLoop(-1);
        this.playerrole.play();
        this.playerrole.pause();
        this.playerrole.speed = GameData._i().PlayerRoleSpeed;
        this.rolearr.push(this.playerrole);

        for(var i: number=0;i < GameData.AIROLENUM;i++)
        {
            this.createrole();
        }
        this.obscontain = new egret.DisplayObjectContainer();
        this.GameMapContain.addChild(this.obscontain);

        this.toolcontain = new egret.DisplayObjectContainer();
        this.GameMapContain.addChild(this.toolcontain);

        var rolecontrolimg: Dircontorllayer = new Dircontorllayer(RES.getRes('roleControlimg_png'),this.mStageW/2,this.mStageH-214,-1,this.playerrole);
        this.addChild(rolecontrolimg);
        var dirpos: number[][] = [[185,50],[303,170],[185,300],[60,175],[375,1120]];
        for(var i:number=0;i < 4;i++)
        {
            var dircontrolbtn: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('helpselect_png'),dirpos[i][0],dirpos[i][1]);
            dircontrolbtn.scaleX = 4;
            dircontrolbtn.scaleY = 4;
            dircontrolbtn.alpha = 0;
            this.addChild(dircontrolbtn);
            dircontrolbtn.name = ''+i;
            this.controldirarr.push(dircontrolbtn);
            GameUtil.relativepos(dircontrolbtn,rolecontrolimg,dirpos[i][0],dirpos[i][1]);
        }

        var putbombtn: Dircontorllayer = new Dircontorllayer(RES.getRes('putbombtn_png'),this.mStageW/2,this.mStageH-214,4,this.playerrole);
        this.addChild(putbombtn);


        this.increateobstag = egret.setInterval(this.createobs,this,3000);
        this.increatetooltag = egret.setInterval(this.createtool,this,5000);
    }

    public createrole()
    {
        var posx = [100,500,1000,2000];
        var posy = [100,400,200,300];
        var roletype: number = Math.floor(Math.random()*100)%5;
        var rolex = Math.floor(Math.random()*100)%4;
        var roley = Math.floor(Math.random()*100)%4;
        var airole: RoleSprite = new RoleSprite('roletype'+roletype,4,80,posx[rolex],posy[roley]);
        this.GameMapContain.addChild(airole);
        airole.initgamecontain();
        airole.setLoop(-1);
        airole.play();
        airole.pause();
        airole.speed = 20;
        this.rolearr.push(airole);
    }

    private createobs()
    {
        if(this.obscontain.numChildren >= GameData.OBSNUM)
        {
            return;
        }
        //console.log('createobs');
        var obstype: number = Math.floor(Math.random()*100)%12;
        var obsposx: number = 100 + Math.floor(Math.random()*100000)%(this.GameMapContain.width-100);
        var obsposy: number = 100 + Math.floor(Math.random()*100000)%(this.GameMapContain.height-100);
        var obs: Obstrution = new Obstrution(RES.getRes('obstrution'+obstype+'_png'),obsposx,obsposy);
        this.obscontain.addChild(obs);

        this.chekcobspos(obs);

    }
    private createtool()
    {
        if(this.toolcontain.numChildren >= 4)
        {
            return;
        }

        var obstype: number = Math.floor(Math.random()*100)%1;
        var obsposx: number = 60 + Math.floor(Math.random()*100000)%(this.GameMapContain.width-100);
        var obsposy: number = 60 + Math.floor(Math.random()*100000)%(this.GameMapContain.height-100);
        var obs: Obstrution = new Obstrution(RES.getRes('tool'+obstype+'_png'),obsposx,obsposy);
        this.toolcontain.addChild(obs);

        this.chekcobspos(obs);
    }

    private chekcobspos(obs:any)
    {
        var istouch: boolean = true;
        while(istouch)
        {
            var isenter: boolean = false;
            for(var i:number=0;i <this.obscontain.numChildren-1;i++)
            {
                var othobs = this.obscontain.getChildAt(i);
                var rect1 = this.getrect(othobs);
                var rect2 = this.getrect(obs);
                if(rect1.intersects(rect2))
                {
                    obs.x += 200;
                    isenter = true;
                    break;
                }
            }

            if(!isenter)
            {
                istouch = false;
            }
        }

    }

    public gameover()
    {
        GameData._i().GameOver = true;
        egret.clearInterval(this.increateobstag);
        egret.clearInterval(this.increatetooltag);
        this.addChild(new GameOverScene(100,1,1,0));
    }

    public reset()
    {
        GameData._i().GameOver = false;
        this.increateobstag = egret.setInterval(this.createobs,this,3000);
        this.increatetooltag = egret.setInterval(this.createtool,this,5000);
    }

    private getrect(obj:any): egret.Rectangle
    {
        var rect: egret.Rectangle = obj.getBounds();
        rect.x = obj.x - obj.width/2;
        rect.y = obj.y - obj.height/2;

        return rect;
    }

}