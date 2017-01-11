var Jewel = (function () {
    function Jewel(pic, name, quality) {
        this.name = "";
        this.quality = 0;
        this.durabilityAdded = 0;
        this.pic = this.createBitmapByName(pic);
        this.name = name;
        this.quality = quality;
        this.durabilityAdded = 5 * this.quality;
    }
    var d = __define,c=Jewel,p=c.prototype;
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }; //读入位图文件
    return Jewel;
}());
egret.registerClass(Jewel,'Jewel');
//# sourceMappingURL=Jewel.js.map