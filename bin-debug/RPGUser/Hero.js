var Cache = function (target, propertyName, desc) {
    var getter = desc.get;
    desc.get = function () {
        return getter.apply(this);
    };
    return desc;
};
var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero(pic, name, level, strength, physique) {
        _super.call(this);
        this.hero_name = "";
        this.level = 1;
        this.strength = 1;
        this.physique = 1;
        this.plus_attack = 0;
        this.plus_defense = 0;
        this.armsList = new Array();
        this.pic = this.createBitmapByName(pic);
        this.hero_name = name;
        this.level = level;
        this.strength = strength;
        this.physique = physique;
        this.updateData();
    }
    var d = __define,c=Hero,p=c.prototype;
    p.updateData = function () {
        if (this.armsList.length > 0) {
            this.plus_attack = 0;
            this.plus_defense = 0;
            for (var i = 0; i < this.armsList.length; i++) {
                this.plus_attack += this.armsList[i].attack;
                this.plus_defense += this.armsList[i].defense;
            }
            var update = new updateDate(updateDate.change);
            this.dispatchEvent(update);
        }
    };
    p.getLevel = function () {
        return this.level;
    };
    p.getName = function () {
        return this.name;
    };
    p.getArmList = function () {
        return this.armsList;
    };
    d(p, "life"
        ,function () {
            return (this.level * 0.1 + 1) * this.physique * 50 + this.plus_attack + this.plus_defense;
        }
    );
    d(p, "attack"
        ,function () {
            return (this.level * 0.08 + 1) * this.strength * 40 + this.plus_attack;
        }
    );
    d(p, "defense"
        ,function () {
            return (this.level * 0.05 + 1) * this.physique * 30 + this.plus_defense;
        }
    );
    d(p, "fightingCapacity"
        ,function () {
            return (this.level * 0.2 + 1) * (this.life * 0.2 + this.defense * 0.3 + this.attack * 0.5);
        }
    );
    p.addArms = function (arm) {
        this.armsList.push(arm);
        this.updateData();
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }; //读入位图文件
    return Hero;
}(egret.DisplayObjectContainer));
egret.registerClass(Hero,'Hero');
//# sourceMappingURL=Hero.js.map