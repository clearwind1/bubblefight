/**
 * Created by pior on 16/9/9.
 */
var StartGameScene = (function (_super) {
    __extends(StartGameScene, _super);
    function StartGameScene() {
        _super.call(this);
        this.soundswitch = [true, true];
    }
    var d = __define,c=StartGameScene,p=c.prototype;
    p.init = function () {
        this.showbg();
    };
    p.showbg = function () {
        this.othercontain = null;
        this.playcontain = null;
        var bg = new GameUtil.MyBitmap(RES.getRes('startgamebg_png'), 0, 0);
        bg.setanchorOff(0, 0);
        this.addChild(bg);
        //界面按钮
        var btnname = ['startgamebtn_png', 'rankbtn_png', 'helpbtn_png', 'luckactbtn_png', 'personbtn_png', 'settingbtn_png', 'sharebtn_png', 'shopbtn_png'];
        var fun = [this.startgame, this.gamerank, this.gamehelp, this.luckact, this.personinfo, this.setting, this.share, this.shop];
        var btnpox = [this.mStageW / 2, this.mStageW / 2, 380, 65, 55, 260, 685, 500];
        var btnpoy = [950, 1100, 1260, 750, 50, 1260, 50, 1260];
        for (var i = 0; i < 8; i++) {
            var btn = new GameUtil.Menu(this, btnname[i], btnname[i], fun[i]);
            btn.setScaleMode();
            btn.x = btnpox[i];
            btn.y = btnpoy[i];
            this.addChild(btn);
        }
    };
    //开始游戏
    p.startgame = function () {
        console.log('start');
        GameUtil.GameScene.runscene(new GameScene());
    };
    //排行榜
    p.gamerank = function () {
        console.log('rank');
        this.createContain();
        var rankbg = new GameUtil.MyBitmap(RES.getRes('rankbg_png'), this.mStageW / 2, this.mStageH / 2);
        this.othercontain.addChild(rankbg);
        var ranktext = new GameUtil.MyBitmap(RES.getRes('ranktext_png'), this.mStageW / 2, 515);
        this.othercontain.addChild(ranktext);
        var playnametext = ['泡泡小王子', 'fdsafdsa', 'qwerewq', 'jklll', 'iolkjik'];
        var playscorenum = [10, 20, 30, 40, 560];
        var playkillnum = [1, 23, 33, 15, 88];
        for (var i = 0; i < 5; i++) {
            var menushape = GameUtil.createRect(141, 576 + i * 51, 469, 38, 0);
            var showinfobtn = new GameUtil.Menu(this, null, null, this.showotherinfo, [i], menushape);
            this.othercontain.addChild(showinfobtn);
            var rcir = GameUtil.createCircle(160, 600 + i * 52, 12, 1, 0xb2a33c);
            this.othercontain.addChild(rcir);
            var cir = GameUtil.createCircle(160, 600 + i * 52, 11, 1, 0xf9e872);
            this.othercontain.addChild(cir);
            var rankid = new GameUtil.MyTextField(155, 600 + i * 52, 20, 0);
            rankid.$setStroke(2);
            rankid.$setStrokeColor(0xfdfd4f);
            rankid.setText('' + (i + 1));
            rankid.textColor = 0xffc65e;
            this.othercontain.addChild(rankid);
            var playname = new GameUtil.MyTextField(180, 600 + i * 52, 25, 0);
            playname.setText(playnametext[i]);
            //playname.$setStroke(2);
            //playname.$setStrokeColor(0xffffff);
            playname.textColor = 0xffffff;
            this.othercontain.addChild(playname);
            var playscore = new GameUtil.MyTextField(333, 600 + i * 52, 25, 0);
            playscore.setText('积分:  ' + playscorenum[i]);
            //playscore.$setStroke(2);
            //playscore.$setStrokeColor(0xffffff);
            playscore.textColor = 0xffffff;
            this.othercontain.addChild(playscore);
            var playkill = new GameUtil.MyTextField(470, 600 + i * 52, 25, 0);
            playkill.setText('杀敌:  ' + playkillnum[i]);
            //playkill.$setStroke(2);
            //playkill.$setStrokeColor(0xfdfd4f);
            playkill.textColor = 0xffffff;
            this.othercontain.addChild(playkill);
        }
        var close = new GameUtil.Menu(this, 'closebtn_png', 'closebtn_png', this.closecontain);
        close.x = 653;
        close.y = 482;
        this.othercontain.addChild(close);
    };
    //活动
    p.gameaction = function () {
        console.log('gameaction');
    };
    p.gamehelp = function () {
        console.log('gamehelp');
        this.createContain();
        this.helpcurtag = 0;
        this.helpbgbtn = new GameUtil.Menu(this, 'helpbg_0_png', 'helpbg_0_png', function () {
            this.helpcurtag = (++this.helpcurtag > 2) ? 0 : this.helpcurtag;
            //console.log('helpcurtag=====',this.helpcurtag);
            this.helpbgbtn.setButtonTexture('helpbg_' + this.helpcurtag + '_png', 'helpbg_' + this.helpcurtag + '_png');
            this.helpselect.x = 445 + 55 * this.helpcurtag;
        });
        this.helpbgbtn.x = this.mStageW / 2;
        this.helpbgbtn.y = 694;
        this.othercontain.addChild(this.helpbgbtn);
        for (var i = 0; i < 3; i++) {
            var helppagepoint = new GameUtil.MyBitmap(RES.getRes('helppagepoint_png'), 445 + 55 * i, 800);
            this.othercontain.addChild(helppagepoint);
        }
        this.helpselect = new GameUtil.MyBitmap(RES.getRes('helpselect_png'), 445, 800);
        this.othercontain.addChild(this.helpselect);
        var close = new GameUtil.Menu(this, 'helpclose_png', 'helpclose_png', this.closecontain);
        close.x = 640;
        close.y = 566;
        this.othercontain.addChild(close);
    };
    p.luckact = function () {
        console.log('luckact');
        this.createContain();
        var luckpan = new GameUtil.MyBitmap(RES.getRes('luckpan_png'), this.mStageW / 2, this.mStageH / 2);
        this.othercontain.addChild(luckpan);
        this.luckpoint = new GameUtil.Menu(this, 'luckpoint_png', 'luckpoint_png', this.runluckpoint);
        this.luckpoint.$setAnchorOffsetY(20);
        this.luckpoint.x = this.mStageW / 2;
        this.luckpoint.y = 660;
        this.othercontain.addChild(this.luckpoint);
        var close = new GameUtil.Menu(this, 'closebtn_png', 'closebtn_png', this.closecontain);
        close.x = 570;
        close.y = 250;
        this.othercontain.addChild(close);
    };
    //个人信息
    p.personinfo = function () {
        console.log('personinfo');
        this.createContain();
        var infobg = new GameUtil.MyBitmap(RES.getRes('personinfobg_png'), this.mStageW / 2, this.mStageH / 2);
        this.othercontain.addChild(infobg);
        var infobtn = new GameUtil.Menu(this, 'personinfobtn_png', 'personinfobtn_png', this.playinfo);
        infobtn.setScaleMode();
        infobtn.x = 186;
        infobtn.y = 531;
        this.othercontain.addChild(infobtn);
        var bagbtn = new GameUtil.Menu(this, 'bagbtn_png', 'bagbtn_png', this.playbag);
        bagbtn.setScaleMode();
        bagbtn.x = 386;
        bagbtn.y = 531;
        this.othercontain.addChild(bagbtn);
        this.playcontain = new egret.DisplayObjectContainer();
        this.othercontain.addChild(this.playcontain);
        this.playinfo();
        var close = new GameUtil.Menu(this, 'closebtn_png', 'closebtn_png', this.closecontain);
        close.x = 653;
        close.y = 482;
        this.othercontain.addChild(close);
    };
    p.setting = function () {
        console.log('setting');
        this.switchbtn = [];
        this.createContain();
        var setttingbg = new GameUtil.MyBitmap(RES.getRes('settingbg_png'), this.mStageW / 2, 618);
        this.othercontain.addChild(setttingbg);
        for (var i = 0; i < 2; i++) {
            var switchonoff = new GameUtil.MyBitmap(RES.getRes('settingswitchon_png'), 488, 566 + i * 108);
            this.othercontain.addChild(switchonoff);
            this.switchbtn[i] = new GameUtil.Menu(this, 'settingswitch_png', 'settingswitch_png', this.settingswitch, [i, switchonoff]);
            this.switchbtn[i].x = 524;
            this.switchbtn[i].y = 567 + i * 108;
            this.othercontain.addChild(this.switchbtn[i]);
        }
        var close = new GameUtil.Menu(this, 'closebtn_png', 'closebtn_png', this.closecontain);
        close.x = 606;
        close.y = 472;
        this.othercontain.addChild(close);
    };
    //分享
    p.share = function () {
        console.log('share');
        this.createContain();
        var sharebg = new GameUtil.MyBitmap(RES.getRes('sharebg_png'), this.mStageW / 2, this.mStageH / 2);
        this.othercontain.addChild(sharebg);
        var sharebtn = new GameUtil.Menu(this, 'sharecordbtn_png', 'sharecordbtn_png', this.sharegame);
        sharebtn.setScaleMode();
        sharebtn.x = 216;
        sharebtn.y = 792;
        this.othercontain.addChild(sharebtn);
        var close = new GameUtil.Menu(this, 'closebtn_png', 'closebtn_png', this.closecontain);
        close.x = 653;
        close.y = 482;
        this.othercontain.addChild(close);
    };
    p.shop = function () {
        console.log('shop');
        this.createContain();
        var shopbg = new GameUtil.MyBitmap(RES.getRes('shopbg_png'), this.mStageW / 2, 708);
        this.othercontain.addChild(shopbg);
        this.shopbagcontain = new egret.DisplayObjectContainer();
        this.othercontain.addChild(this.shopbagcontain);
        var rolebtn = new GameUtil.Menu(this, 'rolebtn_png', 'rolebtn_png', this.showshopbagrole);
        rolebtn.x = 197;
        rolebtn.y = 441;
        rolebtn.setScaleMode();
        this.othercontain.addChild(rolebtn);
        var toolbtn = new GameUtil.Menu(this, 'toolbtn_png', 'toolbtn_png', this.showshopbagtool);
        toolbtn.x = 368;
        toolbtn.y = 441;
        toolbtn.setScaleMode();
        this.othercontain.addChild(toolbtn);
        this.showshopbagrole();
        var close = new GameUtil.Menu(this, 'closebtn_png', 'closebtn_png', this.closecontain);
        close.x = 664;
        close.y = 410;
        this.othercontain.addChild(close);
    };
    //创建一个新的通用容器
    p.createContain = function () {
        this.othercontain = new egret.DisplayObjectContainer();
        this.addChild(this.othercontain);
        this.othercontain.touchEnabled = true;
        var shap = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 0.6);
        this.othercontain.addChild(shap);
    };
    //关闭其他容器
    p.closecontain = function () {
        egret.Tween.removeAllTweens();
        this.removeChild(this.othercontain);
        this.othercontain = null;
    };
    //转盘转动
    p.runluckpoint = function () {
        var self = this;
        var prizerota = Math.floor(Math.random() * 10) * 36 + 360 * 2;
        egret.Tween.get(this.luckpoint).to({ rotation: prizerota }, 1000).call(function () {
            var tiptext = new GameUtil.MyTextField(this.mStageW / 2, 980, 30);
            tiptext.setText('可惜了，您只中了幸运奖');
            tiptext.textColor = 0xff0000;
            self.othercontain.addChild(tiptext);
        }, this);
    };
    //玩家信息
    p.playinfo = function () {
        console.log('GameData._i().PlayerRoleType====', GameData._i().PlayerRoleType);
        this.playcontain.removeChildren();
        var playimg = new GameUtil.MyBitmap(RES.getRes('roletype_' + GameData._i().PlayerRoleType + '_png'), 185, 683);
        this.playcontain.addChild(playimg);
        var txtst = ['ID:', '名字:', '泡泡:', '总积分:', '总击杀:', '被杀:'];
        var getplaytext = ['sxd_001', '泡泡小王子', '' + GameData._i().PlayerBubbleNumber, '' + GameData._i().PlayerScore, '' + GameData._i().PlayerKill, '' + GameData._i().PlayerDied];
        for (var i = 0; i < 6; i++) {
            var infotext = new GameUtil.MyTextField(340, 600 + 35 * i, 30, 0);
            infotext.setText(txtst[i]);
            infotext.textColor = 0x877fc8;
            this.playcontain.addChild(infotext);
            var infott = new GameUtil.MyTextField(450, 600 + 35 * i, 30, 0);
            infott.setText(getplaytext[i]);
            infott.textColor = 0x877fc8;
            this.playcontain.addChild(infott);
        }
    };
    p.playbag = function () {
        this.playcontain.removeChildren();
        this.bagcontain = new egret.DisplayObjectContainer();
        this.playcontain.addChild(this.bagcontain);
        var rolebtn = new GameUtil.Menu(this, 'rolebtn_png', 'rolebtn_png', this.showrole);
        rolebtn.x = 192;
        rolebtn.y = 640;
        rolebtn.setScaleMode();
        this.playcontain.addChild(rolebtn);
        var toolbtn = new GameUtil.Menu(this, 'toolbtn_png', 'toolbtn_png', this.showtool);
        toolbtn.x = 192;
        toolbtn.y = 746;
        toolbtn.setScaleMode();
        this.playcontain.addChild(toolbtn);
        this.showrole();
    };
    //显示角色
    p.showrole = function () {
        this.bagcontain.removeChildren();
        for (var i = 0; i < GameData._i().PlayerHadrole.length; i++) {
            var rolename = 'hadroletype_' + GameData._i().PlayerHadrole[i] + '_png';
            //var role: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes(rolename),370+105*(i%3),635+110*Math.floor(i/3));
            var role = new GameUtil.Menu(this, rolename, rolename, this.showrolemenu, [GameData._i().PlayerHadrole[i], i]);
            role.x = 370 + 105 * (i % 3);
            role.y = 635 + 110 * Math.floor(i / 3);
            this.bagcontain.addChild(role);
        }
    };
    //显示道具
    p.showtool = function () {
        this.bagcontain.removeChildren();
        for (var i = 0; i < GameData._i().PlayerHadtool.length; i++) {
            var toolname = 'shopselftool_' + GameData._i().PlayerHadtool[i] + '_png';
            // var tool: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes(toolname),367+106*(i%3),636+110*Math.floor(i/3));
            var tool = new GameUtil.Menu(this, toolname, toolname, this.showtoolmenu, [GameData._i().PlayerHadtool[i], i]);
            tool.x = 367 + 106 * (i % 3);
            tool.y = 636 + 110 * Math.floor(i / 3);
            tool.$setScaleX(0.8);
            tool.$setScaleY(0.8);
            this.bagcontain.addChild(tool);
        }
    };
    //分享提示
    p.sharegame = function () {
        var discont = new egret.DisplayObjectContainer();
        this.addChild(discont);
        var self = this;
        var discover = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 0.6);
        discont.addChild(discover);
        discover.touchEnabled = true;
        discover.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            self.removeChild(discont);
        }, this);
        var sharetip = new GameUtil.MyBitmap(RES.getRes('sharetip_png'), this.mStageW, 0);
        sharetip.setanchorOff(1, 0);
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
    };
    //商店显示角色
    p.showshopbagrole = function () {
        this.shopbagcontain.removeChildren();
        var roletext = ['皮皮:50泡泡', '妞妞:80泡泡', '琪琪:100泡泡', '明明:120泡泡', '聪聪:140泡泡', '跳跳:160泡泡'];
        for (var i = 0; i < 6; i++) {
            var rolename = 'shopself_' + i + '_png';
            var rolebtn = new GameUtil.Menu(this, rolename, rolename, this.buyrole, [i]);
            rolebtn.x = 193 + (i % 3) * 173;
            rolebtn.y = 578 + Math.floor(i / 3) * 254;
            this.shopbagcontain.addChild(rolebtn);
            var roletiptext = new GameUtil.MyTextField(rolebtn.x, 700 + Math.floor(i / 3) * 254, 25);
            roletiptext.width = 113;
            roletiptext.textAlign = egret.HorizontalAlign.CENTER;
            roletiptext.setText(roletext[i]);
            roletiptext.textColor = 0xffffff;
            this.shopbagcontain.addChild(roletiptext);
            for (var j = 0; j < GameData._i().PlayerHadrole.length; j++) {
                if (i == GameData._i().PlayerHadrole[j]) {
                    roletiptext.setText('已拥有');
                    rolebtn.touchEnabled = false;
                    break;
                }
            }
        }
    };
    //商店显示道具
    p.showshopbagtool = function () {
        this.shopbagcontain.removeChildren();
        var tooltext = ['蓝色泡泡:50泡泡', '黄色泡泡:80泡泡', '红包泡泡:100泡泡', '紫色泡泡:120泡泡', '彩色泡泡:130泡泡', '骷髅泡泡:150泡泡'];
        for (var i = 0; i < 6; i++) {
            var toolname = 'shopselftool_' + i + '_png';
            var toolbtn = new GameUtil.Menu(this, toolname, toolname, this.buytool, [i]);
            toolbtn.x = 195 + (i % 3) * 175;
            toolbtn.y = 578 + Math.floor(i / 3) * 254;
            this.shopbagcontain.addChild(toolbtn);
            var tooltiptext = new GameUtil.MyTextField(toolbtn.x, 700 + Math.floor(i / 3) * 254, 25);
            tooltiptext.width = 113;
            tooltiptext.textAlign = egret.HorizontalAlign.CENTER;
            tooltiptext.setText(tooltext[i]);
            tooltiptext.textColor = 0xffffff;
            this.shopbagcontain.addChild(tooltiptext);
            for (var j = 0; j < GameData._i().PlayerHadtool.length; j++) {
                if (i == GameData._i().PlayerHadtool[j]) {
                    tooltiptext.setText('已拥有');
                    toolbtn.touchEnabled = false;
                    break;
                }
            }
        }
    };
    p.buyrole = function (roleid) {
        console.log('roleid======', roleid);
        var tipcontain = new egret.DisplayObjectContainer();
        this.othercontain.addChild(tipcontain);
        tipcontain.touchEnabled = true;
        var shap = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 0.4);
        tipcontain.addChild(shap);
        var tipbg = new GameUtil.MyBitmap(RES.getRes('shoptip_png'), this.mStageW / 2, 855);
        tipcontain.addChild(tipbg);
        var roleimgtex = 'shopself_' + roleid + '_png';
        var roleimg = new GameUtil.MyBitmap(RES.getRes(roleimgtex), this.mStageW / 2, 785);
        tipcontain.addChild(roleimg);
        var rolename = ['皮皮', '皮皮', '皮皮', '皮皮', '皮皮', '皮皮'];
        var bucount = [50, 80, 100, 120, 140, 160];
        var tiptextT = new GameUtil.MyTextField(this.mStageW / 2, 905, 30);
        tiptextT.textAlign = egret.HorizontalAlign.CENTER;
        tiptextT.width = 355;
        tiptextT.setText('是否消耗' + bucount[roleid] + '泡泡领取' + rolename[roleid]);
        tiptextT.textColor = 0x7a6980;
        tipcontain.addChild(tiptextT);
        var getrolebtn = new GameUtil.Menu(this, 'buybtn_png', 'buybtn_png', this.getrole, [roleid]);
        getrolebtn.x = this.mStageW / 2;
        getrolebtn.y = 977;
        getrolebtn.setScaleMode();
        tipcontain.addChild(getrolebtn);
        var colsebtn = new GameUtil.Menu(this, 'closebtn_png', 'closebtn_png', function () {
            tipcontain.parent.removeChild(tipcontain);
        });
        colsebtn.x = 572;
        colsebtn.y = 717;
        tipcontain.addChild(colsebtn);
    };
    p.buytool = function (toolid) {
        console.log('toolid=====', toolid);
        var tipcontain = new egret.DisplayObjectContainer();
        this.othercontain.addChild(tipcontain);
        tipcontain.touchEnabled = true;
        var shap = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 0.4);
        tipcontain.addChild(shap);
        var tipbg = new GameUtil.MyBitmap(RES.getRes('shoptip_png'), this.mStageW / 2, 855);
        tipcontain.addChild(tipbg);
        var roleimgtex = 'shopselftool_' + toolid + '_png';
        var roleimg = new GameUtil.MyBitmap(RES.getRes(roleimgtex), this.mStageW / 2, 785);
        tipcontain.addChild(roleimg);
        var rolename = ['蓝色泡泡', '黄色泡泡', '红包泡泡', '紫色泡泡', '彩色泡泡', '骷髅泡泡'];
        var bucount = [50, 80, 100, 120, 130, 150];
        var tiptextT = new GameUtil.MyTextField(this.mStageW / 2, 905, 30);
        tiptextT.textAlign = egret.HorizontalAlign.CENTER;
        tiptextT.width = 355;
        tiptextT.setText('是否消耗' + bucount[toolid] + '泡泡领取' + rolename[toolid]);
        tiptextT.textColor = 0x7a6980;
        tipcontain.addChild(tiptextT);
        var getrolebtn = new GameUtil.Menu(this, 'buybtn_png', 'buybtn_png', this.gettool, [toolid]);
        getrolebtn.x = this.mStageW / 2;
        getrolebtn.y = 977;
        getrolebtn.setScaleMode();
        tipcontain.addChild(getrolebtn);
        var colsebtn = new GameUtil.Menu(this, 'closebtn_png', 'closebtn_png', function () {
            tipcontain.parent.removeChild(tipcontain);
        });
        colsebtn.x = 572;
        colsebtn.y = 717;
        tipcontain.addChild(colsebtn);
    };
    p.getrole = function (roleid) {
        var bucount = [50, 80, 100, 120, 140, 160];
        if (GameData._i().PlayerBubbleNumber < bucount[roleid]) {
            this.addChild(new GameUtil.TipsPanel(null, '泡泡数不够', true));
        }
        else {
            console.log('买买买');
        }
    };
    p.gettool = function (toolid) {
        var bucount = [50, 80, 100, 120, 130, 150];
        if (GameData._i().PlayerBubbleNumber < bucount[toolid]) {
            this.addChild(new GameUtil.TipsPanel(null, '泡泡数不够', true));
        }
        else {
            console.log('买买买');
        }
    };
    //设置开关
    p.settingswitch = function (type, swilog) {
        this.soundswitch[type] = !this.soundswitch[type];
        this.switchbtn[type].x = this.soundswitch[type] ? 524 : 452;
        var tex = this.soundswitch[type] ? RES.getRes('settingswitchon_png') : RES.getRes('settingswitchoff_png');
        swilog.setNewTexture(tex);
    };
    //排行榜显示其他玩家信息
    p.showotherinfo = function (id) {
        //console.log('id====',id);
        var discont = new egret.DisplayObjectContainer();
        this.othercontain.addChild(discont);
        var self = this;
        var discover = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 0.6);
        discont.addChild(discover);
        discover.touchEnabled = true;
        discover.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            discont.parent.removeChild(discont);
        }, this);
        var bg = new GameUtil.MyBitmap(RES.getRes('showinfobg_png'), this.mStageW / 2, this.mStageH / 2);
        discont.addChild(bg);
        var infoleft = new GameUtil.MyBitmap(RES.getRes('showinforight_png'), 196, this.mStageH / 2);
        discont.addChild(infoleft);
        var inforight = new GameUtil.MyBitmap(RES.getRes('showinfoleft_png'), 479, this.mStageH / 2);
        discont.addChild(inforight);
        var playimg = new GameUtil.MyBitmap(RES.getRes('roletype_' + GameData._i().PlayerRoleType + '_png'), 185, this.mStageH / 2);
        discont.addChild(playimg);
        var txtst = ['ID:', '名字:', '泡泡:', '总积分:', '总击杀:', '被杀:'];
        var getplaytext = ['sxd_001', '泡泡小王子', '' + GameData._i().PlayerBubbleNumber, '' + GameData._i().PlayerScore, '' + GameData._i().PlayerKill, '' + GameData._i().PlayerDied];
        for (var i = 0; i < 6; i++) {
            var infotext = new GameUtil.MyTextField(340, 580 + 35 * i, 30, 0);
            infotext.setText(txtst[i]);
            infotext.textColor = 0x877fc8;
            discont.addChild(infotext);
            var infott = new GameUtil.MyTextField(450, 580 + 35 * i, 30, 0);
            infott.setText(getplaytext[i]);
            infott.textColor = 0x877fc8;
            discont.addChild(infott);
        }
    };
    //显示是否使用角色菜单
    p.showrolemenu = function (roletype, id) {
        //console.log('showrolemenuroletype======',roletype);
        if (GameData._i().PlayerRoleType == roletype) {
            return;
        }
        else {
            var discont = new egret.DisplayObjectContainer();
            this.othercontain.addChild(discont);
            var self = this;
            var discover = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 0.6);
            discont.addChild(discover);
            discover.touchEnabled = true;
            discover.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                discont.parent.removeChild(discont);
            }, this);
            var rolex = 370 + 105 * (id % 3);
            var roley = 635 + 110 * Math.floor(id / 3);
            var usebtn = new GameUtil.Menu(this, null, null, this.usenewrole, [roletype, discont], GameUtil.createRect(rolex, roley, 100, 50, 1, 0xffffff));
            usebtn.addButtonText('使用', 40, rolex + 50, roley + 25);
            discont.addChild(usebtn);
        }
    };
    //显示是否使用道具菜单
    p.showtoolmenu = function (tooltype, id) {
        //console.log('tooltype=====',tooltype);
        if (GameData._i().PlayerToolType == tooltype) {
            return;
        }
        else {
            var discont = new egret.DisplayObjectContainer();
            this.othercontain.addChild(discont);
            var self = this;
            var discover = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 0.6);
            discont.addChild(discover);
            discover.touchEnabled = true;
            discover.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                discont.parent.removeChild(discont);
            }, this);
            var toolx = 367 + 106 * (id % 3);
            var tooly = 636 + 110 * Math.floor(id / 3);
            var usebtn = new GameUtil.Menu(this, null, null, this.usenewtool, [tooltype, discont], GameUtil.createRect(toolx, tooly, 100, 50, 1, 0xffffff));
            usebtn.addButtonText('使用', 40, toolx + 50, tooly + 25);
            discont.addChild(usebtn);
        }
    };
    //使用角色
    p.usenewrole = function (roletype, contain) {
        GameData._i().PlayerRoleType = roletype;
        contain.parent.removeChild(contain);
    };
    //使用道具
    p.usenewtool = function (tooltype, contain) {
        GameData._i().PlayerToolType = tooltype;
        contain.parent.removeChild(contain);
    };
    return StartGameScene;
}(GameUtil.BassPanel));
egret.registerClass(StartGameScene,'StartGameScene');
