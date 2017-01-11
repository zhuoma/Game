var RPGUser = (function () {
    function RPGUser() {
        this.user = new User("account", "password", "Player");
        var hero = new Hero("d1_png", "法师", 6, 15, 35);
        var arm1 = new Arms("pileum_png", "黑暗大法师头冠", 30);
        var jewel1 = new Jewel("shuijing_png", "水晶", 10);
        var jewel2 = new Jewel("baoshi_png", "宝石", 20);
        arm1.addJewel(jewel1);
        arm1.addJewel(jewel2);
        hero.addArms(arm1);
        this.user.addHeros(hero);
    }
    var d = __define,c=RPGUser,p=c.prototype;
    p.getUser = function () {
        return this.user;
    };
    return RPGUser;
}());
egret.registerClass(RPGUser,'RPGUser');
//# sourceMappingURL=RPGUser.js.map