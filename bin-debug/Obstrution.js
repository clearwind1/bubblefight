/**
 * Created by pior on 16/11/29.
 */
var Obstrution = (function (_super) {
    __extends(Obstrution, _super);
    function Obstrution(texture, posx, posy, istool) {
        if (istool === void 0) { istool = true; }
        _super.call(this, texture, posx, posy);
        this.isTool = istool;
    }
    var d = __define,c=Obstrution,p=c.prototype;
    return Obstrution;
}(GameUtil.MyBitmap));
egret.registerClass(Obstrution,'Obstrution');
