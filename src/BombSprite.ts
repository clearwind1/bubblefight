/**
 * Created by pior on 16/11/28.
 */

class BombSprite extends GameUtil.MyBitmap
{
    private tw: any;
    private bombefl: GameUtil.MyBitmap;
    private bombefp: GameUtil.MyBitmap;
    public titag: number;

    private gamecontain: GameScene;
    private parcontain: egret.DisplayObjectContainer;

    public isbomed: boolean = false;
    public isplayerb: boolean = false;
    public bompower: number = 1;

    public constructor(texture:egret.Texture,posx:number,posy:number,isplayer:boolean)
    {
        super(texture,posx,posy);
        this.start();
        this.isplayerb = isplayer;
    }

    public initdata()
    {
        this.gamecontain = <GameScene>(this.parent.parent);
        this.parcontain = <egret.DisplayObjectContainer>this.parent;
    }

    private start()
    {
        var self: any = this;
        this.tw = egret.Tween.get(this,{loop:true}).to({scaleX:0.9,scaleY:0.9}).to({scaleX:1,scaleY:1},400);
        this.titag = egret.setTimeout(self.bomb,this,3000);
    }

    public bomb()
    {
        //console.log('bomb====',this.tw);
        //console.log('isbomed====',this.isbomed);

        //this.gamecontain.readybomarr.push(this);

        GameData._i().gamesound[SoundName.bombsound].play(0,1);

        egret.clearTimeout(this.titag);
        this.tw.loop = false;
        egret.Tween.removeTweens(this.tw);
        this.visible = false;
        this.parcontain.removeChild(this);
        var index = this.gamecontain.bombarr.indexOf(this);
        this.gamecontain.bombarr.splice(index,1);
        //this.name = 'rebomb';

        var gamecontain = this.parcontain;
        this.bombefl = new GameUtil.MyBitmap(RES.getRes('bombeffectl_png'),this.x,this.y);
        this.bombefl.$setScaleX(0);
        gamecontain.addChild(this.bombefl);
        this.gamecontain.bomeffectarr.push(this.bombefl);
        this.bombefp = new GameUtil.MyBitmap(RES.getRes('bombeffectp_png'),this.x,this.y);
        this.bombefp.$setScaleY(0);
        gamecontain.addChild(this.bombefp);
        this.gamecontain.bomeffectarr.push(this.bombefp);

        egret.Tween.get(this.bombefl).to({scaleX:this.bompower},200);
        egret.Tween.get(this.bombefp).to({scaleY:this.bompower},200).call(this.checkhit,this);

    }

    private checkhit()
    {

        var gamecontain:GameScene = this.gamecontain;
        this.isbomed = true;

        if(GameData._i().GameOver)
        {
            //console.log(gamecontain);

            if(this.parcontain == null)
            {
                return;
            }

            egret.clearTimeout(this.titag);
            this.tw.loop = false;
            egret.Tween.removeTweens(this.tw);
            this.parcontain.removeChild(this.bombefl);
            this.parcontain.removeChild(this.bombefp);
            var lindex = gamecontain.bomeffectarr.indexOf(this.bombefl);
            gamecontain.bomeffectarr.splice(lindex,1);
            var pindex = gamecontain.bomeffectarr.indexOf(this.bombefp);
            gamecontain.bomeffectarr.splice(pindex,1);
            return;
        }

        //console.log(gamecontain.bombarr);
        for(var i:number=0;i < gamecontain.bombarr.length;i++)
        {
            var bom: BombSprite = <BombSprite>(gamecontain.bombarr[i]);
            //console.log('bom====',bom);
            var rect1 = this.getrect(bom,1,1);
            var rect2 = this.getrect(this.bombefl,this.bombefl.scaleX,this.bombefl.scaleY);
           // console.log('bombefl=====',this.bombefl);
            var rect3 = this.getrect(this.bombefp,this.bombefp.scaleX,this.bombefp.scaleY);
            //console.log('this=====',this);
            if((rect1.intersects(rect2) || rect1.intersects(rect3))){
                //if(this.gamecontain.readybomarr.indexOf(bom) > 0){
                //    continue;
                //}
                bom.bomb();
            }
        }

        for(var i:number=0;i < gamecontain.rolearr.length;i++){
            var rect1 = this.getrect(gamecontain.rolearr[i],0.9,0.9);
            var rect2 = this.getrect(this.bombefl,this.bombefl.scaleX,this.bombefl.scaleY);
            var rect3 = this.getrect(this.bombefp,this.bombefp.scaleX,this.bombefp.scaleY);
            var role = gamecontain.rolearr[i];
            if(!role.isSuperstate && (rect1.intersects(rect2) || rect1.intersects(rect3))){
                gamecontain.rolearr[i].die(this.isplayerb);
            }
        }

        //if(this.bombefl.parent == null)
        //{
        //    return;
        //}

        //console.log('parcontain=====',this.bombefl);
        this.parcontain.removeChild(this.bombefl);
        this.parcontain.removeChild(this.bombefp);
        //this.parcontain.removeChild(this);
        var lindex = gamecontain.bomeffectarr.indexOf(this.bombefl);
        gamecontain.bomeffectarr.splice(lindex,1);
        var pindex = gamecontain.bomeffectarr.indexOf(this.bombefp);
        gamecontain.bomeffectarr.splice(pindex,1);
        //var index = gamecontain.bombarr.indexOf(this);
        //gamecontain.bombarr.splice(index,1);
        //var readybindex = gamecontain.readybomarr.indexOf(this);
        //gamecontain.readybomarr.splice(readybindex,1);

    }

    private getrect(obj:any,scx:number,scy:number): egret.Rectangle
    {
        var rect: egret.Rectangle = obj.getBounds();
        rect.x = obj.x - obj.width*scx/2;
        rect.y = obj.y - obj.height*scy/2;
        rect.width = obj.width*scx;
        rect.height = obj.height*scy;

        return rect;
    }

}