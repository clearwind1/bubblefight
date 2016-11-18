/**
 * Created by pior on 16/9/9.
 */
class StartGameScene extends GameUtil.BassPanel
{
    private othercontain: egret.DisplayObjectContainer;
    private playcontain: egret.DisplayObjectContainer;

    private soundswitch: boolean[] = [true,true];

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

    }

    //开始游戏
    private startgame()
    {
        console.log('start');
        GameUtil.GameScene.runscene(new GameScene());
    }
    //排行榜
    private gamerank()
    {
        console.log('rank');
        this.createContain();

        var rankbg: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('rankbg_png'),this.mStageW/2,this.mStageH/2);
        this.othercontain.addChild(rankbg);
        var ranktext: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('ranktext_png'),this.mStageW/2,515);
        this.othercontain.addChild(ranktext);

        var playnametext: string[] = ['泡泡小王子','fdsafdsa','qwerewq','jklll','iolkjik'];
        var playscorenum: number[] = [10,20,30,40,560];
        var playkillnum: number[] = [1,23,33,15,88];
        for(var i: number=0;i < 5;i++)
        {
            var rcir: egret.Shape = GameUtil.createCircle(160,594+i*52,12,1,0xb2a33c);
            this.othercontain.addChild(rcir);
            var cir: egret.Shape = GameUtil.createCircle(160,594+i*52,11,1,0xf9e872);
            this.othercontain.addChild(cir);
            var rankid: GameUtil.MyTextField = new GameUtil.MyTextField(155,594+i*52,20,0);
            rankid.$setStroke(2);
            rankid.$setStrokeColor(0xfdfd4f);
            rankid.setText(''+(i+1));
            rankid.textColor = 0xffc65e;
            this.othercontain.addChild(rankid);

            var playname: GameUtil.MyTextField = new GameUtil.MyTextField(180,594+i*52,20,0);
            playname.setText(playnametext[i]);
            playname.$setStroke(2);
            playname.$setStrokeColor(0xfdfd4f);
            playname.textColor = 0x9abf19;
            this.othercontain.addChild(playname);

            var playscore: GameUtil.MyTextField = new GameUtil.MyTextField(333,594+i*52,20,0);
            playscore.setText('积分:  '+playscorenum[i]);
            playscore.$setStroke(2);
            playscore.$setStrokeColor(0xfdfd4f);
            playscore.textColor = 0x9abf19;
            this.othercontain.addChild(playscore);

            var playkill: GameUtil.MyTextField = new GameUtil.MyTextField(470,594+i*52,20,0);
            playkill.setText('杀敌:  '+playkillnum[i]);
            playkill.$setStroke(2);
            playkill.$setStrokeColor(0xfdfd4f);
            playkill.textColor = 0x9abf19;
            this.othercontain.addChild(playkill);
        }

        var close: GameUtil.Menu = new GameUtil.Menu(this,'closebtn_png','closebtn_png',this.closecontain);
        close.x = 653;
        close.y = 482;
        this.othercontain.addChild(close);
    }
    //活动
    private gameaction()
    {
        console.log('gameaction');
    }
    //帮助
    private helpbgbtn: GameUtil.Menu;
    private helpselect: GameUtil.MyBitmap;
    private helpcurtag: number;
    private gamehelp()
    {
        console.log('gamehelp');
        this.createContain();

        this.helpcurtag = 0;

        this.helpbgbtn = new GameUtil.Menu(this,'helpbg_0_png','helpbg_0_png',function()
        {
            this.helpcurtag = (++this.helpcurtag > 2) ? 0:this.helpcurtag;
            //console.log('helpcurtag=====',this.helpcurtag);
            this.helpbgbtn.setButtonTexture('helpbg_'+this.helpcurtag+'_png','helpbg_'+this.helpcurtag+'_png');
            this.helpselect.x = 445+55*this.helpcurtag;
        });
        this.helpbgbtn.x = this.mStageW/2;
        this.helpbgbtn.y = 694;
        this.othercontain.addChild(this.helpbgbtn);

        for(var i:number=0;i < 3;i++)
        {
            var helppagepoint: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('helppagepoint_png'),445+55*i,800);
            this.othercontain.addChild(helppagepoint);
        }

        this.helpselect = new GameUtil.MyBitmap(RES.getRes('helpselect_png'),445,800);
        this.othercontain.addChild(this.helpselect);

        var close: GameUtil.Menu = new GameUtil.Menu(this,'helpclose_png','helpclose_png',this.closecontain);
        close.x = 640;
        close.y = 566;
        this.othercontain.addChild(close);
    }
    //幸运转盘
    private luckpoint: GameUtil.Menu;
    private luckact()
    {
        console.log('luckact');
        this.createContain();

        var luckpan: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('luckpan_png'),this.mStageW/2,this.mStageH/2);
        this.othercontain.addChild(luckpan);
        this.luckpoint = new GameUtil.Menu(this,'luckpoint_png','luckpoint_png',this.runluckpoint);
        this.luckpoint.$setAnchorOffsetY(20);
        this.luckpoint.x = this.mStageW/2;
        this.luckpoint.y = 660;
        this.othercontain.addChild(this.luckpoint);

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
            var switchonoff: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('settingswitchon_png'),488,566+i*108);
            this.othercontain.addChild(switchonoff);
            this.switchbtn[i] = new GameUtil.Menu(this,'settingswitch_png','settingswitch_png',this.settingswitch,[i,switchonoff]);
            this.switchbtn[i].x = 524;
            this.switchbtn[i].y = 567+i*108;
            this.othercontain.addChild(this.switchbtn[i]);
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

        var sharebtn: GameUtil.Menu = new GameUtil.Menu(this,'sharecordbtn_png','sharecordbtn_png',this.sharegame);
        sharebtn.setScaleMode();
        sharebtn.x = 216;
        sharebtn.y = 792;
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
        this.removeChild(this.othercontain);
        this.othercontain = null;
    }

    //转盘转动
    private runluckpoint()
    {
        var self: any = this;
        var prizerota: number = Math.floor(Math.random()*10)*36 + 360*2;
        egret.Tween.get(this.luckpoint).to({rotation:prizerota},1000).call(function(){
            var tiptext: GameUtil.MyTextField = new GameUtil.MyTextField(this.mStageW/2,980,30);
            tiptext.setText('可惜了，您只中了幸运奖');
            tiptext.textColor = 0xff0000;
            self.othercontain.addChild(tiptext);
        },this);
    }

    //玩家信息
    private playinfo()
    {
        this.playcontain.removeChildren();
        var playimg: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('roletype_'+GameData._i().PlayerRoleType+'_png'),185,683);
        this.playcontain.addChild(playimg);


        var txtst: string[] = ['ID:','名字:','泡泡:','总积分:','总击杀:','被杀:'];
        var getplaytext: string[] = ['sxd_001','泡泡小王子',''+GameData._i().PlayerBubbleNumber,''+GameData._i().PlayerScore,''+GameData._i().PlayerKill,''+GameData._i().PlayerDied];
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
        this.playcontain.removeChildren();
        this.bagcontain = new egret.DisplayObjectContainer();
        this.playcontain.addChild(this.bagcontain);

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
    //显示角色
    private showrole()
    {
        this.bagcontain.removeChildren();
        for(var i:number = 0;i < GameData._i().PlayerHadrole.length;i++)
        {
            var rolename: string = 'hadroletype_'+GameData._i().PlayerHadrole[i]+'_png';
            var role: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes(rolename),370+105*(i%3),635+110*Math.floor(i/3));
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
            var tool: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes(toolname),367+106*(i%3),636+110*Math.floor(i/3));
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
                    toolbtn.touchEnabled = false;
                    break;
                }
            }
        }
    }

    private buyrole(roleid:number){
        console.log('roleid======',roleid);
        var tipcontain: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        this.othercontain.addChild(tipcontain);
        tipcontain.touchEnabled = true;
        var shap: egret.Shape = GameUtil.createRect(0,0,this.mStageW,this.mStageH,0.4);
        tipcontain.addChild(shap);

        var tipbg: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('shoptip_png'),this.mStageW/2,855);
        tipcontain.addChild(tipbg);

        var roleimgtex: string = 'shopself_'+roleid+'_png';
        var roleimg: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes(roleimgtex),this.mStageW/2,785);
        tipcontain.addChild(roleimg);

        var rolename: string[] = ['皮皮','皮皮','皮皮','皮皮','皮皮','皮皮'];
        var bucount: number[] = [50,80,100,120,140,160];

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
        var bucount: number[] = [50,80,100,120,130,150];

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
        var bucount: number[] = [50,80,100,120,140,160];
        if(GameData._i().PlayerBubbleNumber < bucount[roleid]){
            this.addChild(new GameUtil.TipsPanel(null,'泡泡数不够',true));
        }
        else{
            console.log('买买买');
        }

    }
    private gettool(toolid:number)
    {
        var bucount: number[] = [50,80,100,120,130,150];
        if(GameData._i().PlayerBubbleNumber < bucount[toolid]){
            this.addChild(new GameUtil.TipsPanel(null,'泡泡数不够',true));
        }
        else{
            console.log('买买买');
        }
    }

    //设置开关
    private settingswitch(type:number,swilog:any)
    {
        this.soundswitch[type] = !this.soundswitch[type];
        this.switchbtn[type].x = this.soundswitch[type] ? 524:452;
        var tex:egret.Texture = this.soundswitch[type] ? RES.getRes('settingswitchon_png'):RES.getRes('settingswitchoff_png');
        (<GameUtil.MyBitmap>swilog).setNewTexture(tex);
    }

}