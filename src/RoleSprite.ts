/**
 * Created by pior on 16/11/17.
 */

class RoleSprite extends GameUtil.Animation
{
    private rolemovedir: DIRECTION;
    private intage: number;
    public speed: number;
    public constructor(textureName:string,totalNumber:number,frameRate:number,posx:number,posy:number)
    {
        super(textureName,totalNumber,frameRate,posx,posy);
    }

    public startmove(dir:DIRECTION)
    {
        this.rolemovedir = dir;
        this.intage = egret.setInterval(this.moving,this,100);
        this.resume();
    }

    private moving()
    {
        var gamecontain: egret.DisplayObjectContainer = <egret.DisplayObjectContainer>this.parent;
        //console.log('gamescene====',gamescene);
        var speed: number = this.speed;
        switch(this.rolemovedir)
        {
            case DIRECTION.UP:
                //this.y -= 5;
                if(gamecontain.y == 83)
                {
                    this.y = (this.y-speed <= (12)) ? 12:(this.y-speed);
                }
                else
                {
                    gamecontain.y = (gamecontain.y+speed >= 83) ? 83:(gamecontain.y+speed);
                    this.y -= speed;
                }
                break;
            case DIRECTION.RIGHT:
               // this.x += 5;
                this.$setScaleX(1);
                if(gamecontain.x == -959)
                {
                    this.x = (this.x+speed >= 1720-this.width) ? 1720-this.width:(this.x+speed);
                }
                else
                {
                    gamecontain.x = (gamecontain.x-speed <= -959) ? -959:(gamecontain.x-speed);
                    this.x += speed;
                }
                break;
            case DIRECTION.DOWN:
                //this.y += 5;
                //gamescene.GameMapContain.y -= speed;
                //console.log('thisY====',this.y);
                if(gamecontain.y == -83)
                {
                    this.y = (this.y+speed >= (1500-this.height-32)) ? (1500-this.height-32):(this.y+speed);
                }
                else
                {
                    gamecontain.y = (gamecontain.y-speed <= -83) ? -83:(gamecontain.y-speed);
                    this.y += speed;
                }
                break;
            case DIRECTION.LEFT:
                this.$setScaleX(-1);
                //this.x -= 5;
                //gamescene.GameMapContain.x += speed;
                //console.log('this.X====',this.x);
                if(gamecontain.x == 959)
                {
                    this.x = (this.x-speed <= (-980+this.width)) ? -980+this.width:(this.x-speed);
                }
                else
                {
                    gamecontain.x = (gamecontain.x+speed >= 959) ? 959:(gamecontain.x+speed);
                    this.x -= speed;
                }
                break;
        }
    }

    public stopmove()
    {
        this.pause();
        egret.clearInterval(this.intage);
    }

    public putbomb()
    {
        console.log('putbomb');
        var gamecontain: egret.DisplayObjectContainer = <egret.DisplayObjectContainer>this.parent;
    }

}