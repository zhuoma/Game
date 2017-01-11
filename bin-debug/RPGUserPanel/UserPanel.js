var UserPanel = (function (_super) {
    __extends(UserPanel, _super);
    function UserPanel() {
        _super.call(this);
        this.panel = this.createBitmapByName("userpanel_png");
        this.button = this.createBitmapByName("heroes_png");
        this.hero_locate = [new Locations(245, 203), new Locations(245, 57)];
        this.arms_locate = [new Locations(384, 71), new Locations(384, 150), new Locations(384, 229)];
        this.jewel_locate = [new Locations(468, 87), new Locations(531, 87),
            new Locations(468, 168), new Locations(531, 168),
            new Locations(468, 246), new Locations(531, 246)];
        this.text1 = this.createText(55, 67, 15);
        this.text2 = this.createText(55, 87, 15);
        this.text3 = this.createText(55, 107, 15);
        this.text4 = this.createText(55, 127, 15);
        this.text5 = this.createText(55, 147, 15);
        this.text6 = this.createText(55, 167, 15);
        this.y = -355;
        this.addChild(this.panel);
        this.button.x = 237.5;
        this.button.y = 338;
        this.button.touchEnabled = true;
        this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.move, this);
        this.addChild(this.button);
    }
    var d = __define,c=UserPanel,p=c.prototype;
    p.setUser = function (user) {
        var _this = this;
        this.user = user;
        this.user.getHeroList()[0].addEventListener(updateDate.change, function () {
            _this.upDate();
        }, this);
        this.setUI();
        this.setDec();
    };
    p.upDate = function () {
        this.setUI();
        this.setDec();
    };
    p.setUI = function () {
        for (var i = 0; i < this.user.getHeroList().length; i++) {
            this.user.getHeroList()[i].pic.x = this.hero_locate[i].x;
            this.user.getHeroList()[i].pic.y = this.hero_locate[i].y;
            this.addChild(this.user.getHeroList()[i].pic);
            var loc = 0;
            for (var j = 0; j < this.user.getHeroList()[i].getArmList().length; j++) {
                this.user.getHeroList()[i].getArmList()[j].pic.x = this.arms_locate[j].x;
                this.user.getHeroList()[i].getArmList()[j].pic.y = this.arms_locate[j].y;
                this.addChild(this.user.getHeroList()[i].getArmList()[j].pic);
                for (var z = 0; z < this.user.getHeroList()[i].getArmList()[j].getJewelList().length; z++) {
                    this.user.getHeroList()[i].getArmList()[j].getJewelList()[z].pic.x = this.jewel_locate[loc].x;
                    this.user.getHeroList()[i].getArmList()[j].getJewelList()[z].pic.y = this.jewel_locate[loc].y;
                    this.addChild(this.user.getHeroList()[i].getArmList()[j].getJewelList()[z].pic);
                    loc++;
                }
                loc = (j + 1) * 2;
            }
        }
    };
    p.setDec = function () {
        this.text1.text = "玩家:" + this.user.getName();
        this.text2.text = "总战斗力:" + this.user.fightingCapacity;
        this.text3.text = "英雄:" + this.user.getHeroList()[0].getName() + "  等级:" + this.user.getHeroList()[0].getLevel();
        this.text4.text = "生命值:" + this.user.getHeroList()[0].life;
        this.text5.text = "攻击力:" + this.user.getHeroList()[0].attack;
        this.text6.text = "防御力:" + this.user.getHeroList()[0].defense;
        this.addChild(this.text1);
        this.addChild(this.text2);
        this.addChild(this.text3);
        this.addChild(this.text4);
        this.addChild(this.text5);
        this.addChild(this.text6);
    };
    p.move = function () {
        if (this.y < 0) {
            egret.Tween.get(this).to({ y: 0 }, 500, egret.Ease.sineIn);
        }
        else {
            egret.Tween.get(this).to({ y: -355 }, 500, egret.Ease.sineIn);
        }
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    p.createText = function (x, y, s) {
        var nomalText = new egret.TextField();
        nomalText.textColor = 0xffffff;
        nomalText.bold = true;
        nomalText.fontFamily = "Microsoft YaHei";
        nomalText.x = x;
        nomalText.y = y;
        nomalText.size = s;
        return nomalText;
    }; //格式化生成文字（具有相同特点）
    return UserPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(UserPanel,'UserPanel');
//# sourceMappingURL=UserPanel.js.map