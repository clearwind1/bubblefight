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
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.DirTouchEnd,this);
    }

    private DirTouchBegin(evt:egret.TouchEvent)
    {
        this.playerrole.startmove(this.touchID);
    }
    private DirTouchEnd(evt:egret.TouchEvent)
    {
        this.playerrole.stopmove();
    }

}