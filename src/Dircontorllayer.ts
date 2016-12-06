/**
 * Created by pior on 16/11/18.
 */

class Dircontorllayer extends GameUtil.MyBitmap
{
    private touchID: number;
    private playerrole: RoleSprite;
    public constructor(texture:egret.Texture,posx:number,posy:number,touchid:number,role:RoleSprite)
    {
        super(texture,posx,posy);
        this.initobj(touchid,role);
    }

    private initobj(touchid:number,role:RoleSprite)
    {
        this.playerrole = role;
        this.touchID = touchid;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.DirTouchBegin,this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.DirTouchMove,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.DirTouchEnd,this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.DirTouchCancel,this);
    }

    private DirTouchBegin(evt:egret.TouchEvent)
    {
        if(this.touchID == 4)
        {

        }else{

            var gamecon: GameScene = <GameScene>this.parent;
            for(var i:number=0;i < gamecon.controldirarr.length;i++)
            {
                var dircontrolbtn: GameUtil.MyBitmap = <GameUtil.MyBitmap>gamecon.controldirarr[i];
                //console.log('evtstagex=====',evt.stageX,'evtstagey=====',evt.stageY);
                if(dircontrolbtn.hitTestPoint(evt.$stageX,evt.stageY))
                {
                    var dir = parseInt(dircontrolbtn.name);
                    this.touchID = dir;
                    //console.log('touchid=====',this.touchID);
                    this.playerrole.startmove(this.touchID);
                    break;
                }
            }
        }
    }
    private DirTouchMove(evt:egret.TouchEvent)
    {
        //console.log('id======',evt);
        if(this.touchID == 4)
        {

        }else{

            var gamecon: GameScene = <GameScene>this.parent;
            for(var i:number=0;i < gamecon.controldirarr.length;i++)
            {
                var dircontrolbtn: GameUtil.MyBitmap = <GameUtil.MyBitmap>gamecon.controldirarr[i];
                //console.log('evtstagex=====',evt.stageX,'evtstagey=====',evt.stageY);
                if(dircontrolbtn.hitTestPoint(evt.$stageX,evt.stageY))
                {
                    var dir = parseInt(dircontrolbtn.name);

                    if(this.touchID != dir)
                    {
                        this.touchID = dir;
                        //console.log('touchid=====',this.touchID);
                        this.playerrole.stopmove();
                        this.playerrole.startmove(this.touchID);
                        break;
                    }
                }
            }
        }
    }
    private DirTouchEnd(evt:egret.TouchEvent)
    {
        if(this.touchID == 4)
        {
            this.playerrole.putbomb();
        }else{
            this.playerrole.stopmove();
            this.touchID = -1;
        }
    }
    private DirTouchCancel(evt:egret.TouchEvent)
    {
        //console.log('cancel');
        if(this.touchID == 4)
        {
        }else{
            this.playerrole.stopmove();
            this.touchID = -1;
        }
    }

}