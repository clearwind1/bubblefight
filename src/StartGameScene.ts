/**
 * Created by pior on 16/9/9.
 */
class StartGameScene extends GameUtil.BassPanel
{
    private othercontain: egret.DisplayObjectContainer;
    private playcontain: egret.DisplayObjectContainer;

    private soundswitch: boolean[] = [true,true];

    private buyroleortoolID: number;

    private burolecount: number[] = [50,80,100,120,140,160];
    private butoolcount: number[] = [50,80,100,120,130,150];

    public constructor()
    {
        super();
    }

    public init()
    {
        this.showbg();
    }

    private showbg()
    {

        GameData._i().UserInfo['nickname'] = GameUtil.getQueryString('nickname');
        this.othercontain = null;
        this.playcontain = null;
        var bg: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('startgamebg_png'),0,0);
        bg.setanchorOff(0,0);
        this.addChild(bg);

        //界面按钮
        var btnname:string[] = ['startgamebtn_png','rankbtn_png','helpbtn_png','luckactbtn_png','personbtn_png','settingbtn_png','sharebtn_png','shopbtn_png'];
        var fun: Function[] = [this.startgame,this.gamerank,this.gamehelp,this.luckact,this.personinfo,this.setting,this.share,this.shop];
        var btnpox: number[] = [this.mStageW/2,this.mStageW/2,380,65,55,260,685,500];
        var btnpoy: number[] = [950,1100,1260,750,50,1260,50,1260];
        for(var i:number=0;i <8;i++)
        {
            var btn: GameUtil.Menu = new GameUtil.Menu(this,btnname[i],btnname[i],fun[i]);
            btn.setScaleMode();
            btn.x = btnpox[i];
            btn.y = btnpoy[i];
            this.addChild(btn);
        }

       // console.log('shareopenid=====',GameUtil.getQueryString('shareopenid'));
        if(GameUtil.getQueryString('shareopenid'))
        {
            console.log('shareopen enter');
            //alert('shareopenid====='+GameUtil.getQueryString('shareopenid'));
            this.getsharebubble();
        }
        else
        {
            //alert('shareopen');
            SharePage._i().getSignPackage();
            SharePage._i().setNewUrl('http://bubblefight.h5.gamexun.com/?shareopenid='+GameData._i().UserInfo['openid']);
        }

