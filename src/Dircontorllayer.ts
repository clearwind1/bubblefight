/**
 * Created by pior on 16/11/18.
 */

class Dircontorllayer extends GameUtil.MyBitmap
{
    private touchID: number;
    private playerrole: RoleSprite;
    private active: boolean;
    public constructor(texture:egret.Texture,posx:number,posy:number,touchid:number,role:RoleSprite)
    {
        super(texture,posx,posy);
    }

    public initobj(touchid:number,role:RoleSprite)
    {
        var dirlay: egret.DisplayObjectContainer = <egret.DisplayObjectContainer>this.parent;
        this.playerrole = role;
        this.touchID = touchid;
        this.touchEnabled = true;
        this.active = false;
        dirlay.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.DirTouchBegin,this);
        dirlay.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.DirTouchMove,this);
        dirlay.addEventListener(egret.TouchEvent.TOUCH_END,this.DirTouchEnd,this);
        dirlay.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.DirTouchCancel,this);
    }

    private DirTouchBegin(evt:egret.TouchEvent)
    {

        if(this.active)
        {
            return;
        }

        this.active = true;
        if(this.touchID == 4)
        {
            //console.log('jfdklajf;das');
        }else{

            var gamecon: GameScene = <GameScene>(this.parent.parent);
            for(var i:number=0;i < gamecon.controldirarr.length;i++)
            {
                var dircontrolbtn: GameUtil.MyBitmap = <GameUtil.MyBitmap>gamecon.controldirarr[i];
                var dir = parseInt(dircontrolbtn.name);
                if(dir == -1)
                {
                    continue;
                }
                //console.log('evtstagex=====',evt.stageX,'evtstagey=====',evt.stageY);
                if(dircontrolbtn.hitTestPoint(evt.$stageX,evt.stageY))
                {
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

        if(!this.active)
        {
            return;
        }

        if(this.touchID == 4)
        {

        }else{

            var dirlay: egret.DisplayObjectContainer = <egret.DisplayObjectContainer>this.parent;
            //console.log('hitpoint=====',this.hitTestPoint(evt.stageX,evt.stageY));
            //if(!this.hitTestPoint(evt.$stageX,evt.$stageY))
            //{
            //    console.log('moveout');
            //    dirlay.dispatchEventWith(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE);
            //    return;
            //}

            var gamecon: GameScene = <GameScene>dirlay.parent;
            for(var i:number=0;i < gamecon.controldirarr.length;i++)
            {
                var dircontrolbtn: GameUtil.MyBitmap = <GameUtil.MyBitmap>gamecon.controldirarr[i];
                var dir = parseInt(dircontrolbtn.name);
                if(dir == -1)
                {
                    if(!dircontrolbtn.hitTestPoint(evt.stageX,evt.stageY))
                    {
                        //console.log('moveout');
                        //dirlay.dispatchEventWith(egret.TouchEvent.TOUCH_END);
                        //return;
                    }
                    continue;
                }
                //console.log('evtstagex=====',evt.stageX,'evtstagey=====',evt.stageY);
                if(dircontrolbtn.hitTestPoint(evt.$stageX,evt.stageY))
                {
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

        if(!this.active)
        {
            return;
        }

        this.active = false;

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
        if(!this.active)
        {
            return;
        }

        this.active = false;

        if(this.touchID == 4)
        {
        }else{
            this.playerrole.stopmove();
            this.touchID = -1;
        }
    }

}