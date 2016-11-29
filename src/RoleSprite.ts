/**
 * Created by pior on 16/11/17.
 */

class RoleSprite extends GameUtil.Animation
{
    private rolemovedir: DIRECTION;
    private intage: number;
    public speed: number;
    private isAI: boolean;
    private aiIntag: number;
    public constructor(textureName:string,totalNumber:number,frameRate:number,posx:number,posy:number,isai:boolean = true)
    {
        super(textureName,totalNumber,frameRate,posx,posy);
        this.isAI = isai;

        if(isai)
        {
            this.aiIntag = egret.setInterval(this.aiRun,this,1000);
        }
    }

    private aiRun()
    {
        var self: any = this;
        var movedir: number = Math.floor(Math.random()*100)%5;
        this.startmove(movedir);
        egret.setTimeout(function(){
            self.stopmove();
        },this,999);
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
        var obscontain: egret.DisplayObjectContainer = (<GameScene>gamecontain.parent).obscontain;

        var dirbool: boolean[] = [false,false,false,false];

        for(var i:number=0;i < obscontain.numChildren;i++)
        {
            //console.log('obschild=====',obscontain.getChildAt(i));
            var obs = obscontain.getChildAt(i);
            var rect1 = this.getrect(obs);
            var rect2 = this.getrect(this);
            if(rect1.intersects(rect2)){
                if(obs.y > this.y){
                    dirbool[DIRECTION.DOWN] = true;
                }
                else if(obs.y < this.y){
                    dirbool[DIRECTION.UP] = true;
                }
                if(obs.x < this.x){
                    dirbool[DIRECTION.LEFT] = true;
                }
                else if(obs.x > this.x){
                    dirbool[DIRECTION.RIGHT] = true;
                }
            }
        }

        var speed: number = this.speed;
        switch(this.rolemovedir)
        {
            case DIRECTION.UP:
                if(dirbool[DIRECTION.UP])
                {
                    return;
                }
                if(this.isAI)
                {
                    this.y = (this.y-speed <= 0) ? 0:(this.y-speed);
                }
                else
                {
                    if(gamecontain.y == 83)
                    {
                        this.y = (this.y-speed <= 0) ? 0:(this.y-speed);
                    }
                    else
                    {
                        gamecontain.y = (gamecontain.y+speed >= 83) ? 83:(gamecontain.y+speed);
                        this.y -= speed;
                    }
                }

                break;
            case DIRECTION.RIGHT:
                if(dirbool[DIRECTION.RIGHT])
                {
                    return;
                }
                this.$setScaleX(1);
                if(this.isAI)
                {
                    this.x = (this.x+speed >= 1720-this.width) ? 1720-this.width:(this.x+speed);
                }
                else
                {
                    if(gamecontain.x == -959)
                    {
                        this.x = (this.x+speed >= 1720-this.width) ? 1720-this.width:(this.x+speed);
                    }
                    else
                    {
                        gamecontain.x = (gamecontain.x-speed <= -959) ? -959:(gamecontain.x-speed);
                        this.x += speed;
                    }
                }

                break;
            case DIRECTION.DOWN:
                if(dirbool[DIRECTION.DOWN])
                {
                    return;
                }
                if(this.isAI)
                {
                    this.y = (this.y+speed >= (1500-this.height-74)) ? (1500-this.height-74):(this.y+speed);
                }
                else
                {
                    if(gamecontain.y == -83)
                    {
                        this.y = (this.y+speed >= (1500-this.height-74)) ? (1500-this.height-74):(this.y+speed);
                    }
                    else
                    {
                        gamecontain.y = (gamecontain.y-speed <= -83) ? -83:(gamecontain.y-speed);
                        this.y += speed;
                    }
                }

                break;
            case DIRECTION.LEFT:
                this.$setScaleX(-1);
                if(dirbool[DIRECTION.LEFT])
                {
                    return;
                }
                if(this.isAI)
                {
                    this.x = (this.x-speed <= (-980+this.width)) ? -980+this.width:(this.x-speed);
                }
                else
                {
                    if(gamecontain.x == 959)
                    {
                        this.x = (this.x-speed <= (-980+this.width)) ? -980+this.width:(this.x-speed);
                    }
                    else
                    {
                        gamecontain.x = (gamecontain.x+speed >= 959) ? 959:(gamecontain.x+speed);
                        this.x -= speed;
                    }
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
        //console.log('putbomb');
        var gamecontain: egret.DisplayObjectContainer = <egret.DisplayObjectContainer>this.parent;
        var bomb: BombSprite = new BombSprite(RES.getRes('shopselftool_'+GameData._i().PlayerToolType+'_png'),this.x,this.y);
        gamecontain.addChild(bomb);
        gamecontain.swapChildren(this,bomb);
    }

    public die()
    {
        console.log('die====');
        if(!this.isAI)
        {
            var gamecontain:GameScene = <GameScene>(<egret.DisplayObjectContainer>this.parent).parent;
            gamecontain.gameover();
        }
        else
        {
            var gamecontain:GameScene = <GameScene>(<egret.DisplayObjectContainer>this.parent).parent;
            egret.clearInterval(this.intage);
            (<egret.DisplayObjectContainer>this.parent).removeChild(this);
            var index = gamecontain.rolearr.indexOf(this);
            gamecontain.rolearr.splice(index,0);
        }
    }

    private getrect(obj:any): egret.Rectangle
    {
        var rect: egret.Rectangle = obj.getBounds();
        rect.x = obj.x - obj.width/2;
        rect.y = obj.y - obj.height/2;

        return rect;
    }

}