        if(GameData._i().UserInfo['prizecount'] != 0)
        {
            this.luckact();
        }

    }

    private getsharebubble()
    {
        var param:Object = {
            shareopenid: GameUtil.getQueryString('shareopenid'),
            clickopenid: GameData._i().UserInfo['openid']
        }
        GameUtil.Http.getinstance().send(param, "/paopao/updatesharedata", this.setshareresult, this);
    }
    private setshareresult(data:any)
    {
        if(data['code']==1)
        {
            SharePage._i().getSignPackage();
            SharePage._i().setNewUrl('http://bubblefight.h5.gamexun.com/?shareopenid='+GameData._i().UserInfo['openid']);
        }
        else
        {
            console.log(data['msg']);
        }
    }

    //开始游戏
    private startgame()
    {
        console.log('start');
        var sound: egret.Sound = RES.getRes('startsound_ogg');
        sound.play(0,1);
        GameUtil.GameScene.runscene(new GameScene());
    }
    //排行榜
    private gamerank()
    {
        console.log('rank');
        var param:Object = {
        }
        GameUtil.Http.getinstance().send(param, "/paopao/getrank", this.getRank, this);
    }
    private getRank(rankdata:any)
    {
        if(rankdata['code']==1)
        {
            var result = rankdata['result'];
            console.log('rankdata====',result);
            this.createContain();

            var rankbg: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('rankbg_png'),this.mStageW/2,this.mStageH/2);
            this.othercontain.addChild(rankbg);
            var ranktext: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('ranktext_png'),this.mStageW/2,515);
            this.othercontain.addChild(ranktext);

            //var playnametext: string[] = ['泡泡小王子','fdsafdsa','qwerewq','jklll','iolkjik'];
            //var playscorenum: number[] = [10,20,30,40,560];
            //var playkillnum: number[] = [1,23,33,15,88];
            for(var i: number=0;i < result.length;i++)
            {
                var menushape: egret.Shape = GameUtil.createRect(141,576+i*51,469,38,0);
                var showinfobtn: GameUtil.Menu = new GameUtil.Menu(this,null,null,this.showotherinfo,[result[i]['openid']],menushape);
                this.othercontain.addChild(showinfobtn);

                var rcir: egret.Shape = GameUtil.createCircle(160,600+i*52,12,1,0xb2a33c);
                this.othercontain.addChild(rcir);
                var cir: egret.Shape = GameUtil.createCircle(160,600+i*52,11,1,0xf9e872);
                this.othercontain.addChild(cir);
                var rankid: GameUtil.MyTextField = new GameUtil.MyTextField(155,600+i*52,20,0);
                rankid.$setStroke(2);
                rankid.$setStrokeColor(0xfdfd4f);
                rankid.setText(''+(i+1));
                rankid.textColor = 0xffc65e;
                this.othercontain.addChild(rankid);

                var playname: GameUtil.MyTextField = new GameUtil.MyTextField(180,600+i*52,25,0);
                playname.setText(result[i]['nickname']);
                //playname.$setStroke(2);
                //playname.$setStrokeColor(0xffffff);
                playname.textColor = 0xffffff;
                this.othercontain.addChild(playname);

                var playscore: GameUtil.MyTextField = new GameUtil.MyTextField(333,600+i*52,25,0);
                playscore.setText('积分:  '+result[i]['jifen']);
                //playscore.$setStroke(2);
                //playscore.$setStrokeColor(0xffffff);
                playscore.textColor = 0xffffff;
                this.othercontain.addChild(playscore);

                var playkill: GameUtil.MyTextField = new GameUtil.MyTextField(470,600+i*52,25,0);
                playkill.setText('杀敌:  '+result[i]['killcount']);
                //playkill.$setStroke(2);
                //playkill.$setStrokeColor(0xfdfd4f);
                playkill.textColor = 0xffffff;
                this.othercontain.addChild(playkill);
            }

            var close: GameUtil.Menu = new GameUtil.Menu(this,'closebtn_png','closebtn_png',this.closecontain);
            close.x = 653;
            close.y = 482;
            this.othercontain.addChild(close);
        }
        else
        {
            console.log(rankdata['msg']);
        }
    }


    //活动
    private gameaction()
    {
        console.log('gameaction');
    }
    //帮助
    private helpbgbtn: GameUtil.MyBitmap;
    private helpselect: GameUtil.MyBitmap;
    private helpcurtag: number;
    private gamehelp()
    {
        console.log('gamehelp');
        this.createContain();

        this.helpcurtag = 0;

        //this.helpbgbtn = new GameUtil.Menu(this,'helpbg_0_png','helpbg_0_png',function()
        //{
        //    this.helpcurtag = (++this.helpcurtag > 2) ? 0:this.helpcurtag;
        //    //console.log('helpcurtag=====',this.helpcurtag);
        //    this.helpbgbtn.setButtonTexture('helpbg_'+this.helpcurtag+'_png','helpbg_'+this.helpcurtag+'_png');
        //    this.helpselect.x = 445+55*this.helpcurtag;
        //});
        //this.helpbgbtn.x = this.mStageW/2;
        //this.helpbgbtn.y = 694;

        var self: any = this;
        this.helpbgbtn = new GameUtil.MyBitmap(RES.getRes('helpbg_0_png'),this.mStageW/2,694);
        this.helpbgbtn.touchEnabled = true;
        var startx: number = 0;
        this.helpbgbtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(evt:egret.TouchEvent){
            startx = evt.stageX;
            //console.log('startx=====',startx);
        },this);
        this.helpbgbtn.addEventListener(egret.TouchEvent.TOUCH_END,function(evt:egret.TouchEvent){
            var endx: number = evt.stageX;
            if(endx - startx >= 100){
                self.helpcurtag = (++self.helpcurtag > 2) ? 0:self.helpcurtag;
                //console.log('helpcurtag=====',this.helpcurtag);

            }
            else if(startx - endx > 100){
                self.helpcurtag = (--self.helpcurtag < 0) ? 2:self.helpcurtag;
            }
            self.helpbgbtn.setNewTexture(RES.getRes('helpbg_'+this.helpcurtag+'_png'));
            self.helpselect.x = 367+55*self.helpcurtag;
        },this);
        this.othercontain.addChild(this.helpbgbtn);

        for(var i:number=0;i < 3;i++)
        {
            var helppagepoint: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('helppagepoint_png'),367+55*i,800);
            this.othercontain.addChild(helppagepoint);
        }

        this.helpselect = new GameUtil.MyBitmap(RES.getRes('helpselect_png'),367,800);
        this.othercontain.addChild(this.helpselect);

        var close: GameUtil.Menu = new GameUtil.Menu(this,'helpclose_png','helpclose_png',this.closecontain);
        close.x = 640;
        close.y = 566;
        this.othercontain.addChild(close);
    }
    //幸运转盘
    private luckpoint: GameUtil.Menu;
    private freecountT: GameUtil.MyTextField;
    private luckact()
    {
        console.log('luckact');
        this.createContain();

        this.freecountT = new GameUtil.MyTextField(this.mStageW/2,320,40,0.5,0.5);
        this.freecountT.setText('免费抽奖次数:'+GameData._i().UserInfo['prizecount']+'/3');
        this.freecountT.textColor = 0xf64b44;
        this.othercontain.addChild(this.freecountT);
        var luckpan: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('luckpan_png'),this.mStageW/2,this.mStageH/2);
        this.othercontain.addChild(luckpan);
        this.luckpoint = new GameUtil.Menu(this,'luckpoint_png','luckpoint_png',this.runluckpoint);
        this.luckpoint.$setAnchorOffsetY(25);
        this.luckpoint.x = this.mStageW/2+6;
        this.luckpoint.y = 665;
        this.othercontain.addChild(this.luckpoint);

        if(GameData._i().UserInfo['prizecount'] == 0)
        {
            GameUtil.changeGray(this.luckpoint);
            this.luckpoint.$setTouchEnabled(false);
        }

        var close: GameUtil.Menu = new GameUtil.Menu(this,'closebtn_png','closebtn_png',this.closecontain);
        close.x = 570;
        close.y = 250;
        this.othercontain.addChild(close);

    }
    //个人信息
    private personinfo()
    {
        console.log('personinfo');
        this.createContain();

        var infobg:GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('personinfobg_png'),this.mStageW/2,this.mStageH/2);
        this.othercontain.addChild(infobg);

        var infobtn: GameUtil.Menu = new GameUtil.Menu(this,'personinfobtn_png','personinfobtn_png',this.playinfo);
        infobtn.setScaleMode();
        infobtn.x = 186;
        infobtn.y = 531;
        this.othercontain.addChild(infobtn);

        var bagbtn: GameUtil.Menu = new GameUtil.Menu(this,'bagbtn_png','bagbtn_png',this.playbag);
        bagbtn.setScaleMode();
        bagbtn.x = 386;
        bagbtn.y = 531;
        this.othercontain.addChild(bagbtn);

        this.playcontain = new egret.DisplayObjectContainer();
        this.othercontain.addChild(this.playcontain);

        this.playinfo();


        var close: GameUtil.Menu = new GameUtil.Menu(this,'closebtn_png','closebtn_png',this.closecontain);
        close.x = 653;
        close.y = 482;
        this.othercontain.addChild(close);

    }
    //设置
    private switchbtn: GameUtil.Menu[];
    private setting()
    {
        console.log('setting');
        this.switchbtn = [];
        this.createContain();

        var setttingbg: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('settingbg_png'),this.mStageW/2,618);
        this.othercontain.addChild(setttingbg);

        for(var i:number=0;i < 2;i++)
        {
            var switchonoff: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('settingswitch_png'),524,567+i*108);
            this.othercontain.addChild(switchonoff);
            this.switchbtn[i] = new GameUtil.Menu(this,'settingswitchon_png','settingswitchon_png',this.settingswitch,[i,switchonoff]);
            this.switchbtn[i].x = 488;
            this.switchbtn[i].y = 566+i*108;
            this.othercontain.addChild(this.switchbtn[i]);
            this.othercontain.swapChildren(switchonoff,this.switchbtn[i]);
        }

        var close: GameUtil.Menu = new GameUtil.Menu(this,'closebtn_png','closebtn_png',this.closecontain);
        close.x = 606;
        close.y = 472;
        this.othercontain.addChild(close);
    }
    //分享
    private share()
    {
        console.log('share');
        this.createContain();

        var sharebg: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('sharebg_png'),this.mStageW/2,this.mStageH/2);
        this.othercontain.addChild(sharebg);

        var url = 'http://bubblefight.h5.gamexun.com/?shareopenid='+GameData._i().UserInfo['openid'];
        var sp: egret.Sprite = qr.QRCode.create(url,0,180,180);
        sp.x = 135;
        sp.y = 594;
        this.othercontain.addChild(sp);

        var sharebtn: GameUtil.Menu = new GameUtil.Menu(this,'sharecordbtn_png','sharecordbtn_png',this.sharegame);
        sharebtn.setScaleMode();
        sharebtn.x = 230;
        sharebtn.y = 818;
        this.othercontain.addChild(sharebtn);

        var close: GameUtil.Menu = new GameUtil.Menu(this,'closebtn_png','closebtn_png',this.closecontain);
        close.x = 653;
        close.y = 482;
        this.othercontain.addChild(close);

    }
    //商店
    private shopbagcontain: egret.DisplayObjectContainer;
    private shop()
    {
        console.log('shop');
        var param:Object = {
            openid:GameData._i().UserInfo['openid']
        }
        GameUtil.Http.getinstance().send(param, "/paopao/getmypack", this.getshop, this);
    }
    private getshop(getshopdata:any)
    {
        if(getshopdata['code'] == 1)
        {
            var result = getshopdata['result'];
            for(var i:number=0;i < result.length;i++){
                if(result[i]['propstype'] == 1) //角色
                {
                    console.log(GameData._i().PlayerHadrole.indexOf(parseInt(result[i]['propsname'])));
                    if(GameData._i().PlayerHadrole.indexOf(parseInt(result[i]['propsname'])) < 0)
                        GameData._i().PlayerHadrole.push(parseInt(result[i]['propsname']));
                }else
                {
                    if(GameData._i().PlayerHadtool.indexOf(parseInt(result[i]['propsname'])) < 0)
                        GameData._i().PlayerHadtool.push(parseInt(result[i]['propsname']));
                }
            }

            this.createContain();

            var shopbg: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('shopbg_png'),this.mStageW/2,708);
            this.othercontain.addChild(shopbg);

            this.shopbagcontain = new egret.DisplayObjectContainer();
            this.othercontain.addChild(this.shopbagcontain);

            var rolebtn: GameUtil.Menu = new GameUtil.Menu(this,'rolebtn_png','rolebtn_png',this.showshopbagrole);
            rolebtn.x = 197;
            rolebtn.y = 441;
            rolebtn.setScaleMode();
            this.othercontain.addChild(rolebtn);

            var toolbtn: GameUtil.Menu = new GameUtil.Menu(this,'toolbtn_png','toolbtn_png',this.showshopbagtool);
            toolbtn.x = 368;
            toolbtn.y = 441;
            toolbtn.setScaleMode();
            this.othercontain.addChild(toolbtn);

            this.showshopbagrole();

            var close: GameUtil.Menu = new GameUtil.Menu(this,'closebtn_png','closebtn_png',this.closecontain);
            close.x = 664;
            close.y = 410;
            this.othercontain.addChild(close);
        }
        else
        {
            console.log(getshopdata['msg']);
        }
    }

    //创建一个新的通用容器
    private createContain()
    {
        this.othercontain = new egret.DisplayObjectContainer();
        this.addChild(this.othercontain);
        this.othercontain.touchEnabled = true;

        var shap:egret.Shape = GameUtil.createRect(0,0,this.mStageW,this.mStageH,0.6);
        this.othercontain.addChild(shap);
    }

    //关闭其他容器
    private closecontain()
    {
        egret.Tween.removeAllTweens();
        this.removeChild(this.othercontain);
        this.othercontain = null;
    }

    //转盘转动
    private activerunluck: boolean = true;
    private runluckpoint()
    {
        if(!this.activerunluck)
            return;

        this.activerunluck = false;
        var self: any = this;
        if(this.othercontain.getChildByName('lucktiptext'))
            this.othercontain.removeChild(this.othercontain.getChildByName('lucktiptext'));

        var getrota: number = RandomUtils.randomArray([2,5,8]);
        var prizerota: number = this.getrotatag(getrota) + 720;
        //console.log(this.getrotatag(getrota));

       // prizerota = 333 + 360;

        var timer: number = prizerota;

        egret.Tween.get(this.luckpoint).to({rotation:prizerota},timer,egret.Ease.sineInOut).call(self.sendluckresult,this,[getrota]);
    }
    private getbubblecount:number = 0;
    private sendluckresult(rota)
    {
        console.log('rota=====',rota);
        var gettag = rota;
        var prizecount: number[] = [100,30,1,10,100,5,50,20,2,50];
        var prizetext: string[] = ['100泡泡','30元话费','1泡泡','10泡泡','100元话费','5泡泡','50泡泡','20泡泡','2泡泡','50元话费'];
        this.getbubblecount = prizecount[gettag];

        var param:Object = {
            openid:GameData._i().UserInfo['openid'],
            prizename: prizetext[gettag],
            paopaocount:prizecount[gettag]
        }
        GameUtil.Http.getinstance().send(param, "/paopao/addprize", this.addprizeresult, this);

    }
    private addprizeresult(data:any)
    {

        this.activerunluck = true;

        if(data['code']==1){
            var tiptext: GameUtil.MyTextField = new GameUtil.MyTextField(this.mStageW/2,1080,50);
            tiptext.name = 'lucktiptext';
            tiptext.setText('恭喜您，获得了'+this.getbubblecount+'个泡泡');
            tiptext.textColor = 0xf64b44;
            this.othercontain.addChild(tiptext);

            GameData._i().UserInfo['prizecount'] -= 1;
            this.freecountT.setText('免费抽奖次数:'+GameData._i().UserInfo['prizecount']+'/3');
            if(GameData._i().UserInfo['prizecount'] == 0)
            {
                GameUtil.changeGray(this.luckpoint);
                this.luckpoint.$setTouchEnabled(false);
            }

        }
        else
        {
            console.log(data['msg']);
            var tiptext: GameUtil.MyTextField = new GameUtil.MyTextField(this.mStageW/2,1080,50);
            tiptext.name = 'lucktiptext';
            tiptext.setText(data['msg']);
            tiptext.textColor = 0xf64b44;
            this.othercontain.addChild(tiptext);
        }
    }

    //玩家信息
    private playinfo()
    {
        //console.log('GameData._i().PlayerRoleType====',GameData._i().PlayerRoleType);
        this.playcontain.removeChildren();
        var playimg: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('roletype_'+GameData._i().PlayerRoleType+'_png'),185,683);
        this.playcontain.addChild(playimg);

        var txtst: string[] = ['ID:','名字:','泡泡:','总积分:','总击杀:','被杀:'];
        var getplaytext: string[] = [''+GameData._i().UserInfo['ID'],GameData._i().UserInfo['nickname'],''+GameData._i().PlayerBubbleNumber,''+GameData._i().UserInfo['jifen'],''+GameData._i().UserInfo['killcount'],''+GameData._i().UserInfo['bekillcount']];
        for(var i:number=0;i <6;i++){
            var infotext:GameUtil.MyTextField = new GameUtil.MyTextField(340,600+35*i,30,0);
            infotext.setText(txtst[i]);
            infotext.textColor = 0x877fc8;
            this.playcontain.addChild(infotext);

            var infott: GameUtil.MyTextField = new GameUtil.MyTextField(450,600+35*i,30,0);
            infott.setText(getplaytext[i]);
            infott.textColor = 0x877fc8;
            this.playcontain.addChild(infott);
        }

    }
    //玩家背包
    private bagcontain: egret.DisplayObjectContainer;
    private playbag()
    {
        var param:Object = {
            openid:GameData._i().UserInfo['openid']
        }
        GameUtil.Http.getinstance().send(param, "/paopao/getmypack", this.getplayerbag, this);
    }
    private getplayerbag(bagdata:any)
    {
        if(bagdata['code'] == 1)
        {
            var result = bagdata['result'];
            this.playcontain.removeChildren();
            this.bagcontain = new egret.DisplayObjectContainer();
            this.playcontain.addChild(this.bagcontain);
            for(var i:number=0;i < result.length;i++){
                if(result[i]['propstype'] == 1) //角色
                {
                    if(GameData._i().PlayerHadrole.indexOf(parseInt(result[i]['propsname'])) < 0)
                        GameData._i().PlayerHadrole.push(parseInt(result[i]['propsname']));
                }else
                {
                    if(GameData._i().PlayerHadtool.indexOf(parseInt(result[i]['propsname'])) < 0)
                        GameData._i().PlayerHadtool.push(parseInt(result[i]['propsname']));
                }
            }

            var rolebtn: GameUtil.Menu = new GameUtil.Menu(this,'rolebtn_png','rolebtn_png',this.showrole);
            rolebtn.x = 192;
            rolebtn.y = 640;
            rolebtn.setScaleMode();
            this.playcontain.addChild(rolebtn);

            var toolbtn: GameUtil.Menu = new GameUtil.Menu(this,'toolbtn_png','toolbtn_png',this.showtool);
            toolbtn.x = 192;
            toolbtn.y = 746;
            toolbtn.setScaleMode();
            this.playcontain.addChild(toolbtn);

            this.showrole();
        }
        else
        {
            console.log(bagdata['msg']);
        }
    }
    //显示角色
    private showrole()
    {
        this.bagcontain.removeChildren();
        for(var i:number = 0;i < GameData._i().PlayerHadrole.length;i++)
        {
            var rolename: string = 'hadroletype_'+GameData._i().PlayerHadrole[i]+'_png';
            //var role: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes(rolename),370+105*(i%3),635+110*Math.floor(i/3));
            var role: GameUtil.Menu = new GameUtil.Menu(this,rolename,rolename,this.showrolemenu,[GameData._i().PlayerHadrole[i],i]);
            role.x = 370+105*(i%3);
            role.y = 635+110*Math.floor(i/3);
            this.bagcontain.addChild(role);
        }
    }
    //显示道具
    private showtool()
    {
        this.bagcontain.removeChildren();
        for(var i:number=0;i < GameData._i().PlayerHadtool.length;i++)
        {
            var toolname: string = 'shopselftool_'+GameData._i().PlayerHadtool[i]+'_png';
           // var tool: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes(toolname),367+106*(i%3),636+110*Math.floor(i/3));
            var tool: GameUtil.Menu = new GameUtil.Menu(this,toolname,toolname,this.showtoolmenu,[GameData._i().PlayerHadtool[i],i]);
            tool.x = 367+106*(i%3);
            tool.y = 636+110*Math.floor(i/3);
            tool.$setScaleX(0.8);
            tool.$setScaleY(0.8);
            this.bagcontain.addChild(tool);
        }
    }

    //分享提示
    private sharegame()
    {
        var discont: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        this.addChild(discont);

        var self: any = this;
        var discover: egret.Shape = GameUtil.createRect(0,0,this.mStageW,this.mStageH,0.6);
        discont.addChild(discover);
        discover.touchEnabled = true;
        discover.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
            self.removeChild(discont);
        },this);

        var sharetip: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('sharetip_png'),this.mStageW,0);
        sharetip.setanchorOff(1,0);
        discont.addChild(sharetip);
        /*
        if(this.havename)
        {
            SharePage._i().setdesctext('我的成绩入选名人堂第'+this.myrank+'，敢应战不？');
        }
        else
        {
            var totalsec = Math.floor(TimePanel._i().curtime/1000);
            var min = (Math.floor(totalsec/60)>9)?Math.floor(totalsec/60):('0'+Math.floor(totalsec/60));
            var sec = (totalsec%60)>9?totalsec%60:('0'+totalsec%60);
            SharePage._i().setdesctext('我可以连续跑步'+min+':'+sec+'不休息，你来试试');
        }
         shareopenid
        */

    }

    //商店显示角色
    private showshopbagrole()
    {
        this.shopbagcontain.removeChildren();
        var roletext: string[] = ['皮皮:50泡泡','妞妞:80泡泡','琪琪:100泡泡','明明:120泡泡','聪聪:140泡泡','跳跳:160泡泡'];
        for(var i:number=0;i < 6;i++)
        {
            var rolename: string = 'shopself_'+i+'_png';
            var rolebtn: GameUtil.Menu = new GameUtil.Menu(this,rolename,rolename,this.buyrole,[i]);
            rolebtn.x = 193+(i%3)*173;
            rolebtn.y = 578+Math.floor(i/3)*254;
            this.shopbagcontain.addChild(rolebtn);

            var roletiptext: GameUtil.MyTextField = new GameUtil.MyTextField(rolebtn.x,700+Math.floor(i/3)*254,25);
            roletiptext.width = 113;
            roletiptext.textAlign = egret.HorizontalAlign.CENTER;
            roletiptext.setText(roletext[i]);
            roletiptext.textColor = 0xffffff;
            this.shopbagcontain.addChild(roletiptext);
            for(var j:number=0;j < GameData._i().PlayerHadrole.length;j++)
            {
                if(i==GameData._i().PlayerHadrole[j])
                {
                    roletiptext.setText('已拥有');
                    roletiptext.textColor = 0x1a95a5;
                    rolebtn.touchEnabled = false;
                    break;
                }
            }
        }
    }
    //商店显示道具
    private showshopbagtool()
    {
        this.shopbagcontain.removeChildren();
        var tooltext: string[] = ['蓝色泡泡:50泡泡','黄色泡泡:80泡泡','红包泡泡:100泡泡','紫色泡泡:120泡泡','彩色泡泡:130泡泡','骷髅泡泡:150泡泡'];
        for(var i:number=0;i < 6;i++)
        {
            var toolname: string = 'shopselftool_'+i+'_png';
            var toolbtn: GameUtil.Menu = new GameUtil.Menu(this,toolname,toolname,this.buytool,[i]);
            toolbtn.x = 195+(i%3)*175;
            toolbtn.y = 578+Math.floor(i/3)*254;
            this.shopbagcontain.addChild(toolbtn);

            var tooltiptext: GameUtil.MyTextField = new GameUtil.MyTextField(toolbtn.x,700+Math.floor(i/3)*254,25);
            tooltiptext.width = 113;
            tooltiptext.textAlign = egret.HorizontalAlign.CENTER;
            tooltiptext.setText(tooltext[i]);
            tooltiptext.textColor = 0xffffff;
            this.shopbagcontain.addChild(tooltiptext);
            for(var j:number=0;j < GameData._i().PlayerHadtool.length;j++)
            {
                if(i==GameData._i().PlayerHadtool[j])
                {
                    tooltiptext.setText('已拥有');
                    tooltiptext.textColor = 0x1a95a5;
                    toolbtn.touchEnabled = false;
                    break;
                }
            }
        }
    }

    private buyrole(roleid:number){
        console.log('roleid======',roleid);
        var tipcontain: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        tipcontain.name = 'tipcontain';
        this.othercontain.addChild(tipcontain);
        tipcontain.touchEnabled = true;
        var shap: egret.Shape = GameUtil.createRect(0,0,this.mStageW,this.mStageH,0.4);
        tipcontain.addChild(shap);

        var tipbg: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('shoptip_png'),this.mStageW/2,855);
        tipcontain.addChild(tipbg);

        var roleimgtex: string = 'shopself_'+roleid+'_png';
        var roleimg: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes(roleimgtex),this.mStageW/2,785);
        tipcontain.addChild(roleimg);

        var rolename: string[] = ['皮皮','妞妞','琪琪','明明','聪聪','跳跳'];
        var bucount: number[] = this.burolecount;

        var tiptextT: GameUtil.MyTextField = new GameUtil.MyTextField(this.mStageW/2,905,30);
        tiptextT.textAlign = egret.HorizontalAlign.CENTER;
        tiptextT.width = 355;
        tiptextT.setText('是否消耗'+bucount[roleid]+'泡泡领取'+rolename[roleid]);
        tiptextT.textColor = 0x7a6980;
        tipcontain.addChild(tiptextT);

        var getrolebtn: GameUtil.Menu = new GameUtil.Menu(this,'buybtn_png','buybtn_png',this.getrole,[roleid]);
        getrolebtn.x = this.mStageW/2;
        getrolebtn.y = 977;
        getrolebtn.setScaleMode();
        tipcontain.addChild(getrolebtn);

       var colsebtn: GameUtil.Menu = new GameUtil.Menu(this,'closebtn_png','closebtn_png',function(){
           tipcontain.parent.removeChild(tipcontain);
       });
        colsebtn.x = 572;
        colsebtn.y = 717;
        tipcontain.addChild(colsebtn);

    }
    private buytool(toolid:number){
        console.log('toolid=====',toolid);
        var tipcontain: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        tipcontain.name = 'tipcontain';
        this.othercontain.addChild(tipcontain);
        tipcontain.touchEnabled = true;
        var shap: egret.Shape = GameUtil.createRect(0,0,this.mStageW,this.mStageH,0.4);
        tipcontain.addChild(shap);

        var tipbg: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('shoptip_png'),this.mStageW/2,855);
        tipcontain.addChild(tipbg);

        var roleimgtex: string = 'shopselftool_'+toolid+'_png';
        var roleimg: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes(roleimgtex),this.mStageW/2,785);
        tipcontain.addChild(roleimg);

        var rolename: string[] = ['蓝色泡泡','黄色泡泡','红包泡泡','紫色泡泡','彩色泡泡','骷髅泡泡'];
        var bucount: number[] = this.butoolcount;

        var tiptextT: GameUtil.MyTextField = new GameUtil.MyTextField(this.mStageW/2,905,30);
        tiptextT.textAlign = egret.HorizontalAlign.CENTER;
        tiptextT.width = 355;
        tiptextT.setText('是否消耗'+bucount[toolid]+'泡泡领取'+rolename[toolid]);
        tiptextT.textColor = 0x7a6980;
        tipcontain.addChild(tiptextT);

        var getrolebtn: GameUtil.Menu = new GameUtil.Menu(this,'buybtn_png','buybtn_png',this.gettool,[toolid]);
        getrolebtn.x = this.mStageW/2;
        getrolebtn.y = 977;
        getrolebtn.setScaleMode();
        tipcontain.addChild(getrolebtn);

        var colsebtn: GameUtil.Menu = new GameUtil.Menu(this,'closebtn_png','closebtn_png',function(){
            tipcontain.parent.removeChild(tipcontain);
        });
        colsebtn.x = 572;
        colsebtn.y = 717;
        tipcontain.addChild(colsebtn);
    }

    private getrole(roleid:number)
    {
        var bucount: number[] = this.burolecount;
        if(GameData._i().PlayerBubbleNumber < bucount[roleid]){
            this.addChild(new GameUtil.TipsPanel(null,'泡泡数不够',true));
        }
        else{
            console.log('买买买角色=====',roleid);
            this.buyroleortoolID = roleid;
            var param:Object = {
                openid:GameData._i().UserInfo['openid'],
                propstype:1,
                propsname:''+roleid,
                paopaocount:bucount[roleid]
            }
            GameUtil.Http.getinstance().send(param, "/paopao/buyprops", this.getrolesuccess, this);
        }
    }
    private getrolesuccess(getroledata:any)
    {
        if(getroledata['code']==1)
        {
            var bucount: number[] = this.burolecount;
            GameData._i().PlayerHadrole.push(this.buyroleortoolID);
            GameData._i().PlayerBubbleNumber -= bucount[this.buyroleortoolID];
            this.othercontain.removeChild(this.othercontain.getChildByName('tipcontain'));
            this.showshopbagrole();
        }else
        {
            console.log(getroledata['msg']);
        }
    }
    private gettool(toolid:number)
    {
        var bucount: number[] = this.butoolcount;
        if(GameData._i().PlayerBubbleNumber < bucount[toolid]){
            this.addChild(new GameUtil.TipsPanel(null,'泡泡数不够',true));
        }
        else{
            console.log('买买买道具');
            this.buyroleortoolID = toolid;
            var param:Object = {
                openid:GameData._i().UserInfo['openid'],
                propstype:1,
                propsname:''+toolid,
                paopaocount:bucount[toolid]
            }
            GameUtil.Http.getinstance().send(param, "/paopao/buyprops", this.gettoolsuccess, this);
        }
    }
    private gettoolsuccess(gettooldata:any)
    {
        if(gettooldata['code']==1)
        {
            var bucount: number[] = this.butoolcount;
            GameData._i().PlayerHadtool.push(this.buyroleortoolID);
            GameData._i().PlayerBubbleNumber -= bucount[this.buyroleortoolID];
            this.othercontain.removeChild(this.othercontain.getChildByName('tipcontain'));
            this.showshopbagtool();
        }else
        {
            console.log(gettooldata['msg']);
        }
    }

    //设置开关
    private settingswitch(type:number,swilog:any)
    {
        this.soundswitch[type] = !this.soundswitch[type];
        swilog.x = this.soundswitch[type] ? 524:452;
        var tex: string = this.soundswitch[type] ? 'settingswitchon_png':'settingswitchoff_png';
        this.switchbtn[type].setButtonTexture(tex,tex);
    }

    //排行榜显示其他玩家信息
    private showotherinfo(id:any)
    {
        console.log('id====',id);
        var param:Object = {
            openid:id
        }
        GameUtil.Http.getinstance().send(param, "/paopao/getuserinfo", this.getotherinfo, this);

    }
    private getotherinfo(otherinfodata:any)
    {
        if(otherinfodata['code']== 1)
        {
            var result = otherinfodata['result'];
            var discont: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
            this.othercontain.addChild(discont);

            var self: any = this;
            var discover: egret.Shape = GameUtil.createRect(0,0,this.mStageW,this.mStageH,0.6);
            discont.addChild(discover);
            discover.touchEnabled = true;
            discover.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                discont.parent.removeChild(discont);
            },this);

            var bg: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('showinfobg_png'),this.mStageW/2,this.mStageH/2);
            discont.addChild(bg);

            var infoleft: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('showinforight_png'),196,this.mStageH/2);
            discont.addChild(infoleft);
            var inforight: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('showinfoleft_png'),479,this.mStageH/2);
            discont.addChild(inforight);

            var playimg: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('roletype_'+GameData._i().PlayerRoleType+'_png'),185,this.mStageH/2);
            discont.addChild(playimg);

            var txtst: string[] = ['ID:','名字:','泡泡:','总积分:','总击杀:','被杀:'];
            var getplaytext: string[] = [''+result['openid'],result['nickname'],''+result['paopaocount'],''+result['jifen'],''+result['killcount'],''+result['bekillcount']];
            for(var i:number=0;i <6;i++){
                var infotext:GameUtil.MyTextField = new GameUtil.MyTextField(340,580+35*i,30,0);
                infotext.setText(txtst[i]);
                infotext.textColor = 0x877fc8;
                discont.addChild(infotext);

                var infott: GameUtil.MyTextField = new GameUtil.MyTextField(450,580+35*i,30,0);
                infott.setText(getplaytext[i]);
                infott.textColor = 0x877fc8;
                discont.addChild(infott);
            }
        }
        else
        {
            console.log(otherinfodata['msg']);
        }
    }

    //显示是否使用角色菜单
    private showrolemenu(roletype:any,id:number)
    {
        //console.log('showrolemenuroletype======',roletype);
        if(GameData._i().PlayerRoleType == roletype){
            return;
        }
        else{
            var discont: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
            this.othercontain.addChild(discont);

            var self: any = this;
            var discover: egret.Shape = GameUtil.createRect(0,0,this.mStageW,this.mStageH,0.6);
            discont.addChild(discover);
            discover.touchEnabled = true;
            discover.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                discont.parent.removeChild(discont);
            },this);

            var rolex = 370+105*(id%3);
            var roley = 635+110*Math.floor(id/3);
            var usebtn: GameUtil.Menu = new GameUtil.Menu(this,null,null,this.usenewrole,[roletype,discont],GameUtil.createRect(rolex,roley,100,50,1,0xffffff));
            usebtn.addButtonText('使用',40,rolex+50,roley+25);
            discont.addChild(usebtn);

        }

    }
    //显示是否使用道具菜单
    private showtoolmenu(tooltype:any,id:number)
    {
        //console.log('tooltype=====',tooltype);
        if(GameData._i().PlayerToolType == tooltype){
            return;
        }
        else{
            var discont: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
            this.othercontain.addChild(discont);

            var self: any = this;
            var discover: egret.Shape = GameUtil.createRect(0,0,this.mStageW,this.mStageH,0.6);
            discont.addChild(discover);
            discover.touchEnabled = true;
            discover.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                discont.parent.removeChild(discont);
            },this);

            var toolx = 367+106*(id%3);
            var tooly = 636+110*Math.floor(id/3);
            var usebtn: GameUtil.Menu = new GameUtil.Menu(this,null,null,this.usenewtool,[tooltype,discont],GameUtil.createRect(toolx,tooly,100,50,1,0xffffff));
            usebtn.addButtonText('使用',40,toolx+50,tooly+25);
            discont.addChild(usebtn);

        }
    }
    //使用角色
    private usenewrole(roletype:any,contain:any)
    {
        GameData._i().PlayerRoleType = roletype;
        contain.parent.removeChild(contain);
    }
    //使用道具
    private usenewtool(tooltype:any,contain:any)
    {
        GameData._i().PlayerToolType = tooltype;
        contain.parent.removeChild(contain);
    }


    private getrotatag(rota:number): number
    {
        switch (rota)
        {
            case 0:
                return RandomUtils.limit(10,36);
                break;
            case 1:
                return RandomUtils.limit(37,63);
                break;
            case 2:
                return RandomUtils.limit(66,112);
                break;
            case 3:
                return RandomUtils.limit(113,139);
                break;
            case 4:
                return RandomUtils.limit(140,155);
                break;
            case 5:
                return RandomUtils.limit(168,201);
                break;
            case 6:
                return RandomUtils.limit(202,241);
                break;
            case 7:
                return RandomUtils.limit(242,296);
                break;
            case 8:
                return RandomUtils.limit(304,333);
                break;
            case 9:
                return RandomUtils.limit(334,370);
                break;
        }
        /*
        if(rota >= 10 && rota <= 36.5)
        {
            return 0;
        }
        else if(rota > 36.5 && rota <= 63.4)
        {
            return 1;
        }
        else if(rota > 63.4 && rota <= 112.4)
        {
            return 2;
        }
        else if(rota > 112.4 && rota <= 139.4)
        {
            return 3;
        }
        else if(rota > 139.4 && rota <= 155.9)
        {
            return 4;
        }
        else if(rota > 155.9 && rota <= 201.4)
        {
            return 5;
        }
        else if(rota > 201.4 && rota <= 241.7)
        {
            return 6;
        }
        else if(rota > 241.7 && rota <= 296.1)
        {
            return 7;
        }
        else if(rota > 296.1 && rota <= 333.2)
        {
            return 8;
        }
        else
        {
            return 9;
        }
        */
    }

}