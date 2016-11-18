/**
 * Created by pior on 16/11/17.
 */

class RoleSprite extends GameUtil.MyBitmap
{
    private rolemovedir: DIRECTION;
    private intage: number;
    public constructor(texture:egret.Texture,posx:number,posy:number)
    {
        super(texture,posx,posy);
    }

    public startmove(dir:DIRECTION)
    {
        this.rolemovedir = dir;
        this.intage = egret.setInterval(this.moving,this,100);
    }

    private moving()
    {
        switch(this.rolemovedir)
        {
            case DIRECTION.UP:
                this.y -= 5;
                break;
            case DIRECTION.RIGHT:
                this.x += 5;
                break;
            case DIRECTION.DOWN:
                this.y += 5;
                break;
            case DIRECTION.LEFT:
                this.x -= 5;
                break;
        }
    }

    public stopmove()
    {
        egret.clearInterval(this.intage);
    }

}