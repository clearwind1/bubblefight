/**
 * Created by pior on 16/11/29.
 */

class Obstrution extends GameUtil.MyBitmap
{
    private isTool: boolean;
    public constructor(texture:egret.Texture,posx:number,posy:number,istool:boolean = true)
    {
        super(texture,posx,posy);
        this.isTool = istool;
    }

}