//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        //设置加载进度界面
        GameData._i().UserInfo['openid'] = GameUtil.getQueryString('openid');
        GameData._i().UserInfo['shareopenid'] = GameUtil.getQueryString('shareopenid');
        console.log("openid======", GameData._i().UserInfo['openid']);
        if (!GameUtil.getQueryString('openid')) {
            if (GameUtil.getQueryString('shareopenid')) {
                window.location.href = 'http://api.h5.gamexun.com/weixin/auth?game_redirecturl=http://bubblefight.h5.gamexun.com/&shareopenid=' + GameUtil.getQueryString('shareopenid');
            }
            else {
                window.location.href = 'http://api.h5.gamexun.com/weixin/auth?game_redirecturl=http://bubblefight.h5.gamexun.com/';
            }
        }
        else {
            if (!GameUtil.getQueryString('shareopenid')) {
                // alert('null');
                GameData._i().UserInfo['shareopenid'] = null;
            }
            else {
                // alert('shareopid=================='+GameUtil.getQueryString('shareopenid'));
                GameData._i().UserInfo['shareopenid'] = GameUtil.getQueryString('shareopenid');
            }
            this.stage.scaleMode = egret.StageScaleMode.EXACT_FIT;
            //this.stage.setContentSize(GameUtil.GameConfig.DesignWidth,GameUtil.GameConfig.DesignHeight);
            GameUtil.GameScene.init(this.stage);
            GameUtil.GameScene.runscene(new GameUtil.LoadingPanel(this.createGameScene, this, 0, 0));
        }
    };
    p.createGameScene = function () {
        // GameUtil.Http.getinstance();
        if (GameData._i().isLoadingend) {
            egret.clearInterval(this.intag);
            GameUtil.GameConfig._i().setStageHeight(this.stage.stageHeight);
            GameUtil.GameScene.runscene(new StartGameScene());
        }
        else {
            this.intag = egret.setInterval(this.createGameScene, this, 400);
        }
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
