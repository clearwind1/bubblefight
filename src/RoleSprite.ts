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

    private gamecontain: GameScene;
    private parcontain: egret.DisplayObjectContainer;

    public isSuperstate: boolean = false;

    public constructor(textureName:string,totalNumber:number,frameRate:number,posx:number,posy:number,isai:boolean = true)
    {
        super(textureName,totalNumber,frameRate,posx,posy);
        this.isAI = isai;

        if(this.isAI)
        {
            this.aiIntag = egret.setInterval(this.aiRun,this,1000);
        }
    }

    public initgamecontain()
    {
        this.gamecontain = <GameScene>(this.parent.parent);
        this.parcontain = <egret.DisplayObjectContainer>this.parent;
    }

    public setSuperstate()
    {
        this.isSuperstate = true;

        var self:any = this;
        egret.Tween.get(this,{loop:false}).to({alpha:0},500).to({alpha:1},500).to({alpha:0},500).to({alpha:1},500).to({alpha:0},500).to({alpha:1},500).call(function(){
            self.isSuperstate = false;
        },self);
    }

    private aiRun()
    {
        //console.log('run');
        this.stopmove();

        if(GameData._i().GameOver)
        {
            return;
        }

        if(this.parent == null)
        {
            return;
        }

        var self: any = this;
        var movedir: number = Math.floor(Math.random()*100);
        if(movedir > 80)
        {
            var self: any = this;
            //console.log('thisisexit====',this);
            this.putbomb();
            this.stopmove();
            egret.clearInterval(this.aiIntag);
            egret.setTimeout(function(){
                self.aiIntag = egret.setInterval(self.aiRun,self,1000);
            },self,3000);
            movedir = movedir%4;
            this.startmove(movedir);
        }
        else
        {
            movedir = movedir%4;
            this.startmove(movedir);
        }

    }

    public startmove(dir:DIRECTION)
    {
        this.rolemovedir = dir;
        this.intage = egret.setInterval(this.moving,this,100);
        this.resume();
    }

    private moving()
    {
        var gamecontain: egret.DisplayObjectContainer = this.parcontain;
        if(gamecontain == null)
        {
            return;
        }
        var obscontain: egret.DisplayObjectContainer = this.gamecontain.obscontain;
        var toolcontain: egret.DisplayObjectContainer = this.gamecontain.toolcontain;

        for(var i:number=0;i < toolcontain.numChildren;i++)
        {
            var obs = toolcontain.getChildAt(i);
            var rect1 = this.getrect(obs);
            var rect2 = this.getrect(this);

            if(rect1.intersects(rect2)) {
                toolcontain.removeChild(obs);
                this.speed += 5;
            }
        }

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
                if(obs.y < this.y){
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
                    this.y = (this.y-speed <= 15) ? 15:(this.y-speed);
                }
                else
                {
                    if(gamecontain.y == 0)
                    {
                        this.y = (this.y-speed <= 15) ? 15:(this.y-speed);
                    }
                    else
                    {
                        gamecontain.y = (gamecontain.y+speed >= 0) ? 0:(gamecontain.y+speed);
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
                    this.x = (this.x+speed >= gamecontain.width-this.width-20) ? gamecontain.width-this.width-20:(this.x+speed);
                }
                else
                {
                    if(gamecontain.x == GameUtil.GameConfig._i().getWH()-gamecontain.width)
                    {
                        this.x = (this.x+speed >= gamecontain.width-this.width-20) ? gamecontain.width-this.width-20:(this.x+speed);
                    }
                    else
                    {
                        gamecontain.x = (gamecontain.x-speed <= GameUtil.GameConfig._i().getWH()-gamecontain.width) ? (GameUtil.GameConfig._i().getWH()-gamecontain.width):(gamecontain.x-speed);
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
                    this.y = (this.y+speed >= (gamecontain.height-this.height)) ? (gamecontain.height-this.height):(this.y+speed);
                }
                else
                {
                   // console.log('gamecontainy======',gamecontain.y,'widh=====',GameUtil.GameConfig._i().getSH(),'gamecontainheight=====',gamecontain.height);
                    if(gamecontain.y == GameUtil.GameConfig._i().getSH()-gamecontain.height)
                    {
                        this.y = (this.y+speed >= (gamecontain.height-this.height)) ? (gamecontain.height-this.height):(this.y+speed);
                    }
                    else
                    {
                        gamecontain.y = (gamecontain.y-speed <= GameUtil.GameConfig._i().getSH()-gamecontain.height) ? GameUtil.GameConfig._i().getSH()-gamecontain.height:(gamecontain.y-speed);
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
                    this.x = (this.x-speed <= (+this.width+20)) ? this.width+20:(this.x-speed);
                }
                else
                {
                    if(gamecontain.x == 0)
                    {
                        this.x = (this.x-speed <= this.width+20) ? this.width+20:(this.x-speed);
                    }
                    else
                    {
                        gamecontain.x = (gamecontain.x+speed >= 0) ? 0:(gamecontain.x+speed);
                        this.x -= speed;
                    }
                    //console.log('gamecontainx====',gamecontain.x,'gamecontainy======',gamecontain.y);
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

        GameData._i().gamesound[SoundName.putbombsound].play(0,1);

        //console.log('putbomb');
        var gamecontain: egret.DisplayObjectContainer = this.parcontain;
        var gamescene: GameScene = this.gamecontain;
        //console.log(gamescene);

        for(var i:number=0;i < gamescene.bombarr.length;i++)
        {
            var rebom = gamescene.bombarr[i];
            var rect1 = this.getrect(rebom);
            if(rect1.contains(this.x,this.y))
            {
                return;
            }
        }

        var bomb: BombSprite = new BombSprite(RES.getRes('shopselftool_'+GameData._i().PlayerToolType+'_png'),this.x,this.y,!this.isAI);
        gamescene.bombarr.push(bomb);
        gamecontain.addChild(bomb);
        bomb.initdata();
        gamecontain.swapChildren(this,bomb);
    }

    public die(isplayerb:boolean)
    {
        //console.log('die====');

        if(!this.isAI)
        {

            GameData._i().gamesound[SoundName.diesound].play(0,1);

            GameData._i().PlayerDied++;
            GameData._i().UserInfo['bekillcount']++;
            //console.log('playerdie=====',GameData._i().PlayerDied,'totaldie=====',GameData._i().UserInfo['bekillcount']);

            var gamecontain:GameScene = this.gamecontain;

            //console.log('rolearr====',gamecontain.rolearr);
            for(var i:number=0;i < gamecontain.rolearr.length;i++)
            {
                var role = gamecontain.rolearr[i];
                egret.clearInterval(role.aiIntag);
                role.stopmove();
            }
            //for(var i:number=0;i < gamecontain.bombarr.length;i++)
            //{
            //    var bom = gamecontain.bombarr[i];
            //    egret.clearTimeout(bom.titag);
            //    gamecontain.bombarr.splice(gamecontain.bombarr.indexOf(bom),1);
            //}
            //for(var i:number=0;i < gamecontain.bomeffectarr.length;i++)
            //{
            //    var bome = gamecontain.bomeffectarr[i];
            //    gamecontain.bomeffectarr.splice(gamecontain.bomeffectarr.indexOf(bome),1);
            //}

            gamecontain.gameover();
        }
        else
        {

            if(isplayerb)
            {
                GameData._i().PlayerKill++;
                GameData._i().UserInfo['killcount']++;
                GameData._i().UserInfo['jifen'] += 150;

               // console.log('playerkill=====',GameData._i().PlayerKill,'totalkill=====',GameData._i().UserInfo['killcount'],'积分=======',GameData._i().UserInfo['jifen']);
            }

            var gamecontain:GameScene = this.gamecontain;
            egret.clearInterval(this.aiIntag);
            this.stopmove();

            this.parcontain.removeChild(this);
            var index = gamecontain.rolearr.indexOf(this);

            gamecontain.rolearr.splice(index,1);
            gamecontain.createrole();
        }
    }

    private getrect(obj:any): egret.Rectangle
    {
        var sourcesc = obj.scaleY;
        var newsc = sourcesc-0.1;

        obj.scaleX = newsc;
        obj.scaleY = newsc;
        var rect: egret.Rectangle = obj.getBounds();
        rect.x = obj.x - obj.width/2;
        rect.y = obj.y - obj.height/2;

        obj.scaleX = sourcesc;
        obj.scaleY = sourcesc;

        return rect;
    }

    public reset()
    {
        if(this.isAI)
        {
            this.aiIntag = egret.setInterval(this.aiRun,this,1000);
        }
        else
        {
            this.setSuperstate();
        }
    }

}