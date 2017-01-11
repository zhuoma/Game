var Arms = (function () {
    function Arms(pic, name, self_durability) {
        this.name = "";
        this.self_durability = 0;
        this.plus_durability = 0;
        this.jewelList = new Array();
        this.pic = this.createBitmapByName(pic);
        this.name = name;
        this.self_durability = self_durability;
        this.updateData();
    }
    var d = __define,c=Arms,p=c.prototype;
    p.updateData = function () {
        if (this.jewelList.length > 0) {
            this.plus_durability = 0;
            for (var i = 0; i < this.jewelList.length; i++) {
                this.plus_durability += this.jewelList[i].durabilityAdded;
            }
        }
    };
    p.getJewelList = function () {
        return this.jewelList;
    };
    d(p, "attack"
        ,function () {
            return 20 * (this.self_durability + this.plus_durability);
        }
    );
    d(p, "defense"
        ,function () {
            return 15 * (this.self_durability + this.plus_durability);
        }
    );
    p.addJewel = function (jewel) {
        this.jewelList.push(jewel);
        this.updateData();
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }; //读入位图文件
    return Arms;
}());
egret.registerClass(Arms,'Arms');
//# sourceMappingURL=Arms.js.map